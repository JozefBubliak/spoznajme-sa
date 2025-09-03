import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Stack } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useAppStore } from '@/store/appStore';
import { mockQuestions, mockCategories, mockDailyQuestions } from '@/data/mockData';
import LanguageSelector from '@/components/LanguageSelector';
import GroupSelector from '@/components/GroupSelector';
import CategorySelector from '@/components/CategorySelector';
import DailyQuestions from '@/components/DailyQuestions';
import QuestionCard from '@/components/QuestionCard';
import { QuestionGroup } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';

type AppState = 'language' | 'groups' | 'categories' | 'questions';

export default function HomeScreen() {
  const {
    language,
    currentGroup,
    setCurrentGroup,
    setQuestions,
    setCategories,
    setDailyQuestions,
    getCurrentQuestions,
    currentQuestionIndex,
    nextQuestion,
    previousQuestion,
    shuffleQuestions,
    selectedCategories,
    setSelectedCategories,
  } = useAppStore();
  
  const { t } = useTranslation();
  const [appState, setAppState] = useState<AppState>('language');
  const [filteredQuestions, setFilteredQuestions] = useState<any[]>([]);

  // Initialize mock data
  useEffect(() => {
    setQuestions(mockQuestions);
    setCategories(mockCategories);
    setDailyQuestions(mockDailyQuestions);
  }, []);

  // Handle app state transitions
  useEffect(() => {
    if (language && appState === 'language') {
      setAppState('groups');
    }
  }, [language, appState]);

  // Update filtered questions when dependencies change
  useEffect(() => {
    const questions = getCurrentQuestions();
    setFilteredQuestions(questions);
  }, [currentGroup, selectedCategories, language]);

  const handleLanguageSelect = () => {
    setAppState('groups');
  };

  const handleGroupSelect = (group: QuestionGroup) => {
    setCurrentGroup(group);
    setAppState('categories');
  };

  const handleStartQuestions = () => {
    shuffleQuestions();
    setAppState('questions');
  };

  const handleBackToGroups = () => {
    setCurrentGroup(null);
    setSelectedCategories([]);
    setAppState('groups');
  };

  const handleShuffle = () => {
    shuffleQuestions();
  };

  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const canGoNext = currentQuestionIndex < filteredQuestions.length - 1;
  const canGoPrevious = currentQuestionIndex > 0;

  const getScreenTitle = () => {
    switch (appState) {
      case 'language':
        return t('selectLanguage');
      case 'groups':
        return t('chooseGroup');
      case 'categories':
        return currentGroup ? t(currentGroup === 'parent-child' ? 'parentChild' : currentGroup) : t('categories');
      case 'questions':
        return currentGroup ? t(currentGroup === 'parent-child' ? 'parentChild' : currentGroup) : '';
      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: getScreenTitle(),
          headerBackVisible: appState !== 'language' && appState !== 'groups',
          headerLeft: appState === 'categories' || appState === 'questions' ? 
            () => (
              <TouchableOpacity onPress={handleBackToGroups} style={styles.headerButton}>
                <ChevronLeft size={20} color="#007AFF" />
                <Text style={styles.headerButtonText}>{t('backToGroups')}</Text>
              </TouchableOpacity>
            ) : undefined
        }} 
      />

      {appState === 'language' && (
        <LanguageSelector onLanguageSelect={handleLanguageSelect} />
      )}

      {appState === 'groups' && (
        <GroupSelector onGroupSelect={handleGroupSelect} />
      )}

      {appState === 'categories' && currentGroup && (
        <View style={styles.container}>
          <DailyQuestions 
            group={currentGroup} 
            onQuestionSelect={() => setAppState('questions')} 
          />
          <CategorySelector 
            group={currentGroup} 
            onStartQuestions={handleStartQuestions} 
          />
        </View>
      )}

      {appState === 'questions' && currentQuestion && (
        <QuestionCard
          question={currentQuestion}
          currentIndex={currentQuestionIndex}
          totalQuestions={filteredQuestions.length}
          onNext={nextQuestion}
          onPrevious={previousQuestion}
          onShuffle={handleShuffle}
          canGoNext={canGoNext}
          canGoPrevious={canGoPrevious}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  headerButtonText: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 4,
  },
});