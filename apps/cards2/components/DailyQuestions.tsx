import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Star } from 'lucide-react-native';
import { QuestionGroup } from '@/types';
import { useAppStore } from '@/store/appStore';
import { useTranslation } from '@/hooks/useTranslation';

interface DailyQuestionsProps {
  group: QuestionGroup;
  onQuestionSelect: (questionIndex: number) => void;
}

export default function DailyQuestions({ group, onQuestionSelect }: DailyQuestionsProps) {
  const { getDailyQuestionsForGroup, user } = useAppStore();
  const { t } = useTranslation();
  
  const dailyQuestions = getDailyQuestionsForGroup(group);

  if (user.tier === 'demo' || dailyQuestions.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Star size={20} color="#ffd700" />
        <Text style={styles.title}>{t('questionsOfTheDay')}</Text>
        <Star size={20} color="#ffd700" />
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.questionsScroll}>
        {dailyQuestions.map((dq, index) => (
          <TouchableOpacity
            key={dq.id}
            style={styles.questionCard}
            onPress={() => onQuestionSelect(index)}
          >
            <Text style={styles.questionText} numberOfLines={3}>
              {dq.question.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  questionsScroll: {
    paddingLeft: 20,
  },
  questionCard: {
    backgroundColor: '#fff3cd',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 200,
    minHeight: 100,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ffeaa7',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  questionText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
  },
});