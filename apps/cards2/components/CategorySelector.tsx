import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Check } from 'lucide-react-native';
import { QuestionGroup } from '@/types';
import { useAppStore } from '@/store/appStore';
import { useTranslation } from '@/hooks/useTranslation';

interface CategorySelectorProps {
  group: QuestionGroup;
  onStartQuestions: () => void;
}

export default function CategorySelector({ group, onStartQuestions }: CategorySelectorProps) {
  const { getCategoriesForGroup, selectedCategories, setSelectedCategories, user } = useAppStore();
  const { t } = useTranslation();
  
  const categories = getCategoriesForGroup(group);

  const toggleCategory = (categoryId: string) => {
    if (user.tier === 'demo') return; // Demo users can't select categories
    
    const newSelection = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    
    setSelectedCategories(newSelection);
  };

  const selectAllCategories = () => {
    if (user.tier === 'demo') return;
    
    const allCategoryIds = categories.map(c => c.id);
    setSelectedCategories(allCategoryIds);
  };

  const isAllSelected = selectedCategories.length === categories.length;
  const canSelectCategories = user.tier !== 'demo';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('selectCategories')}</Text>
      
      {canSelectCategories && (
        <TouchableOpacity
          style={[styles.allCategoriesButton, isAllSelected && styles.selectedButton]}
          onPress={selectAllCategories}
        >
          <Text style={[styles.allCategoriesText, isAllSelected && styles.selectedText]}>
            {t('allCategories')}
          </Text>
          {isAllSelected && <Check size={20} color="#fff" />}
        </TouchableOpacity>
      )}

      <ScrollView style={styles.categoriesList} showsVerticalScrollIndicator={false}>
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category.id);
          const isDisabled = !canSelectCategories;
          
          return (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryItem,
                isSelected && styles.selectedCategory,
                isDisabled && styles.disabledCategory
              ]}
              onPress={() => toggleCategory(category.id)}
              disabled={isDisabled}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={[
                styles.categoryName,
                isSelected && styles.selectedCategoryText,
                isDisabled && styles.disabledText
              ]}>
                {category.name}
              </Text>
              {isSelected && <Check size={20} color="#2196f3" />}
              {isDisabled && (
                <Text style={styles.lockText}>🔒</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.startButton,
          (selectedCategories.length === 0 && canSelectCategories) && styles.disabledStartButton
        ]}
        onPress={onStartQuestions}
        disabled={selectedCategories.length === 0 && canSelectCategories}
      >
        <Text style={styles.startButtonText}>
          {canSelectCategories ? t('getStarted') : t('play')}
        </Text>
      </TouchableOpacity>

      {!canSelectCategories && (
        <Text style={styles.demoNote}>
          {t('demoLimit')}
        </Text>
      )}
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50',
  },
  allCategoriesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    borderWidth: 2,
    borderColor: '#e9ecef',
    gap: 8,
  },
  selectedButton: {
    backgroundColor: '#2196f3',
    borderColor: '#2196f3',
  },
  allCategoriesText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  selectedText: {
    color: '#fff',
  },
  categoriesList: {
    flex: 1,
    marginBottom: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 4,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCategory: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
  },
  disabledCategory: {
    opacity: 0.6,
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  categoryName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
  },
  selectedCategoryText: {
    color: '#1976d2',
  },
  disabledText: {
    color: '#95a5a6',
  },
  lockText: {
    fontSize: 16,
  },
  startButton: {
    backgroundColor: '#2196f3',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledStartButton: {
    backgroundColor: '#bdc3c7',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  demoNote: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 14,
    color: '#7f8c8d',
  },
});