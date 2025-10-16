import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Users, Crown } from 'lucide-react-native';
import { useGame } from '@/store/game-store';

export default function RoleSelection() {
  const { setUserRole } = useGame();

  const handleRoleSelect = (role: 'moderator' | 'player') => {
    setUserRole(role);
    router.push('/language-select');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Quiz Master</Text>
          <Text style={styles.subtitle}>Choose your role to begin</Text>
          
          <View style={styles.roleContainer}>
            <TouchableOpacity
              style={styles.roleCard}
              onPress={() => handleRoleSelect('moderator')}
              activeOpacity={0.8}
            >
              <View style={styles.iconContainer}>
                <Crown size={48} color="#667eea" />
              </View>
              <Text style={styles.roleTitle}>Moderator</Text>
              <Text style={styles.roleDescription}>
                Host and control the quiz game. Select questions and manage players.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.roleCard}
              onPress={() => handleRoleSelect('player')}
              activeOpacity={0.8}
            >
              <View style={styles.iconContainer}>
                <Users size={48} color="#667eea" />
              </View>
              <Text style={styles.roleTitle}>Player</Text>
              <Text style={styles.roleDescription}>
                Join a quiz session and compete with other players.
              </Text>
            </TouchableOpacity>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 60,
    textAlign: 'center',
  },
  roleContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 20,
  },
  roleCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
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
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  roleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  roleDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
});