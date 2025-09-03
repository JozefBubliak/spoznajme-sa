import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Users, Home } from 'lucide-react-native';
import { QuestionGroup } from '@/types';
import { useAppStore } from '@/store/appStore';
import { useTranslation } from '@/hooks/useTranslation';

interface GroupSelectorProps {
  onGroupSelect: (group: QuestionGroup) => void;
}

export default function GroupSelector({ onGroupSelect }: GroupSelectorProps) {
  const { user } = useAppStore();
  const { t } = useTranslation();

  const groups = [
    {
      id: 'partners' as QuestionGroup,
      title: t('partners'),
      description: t('partnersDesc'),
      icon: Heart,
      gradient: ['#ff6b6b', '#ee5a24'] as const,
      color: '#fff',
    },
    {
      id: 'friends' as QuestionGroup,
      title: t('friends'),
      description: t('friendsDesc'),
      icon: Users,
      gradient: ['#4834d4', '#686de0'] as const,
      color: '#fff',
    },
    {
      id: 'parent-child' as QuestionGroup,
      title: t('parentChild'),
      description: t('parentChildDesc'),
      icon: Home,
      gradient: ['#00d2d3', '#54a0ff'] as const,
      color: '#fff',
    },
  ];

  const getLimitText = () => {
    switch (user.tier) {
      case 'demo':
        return t('demoLimit');
      case 'free':
        return t('freeLimit');
      case 'premium':
        return t('premiumUnlimited');
      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('chooseGroup')}</Text>
      <Text style={styles.subtitle}>{getLimitText()}</Text>
      
      <View style={styles.groupsContainer}>
        {groups.map((group) => {
          const IconComponent = group.icon;
          return (
            <TouchableOpacity
              key={group.id}
              style={styles.groupCard}
              onPress={() => onGroupSelect(group.id)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={group.gradient}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.cardContent}>
                  <IconComponent size={40} color={group.color} />
                  <Text style={[styles.groupTitle, { color: group.color }]}>
                    {group.title}
                  </Text>
                  <Text style={[styles.groupDescription, { color: group.color }]}>
                    {group.description}
                  </Text>
                  <View style={styles.playButton}>
                    <Text style={styles.playButtonText}>{t('play')}</Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#7f8c8d',
    marginBottom: 30,
  },
  groupsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  groupCard: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  gradient: {
    padding: 24,
    minHeight: 160,
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  groupTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  groupDescription: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 16,
  },
  playButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  playButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});