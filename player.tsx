import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, LogIn } from 'lucide-react-native';
import { useGame } from '@/store/game-store';

export default function PlayerScreen() {
  const { selectedLanguage, joinSession, playerName, setPlayerName } = useGame();
  const [sessionCode, setSessionCode] = useState('');

  const handleJoinSession = () => {
    if (!playerName.trim()) {
      Alert.alert('Name Required', 'Please enter your name to join the game.');
      return;
    }
    
    if (!sessionCode.trim()) {
      Alert.alert('Session Code Required', 'Please enter a valid session code.');
      return;
    }

    const success = joinSession(sessionCode.toUpperCase(), playerName.trim());
    if (success) {
      router.push('/game');
    } else {
      Alert.alert('Invalid Code', 'Session not found. Please check the code and try again.');
    }
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
          <Text style={styles.title}>Join Game</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.content}>
          <View style={styles.languageInfo}>
            <Text style={styles.flag}>{selectedLanguage?.flag}</Text>
            <Text style={styles.languageName}>{selectedLanguage?.name}</Text>
          </View>

          <View style={styles.joinForm}>
            <Text style={styles.formTitle}>Enter Game Details</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Your Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={playerName}
                onChangeText={setPlayerName}
                maxLength={20}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Session Code</Text>
              <TextInput
                style={[styles.input, styles.codeInput]}
                placeholder="Enter session code"
                value={sessionCode}
                onChangeText={(text) => setSessionCode(text.toUpperCase())}
                maxLength={6}
                autoCapitalize="characters"
              />
            </View>

            <TouchableOpacity
              style={styles.joinButton}
              onPress={handleJoinSession}
              activeOpacity={0.8}
            >
              <LogIn size={20} color="white" />
              <Text style={styles.joinButtonText}>Join Game</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>How to Play</Text>
            <Text style={styles.infoText}>
              1. Enter your name and the session code provided by the moderator{'\n'}
              2. Wait for the game to start{'\n'}
              3. Answer questions as they appear{'\n'}
              4. Compete for the highest score!
            </Text>
          </View>
        </View>
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
  content: {
    flex: 1,
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
  joinForm: {
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
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
  },
  codeInput: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  joinButton: {
    backgroundColor: '#667eea',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  joinButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8,
  },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
  },
});