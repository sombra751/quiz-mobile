import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import questionsData from '../../../assets/questions.json';
import QuestionCard from '../../components/question-card';
import QuestionsList from '../../components/question-list';
import HelperCard from '../../components/help-card';
import { useDispatch } from 'react-redux';
import { useNavigation, NavigationProp, useRoute, RouteProp } from '@react-navigation/native';
import { resetChartData } from '../../store/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RootStackParamList } from '../../../app-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Question, Choice } from '../../types/types';

import bgImage from '../../../assets/images/bg/bg.jpg';

type QuestionScreenRouteProp = RouteProp<RootStackParamList, 'Questions'>;

const Questions: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [timeLeft, setTimeLeft] = useState(30); // tempo em segundos
  const route = useRoute<QuestionScreenRouteProp>();
  const { questionId } = route.params;

  useEffect(() => {
    setQuestions(questionsData.data.questions);
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const childprops = {
    timeLeft,
    setTimeLeft,
  };

  const handleGoHome = () => {
    dispatch(resetChartData());
    navigation.navigate('Home');
  };

  const formatTime = (time: number): string => {
    return `${time < 10 ? `0${time}` : time}`;
  };

  return (
    <ImageBackground
      source={bgImage}
      style={[styles.container, styles.appBgColor]}
      imageStyle={{ resizeMode: 'cover' }}
    >
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.8)', 'transparent']}
        style={styles.gradient}
      />
      <View style={styles.container}>
        <View style={styles.timerContainer}>
          <View style={styles.timerBoard}>
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
          <Icon name="home" size={30} color="white" />
        </TouchableOpacity>
        <View style={styles.content}>
          {questions && (
            <View style={styles.questionContainer}>
              <QuestionCard questions={questions} currentQuestionId={questionId} questionNumber={questionId} />
              <QuestionsList questions={questions} {...childprops} />
            </View>
          )}
          <View style={styles.helperContainer}>
            <HelperCard />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  appBgColor: {
    minHeight: "100%",
    minWidth: "100%",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  timerBoard: {
    backgroundColor: '#333', // Dark gray background
    paddingVertical: 10, // Adjust vertical padding
    paddingHorizontal: 20, // Adjust horizontal padding
    borderRadius: 20, // Rounded corners
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#555', // Slightly lighter border
  },
  timerText: {
    fontSize: 28, // Adjust font size
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'monospace',
  },
  homeButton: {
    backgroundColor: '#65B307',
    padding: 10,
    borderRadius: 30,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  questionContainer: {
    width: '100%',
  },
  helperContainer: {
    width: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default Questions;