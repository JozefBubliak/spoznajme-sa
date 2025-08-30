import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Play, Users, Shuffle, Plus } from 'lucide-react-native';
import { useGame } from '@/store/game-store';

export default function ModeratorScreen() {
  const { selectedLanguage, createSession, sessionCode, players, startGame } = useGame();
  const [showCustomQuestion, setShowCustomQuestion] = useState(false);
  const [customQuestion, setCustomQuestion] = useState('');
  const [customAnswers, setCustomAnswers] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const handleCreateSession = () => {
    createSession();
  };

  const handleStartGame = () => {
    if (players.length === 0) {
      Alert.alert('No Players', 'Wait for players to join before starting the game.');
      return;
    }
    startGame();
    router.push('/game');
  };

  const handleAddCustomQuestion = () => {
    if (!customQuestion.trim() || customAnswers.some(a => !a.trim())) {
      Alert.alert('Invalid Question', 'Please fill in all fields.');
      return;
    }
    
    // Add custom question logic here
    Alert.alert('Success', 'Custom question added!');
    setShowCustomQuestion(false);
    setCustomQuestion('');
    setCustomAnswers(['', '', '', '']);
    setCorrectAnswer(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Moderator</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.languageInfo}>
              <Text style={styles.flag}>{selectedLanguage?.flag}</Text>
              <Text style={styles.languageName}>{selectedLanguage?.name}</Text>
            </View>

            {!sessionCode ? (
              <TouchableOpacity
                style={styles.createButton}
                onPress={handleCreateSession}
                activeOpacity={0.8}
              >
                <Text style={styles.createButtonText}>Create Game Session</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.sessionInfo}>
                <Text style={styles.sessionTitle}>Session Code</Text>
                <View style={styles.codeContainer}>
                  <Text style={styles.sessionCode}>{sessionCode}</Text>
                </View>
                <Text style={styles.shareText}>Share this code with players</Text>

                <View style={styles.playersSection}>
                  <View style={styles.playersHeader}>
                    <Users size={20} color="#667eea" />
                    <Text style={styles.playersTitle}>Players ({players.length})</Text>
                  </View>
                  
                  {players.length === 0 ? (
                    <Text style={styles.noPlayers}>Waiting for players to join...</Text>
                  ) : (
                    <View style={styles.playersList}>
                      {players.map((player) => (
                        <View key={player.id} style={styles.playerCard}>
                          <Text style={styles.playerName}>{player.name}</Text>
                          <Text style={styles.playerScore}>Score: {player.score}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>

                <View style={styles.controlsSection}>
                  <TouchableOpacity
                    style={styles.controlButton}
                    onPress={() => setShowCustomQuestion(!showCustomQuestion)}
                    activeOpacity={0.8}
                  >
                    <Plus size={20} color="white" />
                    <Text style={styles.controlButtonText}>Add Custom Question</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.controlButton, styles.startButton]}
                    onPress={handleStartGame}
                    activeOpacity={0.8}
                  >
                    <Play size={20} color="white" />
                    <Text style={styles.controlButtonText}>Start Game</Text>
                  </TouchableOpacity>
                </View>

                {showCustomQuestion && (
                  <View style={styles.customQuestionForm}>
                    <Text style={styles.formTitle}>Add Custom Question</Text>
                    
                    <TextInput
                      style={styles.questionInput}
                      placeholder="Enter your question..."
                      value={customQuestion}
                      onChangeText={setCustomQuestion}
                      multiline
                    />

                    {customAnswers.map((answer, index) => (
                      <View key={index} style={styles.answerRow}>
                        <TextInput
                          style={[
                            styles.answerInput,
                            correctAnswer === index && styles.correctAnswer
                          ]}
                          placeholder={`Answer ${index + 1}`}
                          value={answer}
                          onChangeText={(text) => {
                            const newAnswers = [...customAnswers];
                            newAnswers[index] = text;
                            setCustomAnswers(newAnswers);
                          }}
                        />
                        <TouchableOpacity
                          style={[
                            styles.correctButton,
                            correctAnswer === index && styles.correctButtonActive
                          ]}
                          onPress={() => setCorrectAnswer(index)}
                        >
                          <Text style={[
                            styles.correctButtonText,
                            correctAnswer === index && styles.correctButtonTextActive
                          ]}>
                            ✓
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ))}

                    <View style={styles.formButtons}>
                      <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => setShowCustomQuestion(false)}
                      >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={handleAddCustomQuestion}
                      >
                        <Text style={styles.addButtonText}>Add Question</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 10,
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 30,
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  languageName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  createButton: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#667eea',
  },
  sessionInfo: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  sessionTitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  codeContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 8,
  },
  sessionCode: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#667eea',
    letterSpacing: 4,
  },
  shareText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  playersSection: {
    marginBottom: 24,
  },
  playersHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  playersTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  noPlayers: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  playersList: {
    gap: 8,
  },
  playerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  playerScore: {
    fontSize: 14,
    color: '#666',
  },
  controlsSection: {
    gap: 12,
  },
  controlButton: {
    backgroundColor: '#667eea',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButton: {
    backgroundColor: '#28a745',
  },
  controlButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8,
  },
  customQuestionForm: {
    marginTop: 24,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  questionInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  answerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  answerInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginRight: 8,
  },
  correctAnswer: {
    borderWidth: 2,
    borderColor: '#28a745',
  },
  correctButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  correctButtonActive: {
    backgroundColor: '#28a745',
  },
  correctButtonText: {
    fontSize: 18,
    color: '#666',
  },
  correctButtonTextActive: {
    color: 'white',
  },
  formButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#6c757d',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  addButton: {
    flex: 1,
    backgroundColor: '#28a745',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});