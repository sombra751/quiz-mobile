import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../app-router';

interface Choice {
  answer: string;
  isTrue: boolean;
  isOnHalf: boolean;
  isOnCallHelp: boolean;
  probability: number;
}

interface Question {
  id: number;
  question: string;
  difficulty: number;
  choices: Choice[];
}

interface QuestionCardProps {
  questions: Question[];
}

type QuestionCardRouteProp = RouteProp<RootStackParamList, 'Questions'>;

const QuestionCard: React.FC<QuestionCardProps> = ({ questions }) => {
  const route = useRoute<QuestionCardRouteProp>();
  const questionId = parseInt(route.params.questionId ? String(route.params.questionId) : '1', 10) - 1;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.questionText}>
          {questions[questionId]?.id + 1}) {questions[questionId]?.question}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', // Centraliza o texto
  },
});

export default QuestionCard;