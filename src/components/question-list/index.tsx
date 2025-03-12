import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute, useNavigation, RouteProp, NavigationProp } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import AlertDialog from '../../components/alert-dialog';
import { resetChartData } from '../../store/actions';
import { RootStackParamList } from '../../../app-router';
import { Question, Choice } from '../../types/types';

interface QuestionsListProps {
  questions: Question[];
}

type QuestionScreenRouteProp = RouteProp<RootStackParamList, 'Questions'>;
type QuestionScreenNavigationProp = NavigationProp<RootStackParamList, 'Questions'>;

const QuestionsList: React.FC<QuestionsListProps> = ({ questions }) => {
  const route = useRoute<QuestionScreenRouteProp>();
  const navigation = useNavigation<QuestionScreenNavigationProp>();
  const { questionId } = route.params;
  const dispatch = useDispatch();
  const [choices, setChoices] = useState<Choice[]>([]);
  const [choice, setChoice] = useState<number | null>(null);
  const [dialog, setDialog] = useState(false);
  const [color, setColor] = useState('#efefef');
  const currentQuestion = useRef<Question | undefined>(undefined);

  useEffect(() => {
    currentQuestion.current = questions.find(q => q.id === questionId);
    if (currentQuestion.current) {
      setChoices(currentQuestion.current.choices);
      dispatch(resetChartData());
    }
  }, [questionId, dispatch, questions]);

  const handleAnswers = (index: number) => {
    setChoice(index);
    if (choices[index].isTrue) {
      setColor('#57e71d');
      setTimeout(() => rightQuestion(), 1000);
    } else {
      setColor('#f60808');
      setDialog(true); // Exibe o AlertDialog quando a resposta é errada
    }
  };

  const rightQuestion = () => {
    const next = questionId + 1;
    setChoice(null);

    const nextQuestion = questions.find(q => q.id === next);
    if (nextQuestion) {
      navigation.navigate('Questions', { questionId: next });
    } else {
      // Se não houver mais perguntas, navegue para uma tela de conclusão
      navigation.navigate('Home');
    }
  };

  const handleCloseDialog = () => {
    setDialog(false);
  };

  return (
    <View style={styles.container}>
      {choices.map((item, i) => (
        <TouchableOpacity key={i} style={[styles.option, choice === i && { backgroundColor: color }]} onPress={() => handleAnswers(i)}>
          <Text style={styles.optionText}>{String.fromCharCode(65 + i)}. {item.answer}</Text>
        </TouchableOpacity>
      ))}
      <AlertDialog dialog={dialog} score={questionId - 1} onClose={handleCloseDialog} />
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  option: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 3,
    width: '100%',
  },
  optionText: { fontSize: 18, fontWeight: 'bold', color: 'black' },
});

export default QuestionsList;