import createContextHook from '@nkzw/create-context-hook';
import { useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Language } from '@/constants/languages';
import { GameAPI } from '@/lib/api';
import { Game, Player, Round, Question } from '@/types/database';

export const [GameProvider, useGame] = createContextHook(() => {
  const queryClient = useQueryClient();
  const [userRole, setUserRole] = useState<'moderator' | 'player' | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [playerName, setPlayerName] = useState<string>('');
  const [currentGame, setCurrentGame] = useState<Game | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [currentRound, setCurrentRound] = useState<Round | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [playerAnswer, setPlayerAnswer] = useState<number | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Load persisted data
  useEffect(() => {
    loadPersistedData();
  }, []);

  const loadPersistedData = async () => {
    try {
      const savedPlayerName = await AsyncStorage.getItem('playerName');
      if (savedPlayerName) {
        setPlayerName(savedPlayerName);
      }
    } catch (error) {
      console.log('Error loading persisted data:', error);
    }
  };

  const savePlayerName = useCallback(async (name: string) => {
    try {
      await AsyncStorage.setItem('playerName', name);
      setPlayerName(name);
    } catch (error) {
      console.log('Error saving player name:', error);
    }
  }, []);

  // Queries
  const playersQuery = useQuery({
    queryKey: ['players', currentGame?.id, currentGame],
    queryFn: () => currentGame ? GameAPI.getPlayers(currentGame.id) : Promise.resolve([]),
    enabled: !!currentGame,
    refetchInterval: 2000, // Poll every 2 seconds for real-time updates
  });

  const categoriesQuery = useQuery({
    queryKey: ['categories', selectedLanguage?.code, selectedLanguage],
    queryFn: () => selectedLanguage ? GameAPI.getCategories(selectedLanguage.code) : Promise.resolve([]),
    enabled: !!selectedLanguage,
  });

  const leaderboardQuery = useQuery({
    queryKey: ['leaderboard', currentGame?.id, currentGame],
    queryFn: () => currentGame ? GameAPI.getLeaderboard(currentGame.id) : Promise.resolve([]),
    enabled: !!currentGame && showResults,
  });

  // Mutations
  const createGameMutation = useMutation({
    mutationFn: async () => {
      if (!selectedLanguage) throw new Error('No language selected');
      const code = generateSessionCode();
      return GameAPI.createGame(code, selectedLanguage.code);
    },
    onSuccess: (game) => {
      setCurrentGame(game);
      console.log('Game created:', game.code);
    },
  });

  const joinGameMutation = useMutation({
    mutationFn: async ({ code, name }: { code: string; name: string }) => {
      const game = await GameAPI.getGame(code);
      if (!game) throw new Error('Game not found');
      if (game.lobby_locked) throw new Error('Lobby is locked');
      
      const player = await GameAPI.addPlayer(game.id, name);
      return { game, player };
    },
    onSuccess: ({ game, player }) => {
      setCurrentGame(game);
      setCurrentPlayer(player);
      savePlayerName(player.name);
      queryClient.invalidateQueries({ queryKey: ['players', game.id] });
      console.log('Joined game:', game.code, 'as', player.name);
    },
  });

  const lockLobbyMutation = useMutation({
    mutationFn: async () => {
      if (!currentGame) throw new Error('No current game');
      await GameAPI.lockLobby(currentGame.id);
    },
    onSuccess: () => {
      if (currentGame) {
        setCurrentGame({ ...currentGame, lobby_locked: true });
      }
      console.log('Lobby locked');
    },
  });

  const createRoundMutation = useMutation({
    mutationFn: async ({ categoryId, questionCount, timerSeconds }: { categoryId: string; questionCount: number; timerSeconds?: number }) => {
      if (!currentGame) throw new Error('No current game');
      const round = await GameAPI.createRound(currentGame.id, categoryId, questionCount, timerSeconds);
      const questions = await GameAPI.getRandomQuestions(
        categoryId,
        currentGame.locale,
        questionCount,
        currentGame.country_code || undefined
      );
      return { round, questions };
    },
    onSuccess: ({ round, questions }) => {
      setCurrentRound(round);
      setCurrentQuestions(questions);
      setCurrentQuestionIndex(0);
      console.log('Round created with', questions.length, 'questions');
    },
  });

  const startRoundMutation = useMutation({
    mutationFn: async () => {
      if (!currentRound) throw new Error('No current round');
      await GameAPI.startRound(currentRound.id);
      await GameAPI.updateGameStatus(currentRound.game_id, 'playing');
    },
    onSuccess: () => {
      if (currentRound && currentGame) {
        setCurrentRound({ ...currentRound, status: 'active' });
        setCurrentGame({ ...currentGame, status: 'playing' });
        setTimeLeft(currentRound.timer_seconds || 30);
        setPlayerAnswer(null);
        setShowResults(false);
      }
      console.log('Round started');
    },
  });

  const submitAnswerMutation = useMutation({
    mutationFn: async (answerIndex: number) => {
      if (!currentPlayer || !currentQuestions[currentQuestionIndex]) {
        throw new Error('Missing player or question data');
      }
      
      const question = currentQuestions[currentQuestionIndex];
      const isCorrect = answerIndex === question.correct_answer;
      
      return GameAPI.submitAnswer(currentPlayer.id, question.id, answerIndex, isCorrect);
    },
    onSuccess: (answer) => {
      setPlayerAnswer(answer.answer_index);
      queryClient.invalidateQueries({ queryKey: ['players', currentGame?.id] });
      console.log('Answer submitted:', answer.is_correct ? 'Correct!' : 'Incorrect');
    },
  });

  const nextQuestionMutation = useMutation({
    mutationFn: async () => {
      if (!currentRound) throw new Error('No current round');
      await GameAPI.nextQuestion(currentRound.id);
    },
    onSuccess: () => {
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < currentQuestions.length) {
        setCurrentQuestionIndex(nextIndex);
        setTimeLeft(currentRound?.timer_seconds || 30);
        setPlayerAnswer(null);
        setShowResults(false);
        console.log('Next question:', nextIndex + 1);
      } else {
        finishRound();
      }
    },
  });

  // Helper functions
  const generateSessionCode = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const finishRound = async () => {
    if (!currentRound || !currentGame) return;
    
    try {
      await GameAPI.lockRound(currentRound.id);
      await GameAPI.updateGameStatus(currentGame.id, 'finished');
      
      setCurrentRound({ ...currentRound, status: 'finished' });
      setCurrentGame({ ...currentGame, status: 'finished' });
      setShowResults(true);
      
      console.log('Round finished');
    } catch (error) {
      console.error('Error finishing round:', error);
    }
  };

  const resetGame = useCallback(() => {
    setUserRole(null);
    setSelectedLanguage(null);
    setCurrentGame(null);
    setCurrentPlayer(null);
    setCurrentRound(null);
    setCurrentQuestions([]);
    setCurrentQuestionIndex(0);
    setTimeLeft(0);
    setPlayerAnswer(null);
    setShowResults(false);
    queryClient.clear();
    console.log('Game reset');
  }, [queryClient]);

  return useMemo(() => {
    // Computed values
    const currentQuestion = currentQuestions[currentQuestionIndex] || null;
    const players = playersQuery.data || [];
    const categories = categoriesQuery.data || [];
    const leaderboard = leaderboardQuery.data || [];
    const isGameActive = currentGame?.status === 'playing' && currentRound?.status === 'active';
    const isLobbyLocked = currentGame?.lobby_locked || false;

    return {
      // State
      userRole,
      selectedLanguage,
      playerName,
      currentGame,
      currentPlayer,
      currentRound,
      currentQuestion,
      currentQuestionIndex,
      currentQuestions,
      timeLeft,
      playerAnswer,
      showResults,
      players,
      categories,
      leaderboard,
      isGameActive,
      isLobbyLocked,
    
    // Loading states
    isCreatingGame: createGameMutation.isPending,
    isJoiningGame: joinGameMutation.isPending,
    isCreatingRound: createRoundMutation.isPending,
    isStartingRound: startRoundMutation.isPending,
    isSubmittingAnswer: submitAnswerMutation.isPending,
    
    // Actions
    setUserRole,
    setSelectedLanguage,
    setPlayerName: savePlayerName,
    setTimeLeft,
    setShowResults,
    createGame: createGameMutation.mutate,
    joinGame: (code: string, name: string) =>
      joinGameMutation.mutateAsync({ code, name }),
    lockLobby: lockLobbyMutation.mutate,
    createRound: createRoundMutation.mutate,
    startRound: startRoundMutation.mutate,
    submitAnswer: submitAnswerMutation.mutate,
    nextQuestion: nextQuestionMutation.mutate,
    resetGame,
    
    // Errors
    createGameError: createGameMutation.error,
    joinGameError: joinGameMutation.error,
    };
  }, [
    userRole, selectedLanguage, playerName, currentGame, currentPlayer, currentRound,
    currentQuestionIndex, currentQuestions, timeLeft, playerAnswer,
    showResults, playersQuery.data, categoriesQuery.data, leaderboardQuery.data,
    createGameMutation.isPending, joinGameMutation.isPending, createRoundMutation.isPending,
    startRoundMutation.isPending, submitAnswerMutation.isPending, setUserRole,
    setSelectedLanguage, savePlayerName, setTimeLeft, setShowResults,
    createGameMutation.mutate, joinGameMutation.mutateAsync, lockLobbyMutation.mutate,
    createRoundMutation.mutate, startRoundMutation.mutate, submitAnswerMutation.mutate,
    nextQuestionMutation.mutate, resetGame, createGameMutation.error, joinGameMutation.error
  ]);
});