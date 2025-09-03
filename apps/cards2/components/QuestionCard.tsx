import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react-native';
import { Question } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';

const { height } = Dimensions.get('window');

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onNext: () => void;
  onPrevious: () => void;
  onShuffle: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export default function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  onNext,
  onPrevious,
  onShuffle,
  canGoNext,
  canGoPrevious,
}: QuestionCardProps) {
  const { t } = useTranslation();

  const getGradientColors = () => {
    switch (question.group) {
      case 'partners':
        return ['#ff6b6b', '#ee5a24'] as const;
      case 'friends':
        return ['#4834d4', '#686de0'] as const;
      case 'parent-child':
        return ['#00d2d3', '#54a0ff'] as const;
      default:
        return ['#74b9ff', '#0984e3'] as const;
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={getGradientColors()}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <Text style={styles.counter}>
            {currentIndex + 1} / {totalQuestions}
          </Text>
          <TouchableOpacity style={styles.shuffleButton} onPress={onShuffle}>
            <RotateCcw size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.text}</Text>
        </View>

        <View style={styles.navigation}>
          <TouchableOpacity
            style={[styles.navButton, !canGoPrevious && styles.disabledButton]}
            onPress={onPrevious}
            disabled={!canGoPrevious}
          >
            <ChevronLeft size={24} color={canGoPrevious ? "#fff" : "#ffffff80"} />
            <Text style={[styles.navText, !canGoPrevious && styles.disabledText]}>
              {t('previousQuestion')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, !canGoNext && styles.disabledButton]}
            onPress={onNext}
            disabled={!canGoNext}
          >
            <Text style={[styles.navText, !canGoNext && styles.disabledText]}>
              {t('nextQuestion')}
            </Text>
            <ChevronRight size={24} color={canGoNext ? "#fff" : "#ffffff80"} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {!canGoNext && (
        <View style={styles.endMessage}>
          <Text style={styles.endMessageText}>{t('noMoreQuestions')}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 24,
    padding: 24,
    minHeight: height * 0.6,
    justifyContent: 'space-between',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  counter: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    opacity: 0.9,
  },
  shuffleButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  questionText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 32,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    gap: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  navText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  disabledText: {
    color: '#ffffff80',
  },
  endMessage: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    alignItems: 'center',
  },
  endMessageText: {
    color: '#6c757d',
    fontSize: 16,
    textAlign: 'center',
  },
});