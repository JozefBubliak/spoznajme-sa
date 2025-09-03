import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, Medal, Award, Home, RotateCcw } from 'lucide-react-native';
import { useGame } from '@/store/game-store';

export default function ResultsScreen() {
  const { players, selectedLanguage, resetGame } = useGame();

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];

  const handlePlayAgain = () => {
    resetGame();
    router.push('/');
  };

  const handleGoHome = () => {
    resetGame();
    router.push('/');
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy size={24} color="#FFD700" />;
      case 2:
        return <Medal size={24} color="#C0C0C0" />;
      case 3:
        return <Award size={24} color="#CD7F32" />;
      default:
        return null;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return '#FFD700';
      case 2:
        return '#C0C0C0';
      case 3:
        return '#CD7F32';
      default:
        return '#667eea';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.gradient}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.flag}>{selectedLanguage?.flag}</Text>
              <Text style={styles.title}>Game Results</Text>
              <Text style={styles.subtitle}>Final Scores</Text>
            </View>

            {winner && (
              <View style={styles.winnerCard}>
                <Trophy size={48} color="#FFD700" />
                <Text style={styles.winnerTitle}>Winner!</Text>
                <Text style={styles.winnerName}>{winner.name}</Text>
                <Text style={styles.winnerScore}>{winner.score} points</Text>
              </View>
            )}

            <View style={styles.leaderboard}>
              <Text style={styles.leaderboardTitle}>Leaderboard</Text>
              
              {sortedPlayers.map((player, index) => {
                const rank = index + 1;
                const isWinner = rank === 1;
                
                return (
                  <View
                    key={player.id}
                    style={[
                      styles.playerCard,
                      isWinner && styles.winnerPlayerCard,
                    ]}
                  >
                    <View style={styles.playerRank}>
                      {getRankIcon(rank) || (
                        <View style={[styles.rankCircle, { backgroundColor: getRankColor(rank) }]}>
                          <Text style={styles.rankText}>{rank}</Text>
                        </View>
                      )}
                    </View>
                    
                    <View style={styles.playerInfo}>
                      <Text style={[styles.playerName, isWinner && styles.winnerText]}>
                        {player.name}
                      </Text>
                      <Text style={styles.playerStats}>
                        {player.score} points
                      </Text>
                    </View>

                    {isWinner && (
                      <View style={styles.crownContainer}>
                        <Text style={styles.crown}>👑</Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handlePlayAgain}
                activeOpacity={0.8}
              >
                <RotateCcw size={20} color="white" />
                <Text style={styles.actionButtonText}>Play Again</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.homeButton]}
                onPress={handleGoHome}
                activeOpacity={0.8}
              >
                <Home size={20} color="#667eea" />
                <Text style={[styles.actionButtonText, styles.homeButtonText]}>
                  Home
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.gameStats}>
              <Text style={styles.gameStatsTitle}>Game Statistics</Text>
              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{players.length}</Text>
                  <Text style={styles.statLabel}>Players</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>
                    {Math.max(...players.map(p => p.score))}
                  </Text>
                  <Text style={styles.statLabel}>Highest Score</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>
                    {Math.round(players.reduce((sum, p) => sum + p.score, 0) / players.length)}
                  </Text>
                  <Text style={styles.statLabel}>Average Score</Text>
                </View>
              </View>
            </View>
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  flag: {
    fontSize: 32,
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  winnerCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  winnerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
    marginBottom: 8,
  },
  winnerName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 4,
  },
  winnerScore: {
    fontSize: 18,
    color: '#666',
    fontWeight: '600',
  },
  leaderboard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  leaderboardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  winnerPlayerCard: {
    backgroundColor: '#fff9e6',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  playerRank: {
    marginRight: 16,
  },
  rankCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  winnerText: {
    color: '#FFD700',
  },
  playerStats: {
    fontSize: 14,
    color: '#666',
  },
  crownContainer: {
    marginLeft: 8,
  },
  crown: {
    fontSize: 24,
  },
  actions: {
    gap: 12,
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: '#667eea',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeButton: {
    backgroundColor: 'white',
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8,
  },
  homeButtonText: {
    color: '#667eea',
  },
  gameStats: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
  },
  gameStatsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
});