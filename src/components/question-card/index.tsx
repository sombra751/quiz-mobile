import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Question, Choice } from '../../types/types';

interface QuestionCardProps {
  questions: Question[];
  currentQuestionId: number;
  questionNumber: number; // Nova prop para o número da questão
}

const QuestionCard: React.FC<QuestionCardProps> = ({ questions, currentQuestionId, questionNumber }) => {
  const currentQuestion = questions.find(q => q.id === currentQuestionId);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.questionText}>
          {questionNumber}) {currentQuestion?.question} {/* Exibir o número da questão */}
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
    textAlign: 'center',
  },
});

export default QuestionCard;