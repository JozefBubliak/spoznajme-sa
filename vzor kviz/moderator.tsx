import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, Alert, FlatList } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Users, Settings, Lock, Unlock } from 'lucide-react-native';
import { useGame } from '@/store/game-store';

export default function ModeratorScreen() {
  const { 
    selectedLanguage, 
    currentGame, 
    players, 
    categories,
    isLobbyLocked,
    isCreatingGame,
    createGame, 
    lockLobby,
    createGameError
  } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [questionCount, setQuestionCount] = useState<string>('5');
  const [timerSeconds, setTimerSeconds] = useState<string>('30');

  const handleCreateSession = () => {
    if (!selectedLanguage) {
      Alert.alert('Error', 'Please select a language first.');
      return;
    }
    createGame();
  };

  const handleLockLobby = () => {
    if (!currentGame) return;
    
    Alert.alert(
      'Lock Lobby',
      'Are you sure you want to lock the lobby? No new players will be able to join.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Lock', onPress: () => lockLobby() }
      ]
    );
  };

  const handleSetupRound = () => {
    if (!selectedCategory) {
      Alert.alert('Error', 'Please select a category first.');
      return;
    }
    
    const count = parseInt(questionCount);
    const timer = parseInt(timerSeconds);
    
    if (isNaN(count) || count < 1 || count > 20) {
      Alert.alert('Error', 'Question count must be between 1 and 20.');
      return;
    }
    
    if (isNaN(timer) || timer < 10 || timer > 120) {
      Alert.alert('Error', 'Timer must be between 10 and 120 seconds.');
      return;
    }
    
    router.push('/game');
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

            {createGameError && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{createGameError.message}</Text>
              </View>
            )}

            {!currentGame ? (
              <TouchableOpacity
                style={[styles.createButton, isCreatingGame && styles.disabledButton]}
                onPress={handleCreateSession}
                activeOpacity={0.8}
                disabled={isCreatingGame}
              >
                <Text style={styles.createButtonText}>
                  {isCreatingGame ? 'Creating...' : 'Create Game Session'}
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.sessionInfo}>
                <Text style={styles.sessionTitle}>Session Code</Text>
                <View style={styles.codeContainer}>
                  <Text style={styles.sessionCode}>{currentGame.code}</Text>
                </View>
                <Text style={styles.shareText}>Share this code with players</Text>

                <View style={styles.playersSection}>
                  <View style={styles.playersHeader}>
                    <Users size={20} color="#667eea" />
                    <Text style={styles.playersTitle}>Players ({players.length})</Text>
                    <TouchableOpacity
                      style={[styles.lockButton, isLobbyLocked && styles.lockedButton]}
                      onPress={handleLockLobby}
                      disabled={isLobbyLocked}
                    >
                      {isLobbyLocked ? (
                        <Lock size={16} color="#dc3545" />
                      ) : (
                        <Unlock size={16} color="#28a745" />
                      )}
                    </TouchableOpacity>
                  </View>
                  
                  {players.length === 0 ? (
                    <Text style={styles.noPlayers}>Waiting for players to join...</Text>
                  ) : (
                    <FlatList
                      data={players}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item }) => (
                        <View style={styles.playerCard}>
                          <Text style={styles.playerName}>{item.name}</Text>
                          <Text style={styles.playerScore}>Score: {item.score}</Text>
                        </View>
                      )}
                      style={styles.playersList}
                    />
                  )}
                </View>

                {isLobbyLocked && (
                  <View style={styles.gameSetupSection}>
                    <Text style={styles.sectionTitle}>Game Setup</Text>
                    
                    <Text style={styles.inputLabel}>Select Category</Text>
                    <FlatList
                      data={categories}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={[
                            styles.categoryCard,
                            selectedCategory === item.id && styles.selectedCategory
                          ]}
                          onPress={() => setSelectedCategory(item.id)}
                        >
                          <Text style={[
                            styles.categoryName,
                            selectedCategory === item.id && styles.selectedCategoryText
                          ]}>
                            {item.name}
                          </Text>
                          <Text style={styles.questionCountText}>
                            {item.question_count} questions
                          </Text>
                        </TouchableOpacity>
                      )}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={styles.categoriesList}
                    />

                    <View style={styles.inputRow}>
                      <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Questions</Text>
                        <TextInput
                          style={styles.numberInput}
                          value={questionCount}
                          onChangeText={setQuestionCount}
                          keyboardType="numeric"
                          placeholder="5"
                        />
                      </View>
                      <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Timer (sec)</Text>
                        <TextInput
                          style={styles.numberInput}
                          value={timerSeconds}
                          onChangeText={setTimerSeconds}
                          keyboardType="numeric"
                          placeholder="30"
                        />
                      </View>
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.controlButton, 
                        styles.startButton,
                        !selectedCategory && styles.disabledButton
                      ]}
                      onPress={handleSetupRound}
                      disabled={!selectedCategory}
                      activeOpacity={0.8}
                    >
                      <Settings size={20} color="white" />
                      <Text style={styles.controlButtonText}>Setup Round</Text>
                    </TouchableOpacity>
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
  errorContainer: {
    backgroundColor: '#f8d7da',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#721c24',
    fontSize: 14,
    textAlign: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  lockButton: {
    marginLeft: 'auto',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  lockedButton: {
    backgroundColor: '#f8d7da',
  },
  gameSetupSection: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  categoriesList: {
    marginBottom: 16,
  },
  categoryCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    minWidth: 120,
    alignItems: 'center',
  },
  selectedCategory: {
    backgroundColor: '#667eea',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  selectedCategoryText: {
    color: 'white',
  },
  questionCountText: {
    fontSize: 12,
    color: '#666',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  inputGroup: {
    flex: 1,
  },
  numberInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlign: 'center',
  },
});