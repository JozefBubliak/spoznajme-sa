import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LANGUAGES } from '@/constants/languages';
import { useAppStore } from '@/store/appStore';
import { useTranslation } from '@/hooks/useTranslation';

interface LanguageSelectorProps {
  onLanguageSelect?: () => void;
}

export default function LanguageSelector({ onLanguageSelect }: LanguageSelectorProps) {
  const { setLanguage, language } = useAppStore();
  const { t } = useTranslation();

  const handleLanguageSelect = (langCode: string) => {
    setLanguage(langCode);
    onLanguageSelect?.();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('selectLanguage')}</Text>
      <ScrollView style={styles.languageList} showsVerticalScrollIndicator={false}>
        {LANGUAGES.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.languageItem,
              language === lang.code && styles.selectedLanguage
            ]}
            onPress={() => handleLanguageSelect(lang.code)}
          >
            <Text style={styles.flag}>{lang.flag}</Text>
            <View style={styles.languageInfo}>
              <Text style={[
                styles.languageName,
                language === lang.code && styles.selectedText
              ]}>
                {lang.nativeName}
              </Text>
              <Text style={[
                styles.languageSubtext,
                language === lang.code && styles.selectedSubtext
              ]}>
                {lang.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    marginBottom: 30,
    color: '#2c3e50',
  },
  languageList: {
    flex: 1,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 4,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedLanguage: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
  },
  flag: {
    fontSize: 24,
    marginRight: 16,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  languageSubtext: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 2,
  },
  selectedText: {
    color: '#1976d2',
  },
  selectedSubtext: {
    color: '#42a5f5',
  },
});