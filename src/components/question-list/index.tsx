import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute, useNavigation, RouteProp, NavigationProp } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AlertDialog from '../../components/alert-dialog';
import { resetChartData } from '../../store/actions';
import questionsData from '../../../assets/questions.json';
import { RootStackParamList } from '../../../app-router';

interface Choice {
  answer: string;
  isTrue: boolean;
  isOnHalf: boolean;
  isOnCallHelp: boolean;
  probability?: number;
}

interface Question {
  id: number;
  question: string;
  difficulty: number;
  choices: Choice[];
}

interface QuestionsListProps {
  questions: Question[];
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
}

type QuestionScreenRouteProp = RouteProp<RootStackParamList, 'Questions'>;
type QuestionScreenNavigationProp = NavigationProp<RootStackParamList, 'Questions'>;

const QuestionsList: React.FC<QuestionsListProps> = ({ questions, timeLeft, setTimeLeft }) => {
  const route = useRoute<QuestionScreenRouteProp>();
  const navigation = useNavigation<QuestionScreenNavigationProp>();
  const { questionId } = route.params;
  const dispatch = useDispatch();
  const [choices, setChoices] = useState<Choice[]>([]);
  const [choice, setChoice] = useState<number | null>(null);
  const [dialog, setDialog] = useState(false);
  const [color, setColor] = useState('#efefef');
  const timerId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currentQuestion = questions.find(q => q.id === questionId);
    if (currentQuestion) {
      setChoices(currentQuestion.choices);
      dispatch(resetChartData());
    }
  }, [questionId, dispatch, questions]);

  useEffect(() => {
    setTimeLeft(60);
    if (timerId.current) {
      clearInterval(timerId.current);
    }
    timerId.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          if (timerId.current) {
            clearInterval(timerId.current);
          }
          wrongQuestion();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    };
  }, [questionId, setTimeLeft]);

  const handleAnswers = (index: number) => {
    setChoice(index);
    if (choices[index].isTrue) {
      setColor('#57e71d');
      if (timerId.current) {
        clearInterval(timerId.current);
      }
      setTimeout(() => rightQuestion(), 1000);
    } else {
      setColor('#f60808');
      wrongQuestion();
    }
  };

  const rightQuestion = () => {
    const next = questionId + 1;
    setChoice(null);
    navigation.navigate('Questions', { questionId: next });
  };

  const wrongQuestion = () => {
    setTimeout(() => {
      setDialog(true);
    }, 0);
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  timer: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
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