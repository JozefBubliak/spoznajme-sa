import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { Crown, Globe, User, Star } from 'lucide-react-native';
import { useAppStore } from '@/store/appStore';
import { useTranslation } from '@/hooks/useTranslation';
import { LANGUAGES } from '@/constants/languages';

export default function SettingsScreen() {
  const { user, setUser, language, setLanguage } = useAppStore();
  const { t } = useTranslation();

  const handleUpgradeToPremium = () => {
    Alert.alert(
      'Upgrade to Premium',
      'Get unlimited access to all questions and categories!',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Upgrade', 
          onPress: () => setUser({ ...user, tier: 'premium' })
        }
      ]
    );
  };

  const handleTierChange = (tier: 'demo' | 'free' | 'premium') => {
    setUser({ ...user, tier });
  };

  const currentLanguage = LANGUAGES.find(lang => lang.code === language);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'demo': return '#95a5a6';
      case 'free': return '#3498db';
      case 'premium': return '#f39c12';
      default: return '#95a5a6';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'premium': return <Crown size={20} color="#f39c12" />;
      case 'free': return <Star size={20} color="#3498db" />;
      default: return <User size={20} color="#95a5a6" />;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: 'Settings' }} />
      
      {/* User Tier Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <View style={[styles.tierCard, { borderColor: getTierColor(user.tier) }]}>
          <View style={styles.tierHeader}>
            {getTierIcon(user.tier)}
            <Text style={[styles.tierTitle, { color: getTierColor(user.tier) }]}>
              {user.tier.charAt(0).toUpperCase() + user.tier.slice(1)}
            </Text>
          </View>
          
          <Text style={styles.tierDescription}>
            {user.tier === 'demo' && 'Access to 10 questions per group'}
            {user.tier === 'free' && 'Daily questions + limited access'}
            {user.tier === 'premium' && 'Unlimited access to all content'}
          </Text>
          
          {user.tier !== 'premium' && (
            <TouchableOpacity 
              style={styles.upgradeButton} 
              onPress={handleUpgradeToPremium}
            >
              <Crown size={16} color="#fff" />
              <Text style={styles.upgradeButtonText}>Upgrade to Premium</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Language Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Language</Text>
        
        <View style={styles.languageCard}>
          <Globe size={20} color="#3498db" />
          <View style={styles.languageInfo}>
            <Text style={styles.languageName}>
              {currentLanguage?.nativeName} ({currentLanguage?.name})
            </Text>
            <Text style={styles.languageFlag}>{currentLanguage?.flag}</Text>
          </View>
        </View>
      </View>

      {/* Debug Section (for testing) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Debug (Testing)</Text>
        
        <View style={styles.debugButtons}>
          <TouchableOpacity 
            style={[styles.debugButton, user.tier === 'demo' && styles.activeDebugButton]}
            onPress={() => handleTierChange('demo')}
          >
            <Text style={styles.debugButtonText}>Demo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.debugButton, user.tier === 'free' && styles.activeDebugButton]}
            onPress={() => handleTierChange('free')}
          >
            <Text style={styles.debugButtonText}>Free</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.debugButton, user.tier === 'premium' && styles.activeDebugButton]}
            onPress={() => handleTierChange('premium')}
          >
            <Text style={styles.debugButtonText}>Premium</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Language Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Change Language</Text>
        
        <View style={styles.languageGrid}>
          {LANGUAGES.slice(0, 6).map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageOption,
                language === lang.code && styles.selectedLanguageOption
              ]}
              onPress={() => setLanguage(lang.code)}
            >
              <Text style={styles.languageOptionFlag}>{lang.flag}</Text>
              <Text style={styles.languageOptionText}>{lang.nativeName}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  section: {
    margin: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  tierCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  tierTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tierDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 16,
  },
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f39c12',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 8,
  },
  upgradeButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  languageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  languageInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
  },
  languageFlag: {
    fontSize: 24,
  },
  debugButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  debugButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  activeDebugButton: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  debugButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2c3e50',
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    gap: 8,
    minWidth: '30%',
  },
  selectedLanguageOption: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
  },
  languageOptionFlag: {
    fontSize: 16,
  },
  languageOptionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2c3e50',
  },
});