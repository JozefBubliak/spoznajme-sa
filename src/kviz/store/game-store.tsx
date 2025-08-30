import createContextHook from '@nkzw/create-context-hook';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language } from '@/constants/languages';
import { Question, getQuestionsForLanguage } from '@/constants/questions';

export interface Player {
  id: string;
  name: string;
  score: number;
  answers: number[];
}

export interface GameSession {
  code: string;
  moderatorId: string;
  players: Player[];
  currentQuestionIndex: number;
  questions: Question[];
  gameState: 'waiting' | 'playing' | 'finished';
  timeLeft: number;
}

export const [GameProvider, useGame] = createContextHook(() => {
  const [userRole, setUserRole] = useState<'moderator' | 'player' | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [playerName, setPlayerName] = useState<string>('');
  const [sessionCode, setSessionCode] = useState<string>('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'finished'>('waiting');
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [playerAnswer, setPlayerAnswer] = useState<number | null>(null);
  const [sessions, setSessions] = useState<Map<string, GameSession>>(new Map());

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

  const savePlayerName = async (name: string) => {
    try {
      await AsyncStorage.setItem('playerName', name);
      setPlayerName(name);
    } catch (error) {
      console.log('Error saving player name:', error);
    }
  };

  const generateSessionCode = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const createSession = () => {
    if (!selectedLanguage) return;

    const code = generateSessionCode();
    const sessionQuestions = getQuestionsForLanguage(selectedLanguage.code);
    
    const newSession: GameSession = {
      code,
      moderatorId: 'moderator',
      players: [],
      currentQuestionIndex: 0,
      questions: sessionQuestions,
      gameState: 'waiting',
      timeLeft: 0,
    };

    setSessions(prev => new Map(prev.set(code, newSession)));
    setSessionCode(code);
    setQuestions(sessionQuestions);
    setCurrentQuestionIndex(0);
    setGameState('waiting');
    
    console.log('Session created:', code);
  };

  const joinSession = (code: string, name: string): boolean => {
    const session = sessions.get(code);
    if (!session) {
      return false;
    }

    const newPlayer: Player = {
      id: `player_${Date.now()}`,
      name,
      score: 0,
      answers: [],
    };

    const updatedSession = {
      ...session,
      players: [...session.players, newPlayer],
    };

    setSessions(prev => new Map(prev.set(code, updatedSession)));
    setPlayers(updatedSession.players);
    setSessionCode(code);
    setQuestions(session.questions);
    setCurrentQuestionIndex(session.currentQuestionIndex);
    setGameState(session.gameState);
    savePlayerName(name);
    
    console.log('Player joined session:', name, code);
    return true;
  };

  const startGame = () => {
    if (!sessionCode) return;

    const session = sessions.get(sessionCode);
    if (!session) return;

    const updatedSession = {
      ...session,
      gameState: 'playing' as const,
      currentQuestionIndex: 0,
      timeLeft: 30,
    };

    setSessions(prev => new Map(prev.set(sessionCode, updatedSession)));
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setTimeLeft(30);
    setPlayerAnswer(null);
    
    console.log('Game started');
  };

  const submitAnswer = (answerIndex: number) => {
    if (userRole !== 'player' || !sessionCode) return;

    setPlayerAnswer(answerIndex);
    
    const session = sessions.get(sessionCode);
    if (!session) return;

    const currentQuestion = session.questions[session.currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const points = isCorrect ? 10 : 0;

    const updatedPlayers = session.players.map(player => {
      if (player.name === playerName) {
        return {
          ...player,
          score: player.score + points,
          answers: [...player.answers, answerIndex],
        };
      }
      return player;
    });

    const updatedSession = {
      ...session,
      players: updatedPlayers,
    };

    setSessions(prev => new Map(prev.set(sessionCode, updatedSession)));
    setPlayers(updatedPlayers);
    
    console.log('Answer submitted:', answerIndex, 'Correct:', isCorrect, 'Points:', points);
  };

  const nextQuestion = (): boolean => {
    if (!sessionCode) return false;

    const session = sessions.get(sessionCode);
    if (!session) return false;

    const nextIndex = session.currentQuestionIndex + 1;
    
    if (nextIndex >= session.questions.length) {
      return false;
    }

    const updatedSession = {
      ...session,
      currentQuestionIndex: nextIndex,
      timeLeft: 30,
    };

    setSessions(prev => new Map(prev.set(sessionCode, updatedSession)));
    setCurrentQuestionIndex(nextIndex);
    setTimeLeft(30);
    setPlayerAnswer(null);
    
    console.log('Next question:', nextIndex);
    return true;
  };

  const endGame = () => {
    if (!sessionCode) return;

    const session = sessions.get(sessionCode);
    if (!session) return;

    const updatedSession = {
      ...session,
      gameState: 'finished' as const,
    };

    setSessions(prev => new Map(prev.set(sessionCode, updatedSession)));
    setGameState('finished');
    
    console.log('Game ended');
  };

  const resetGame = () => {
    setUserRole(null);
    setSelectedLanguage(null);
    setSessionCode('');
    setPlayers([]);
    setCurrentQuestionIndex(0);
    setQuestions([]);
    setGameState('waiting');
    setTimeLeft(0);
    setPlayerAnswer(null);
    setSessions(new Map());
    
    console.log('Game reset');
  };

  const currentQuestion = questions[currentQuestionIndex] || null;

  return {
    // State
    userRole,
    selectedLanguage,
    playerName,
    sessionCode,
    players,
    currentQuestion,
    currentQuestionIndex,
    questions,
    gameState,
    timeLeft,
    playerAnswer,
    
    // Actions
    setUserRole,
    setSelectedLanguage,
    setPlayerName: savePlayerName,
    createSession,
    joinSession,
    startGame,
    submitAnswer,
    nextQuestion,
    endGame,
    resetGame,
  };
});