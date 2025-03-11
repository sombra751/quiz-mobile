import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useRoute, useNavigation, RouteProp, NavigationProp } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AlertDialog from '../../components/alert-dialog';
import { resetChartData } from '../../store/actions';
import { RootStackParamList } from '../../../app-router';
import QuestionCard from '../question-card';
import { Question, Choice } from '../../types/types';

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
  const wrongQuestionCalled = useRef(false);
  const [currentDifficulty, setCurrentDifficulty] = useState<number>(0);
  const [difficultyModalVisible, setDifficultyModalVisible] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const currentQuestion = useRef<Question | undefined>(undefined);

  useEffect(() => {
    const shuffleArray = (array: Question[]) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };

    const groupedQuestions = questions.reduce((acc: { [key: number]: Question[] }, question: Question) => {
      if (!acc[question.difficulty]) {
        acc[question.difficulty] = [];
      }
      acc[question.difficulty].push(question);
      return acc;
    }, {});

    const shuffled = Object.values(groupedQuestions).flatMap(group => shuffleArray(group));
    setShuffledQuestions(shuffled);
  }, [questions]);

  useEffect(() => {
    currentQuestion.current = shuffledQuestions.find(q => q.id === questionId);
    if (currentQuestion.current) {
      setChoices(currentQuestion.current.choices);
      dispatch(resetChartData());
    }
  }, [questionId, dispatch, shuffledQuestions]);

  useEffect(() => {
    setTimeLeft(30);
    wrongQuestionCalled.current = false;
    if (timerId.current) {
      clearInterval(timerId.current);
    }
    timerId.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          if (timerId.current) {
            clearInterval(timerId.current);
          }
          if (!wrongQuestionCalled.current) {
            wrongQuestion();
          }
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
  }, [questionId, setTimeLeft, currentDifficulty]);

  useEffect(() => {
    setDifficultyModalVisible(true);
    const modalTimer = setTimeout(() => {
      setDifficultyModalVisible(false);
    }, 5000);
    return () => clearTimeout(modalTimer);
  }, [currentDifficulty]);

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
      if (timerId.current) {
        clearInterval(timerId.current);
      }
      if (!wrongQuestionCalled.current) {
        wrongQuestion();
      }
    }
  };

  const rightQuestion = () => {
    const next = questionId + 1;
    setChoice(null);

    const nextQuestion = shuffledQuestions.find(q => q.id === next && q.difficulty === currentDifficulty);
    if (!nextQuestion) {
      if (currentDifficulty < 2) {
        setCurrentDifficulty(currentDifficulty + 1);
        const nextDifficultyQuestion = shuffledQuestions.find(q => q.difficulty === currentDifficulty + 1);
        if (nextDifficultyQuestion) {
          navigation.navigate('Questions', { questionId: nextDifficultyQuestion.id });
        } else {
          navigation.navigate('Questions', { questionId: shuffledQuestions.find(q => q.difficulty === currentDifficulty + 1)?.id || 1 });
        }
      } else {
        navigation.navigate('Questions', { questionId: next });
      }
    } else {
      navigation.navigate('Questions', { questionId: next });
    }
  };

  const wrongQuestion = () => {
    wrongQuestionCalled.current = true;
    setTimeout(() => {
      setDialog(true);
    }, 0);
  };

  const handleCloseDialog = () => {
    setDialog(false);
  };

  const getDifficultyText = (difficulty: number): string => {
    switch (difficulty) {
      case 0:
        return 'Fácil';
      case 1:
        return 'Médio';
      case 2:
        return 'Difícil';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <View style={styles.container}>
      {/* <QuestionCard questions={shuffledQuestions} currentQuestionId={questionId} /> */}
      {choices.map((item, i) => (
        <TouchableOpacity key={i} style={[styles.option, choice === i && { backgroundColor: color }]} onPress={() => handleAnswers(i)}>
          <Text style={styles.optionText}>{String.fromCharCode(65 + i)}. {item.answer}</Text>
        </TouchableOpacity>
      ))}
      <AlertDialog dialog={dialog} score={questionId - 1} onClose={handleCloseDialog} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={difficultyModalVisible}
        onRequestClose={() => {
          setDifficultyModalVisible(!difficultyModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Nível {getDifficultyText(currentDifficulty)}!
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
    questionText: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },

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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default QuestionsList;