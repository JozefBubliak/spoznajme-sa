import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, Users, Trophy, ArrowRight } from 'lucide-react-native';
import { useGame } from '@/store/game-store';

export default function GameScreen() {
  const { 
    userRole, 
    currentQuestion, 
    players, 
    gameState, 
    selectedLanguage,
    nextQuestion,
    submitAnswer,
    endGame,
    timeLeft,
    playerAnswer
  } = useGame();
  
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (gameState === 'finished') {
      router.push('/results');
    }
  }, [gameState]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (userRole === 'player' && !playerAnswer && gameState === 'playing') {
      setSelectedAnswer(answerIndex);
      submitAnswer(answerIndex);
    }
  };

  const handleNextQuestion = () => {
    const hasNext = nextQuestion();
    if (!hasNext) {
      endGame();
    } else {
      setSelectedAnswer(null);
      setShowResults(false);
    }
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  if (!currentQuestion) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient colors={['#667eea', '#764ba2']} style={styles.gradient}>
          <View style={styles.waitingContainer}>
            <Text style={styles.waitingText}>Waiting for game to start...</Text>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.gradient}>
        <View style={styles.header}>
          <View style={styles.gameInfo}>
            <Text style={styles.languageFlag}>{selectedLanguage?.flag}</Text>
            <View style={styles.gameStats}>
              <View style={styles.statItem}>
                <Users size={16} color="white" />
                <Text style={styles.statText}>{players.length}</Text>
              </View>
              {timeLeft > 0 && (
                <View style={styles.statItem}>
                  <Clock size={16} color="white" />
                  <Text style={styles.statText}>{timeLeft}s</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.questionCard}>
              <Text style={styles.questionNumber}>
                Question {currentQuestion.id}
              </Text>
              <Text style={styles.questionText}>{currentQuestion.question}</Text>
              
              <View style={styles.answersContainer}>
                {currentQuestion.answers.map((answer, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = showResults && index === currentQuestion.correctAnswer;
                  const isWrong = showResults && isSelected && index !== currentQuestion.correctAnswer;
                  
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.answerButton,
                        isSelected && styles.selectedAnswer,
                        isCorrect && styles.correctAnswer,
                        isWrong && styles.wrongAnswer,
                      ]}
                      onPress={() => handleAnswerSelect(index)}
                      disabled={userRole === 'player' && (playerAnswer !== null || gameState !== 'playing')}
                      activeOpacity={0.8}
                    >
                      <Text style={[
                        styles.answerText,
                        (isSelected || isCorrect) && styles.selectedAnswerText,
                      ]}>
                        {String.fromCharCode(65 + index)}. {answer}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {showResults && currentQuestion.explanation && (
                <View style={styles.explanationCard}>
                  <Text style={styles.explanationTitle}>Explanation</Text>
                  <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
                </View>
              )}
            </View>

            {userRole === 'moderator' && (
              <View style={styles.moderatorControls}>
                {!showResults ? (
                  <TouchableOpacity
                    style={styles.controlButton}
                    onPress={handleShowResults}
                    activeOpacity={0.8}
                  >
                    <Trophy size={20} color="white" />
                    <Text style={styles.controlButtonText}>Show Results</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[styles.controlButton, styles.nextButton]}
                    onPress={handleNextQuestion}
                    activeOpacity={0.8}
                  >
                    <ArrowRight size={20} color="white" />
                    <Text style={styles.controlButtonText}>Next Question</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {showResults && (
              <View style={styles.scoresCard}>
                <Text style={styles.scoresTitle}>Current Scores</Text>
                <View style={styles.scoresList}>
                  {players
                    .sort((a, b) => b.score - a.score)
                    .map((player, index) => (
                      <View key={player.id} style={styles.scoreItem}>
                        <View style={styles.scoreRank}>
                          <Text style={styles.rankText}>{index + 1}</Text>
                        </View>
                        <Text style={styles.scorePlayerName}>{player.name}</Text>
                        <Text style={styles.scorePlayerScore}>{player.score}</Text>
                      </View>
                    ))}
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  gameInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  languageFlag: {
    fontSize: 24,
  },
  gameStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginLeft: 4,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 10,
  },
  waitingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waitingText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  questionCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    lineHeight: 28,
  },
  answersContainer: {
    gap: 12,
  },
  answerButton: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedAnswer: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  correctAnswer: {
    backgroundColor: '#28a745',
    borderColor: '#28a745',
  },
  wrongAnswer: {
    backgroundColor: '#dc3545',
    borderColor: '#dc3545',
  },
  answerText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  selectedAnswerText: {
    color: 'white',
  },
  explanationCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  moderatorControls: {
    marginBottom: 20,
  },
  controlButton: {
    backgroundColor: '#667eea',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButton: {
    backgroundColor: '#28a745',
  },
  controlButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8,
  },
  scoresCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  scoresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  scoresList: {
    gap: 8,
  },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
  },
  scoreRank: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  scorePlayerName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  scorePlayerScore: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#667eea',
  },
});