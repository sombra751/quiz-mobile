import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import questionsData from '../../../assets/questions.json';
import QuestionCard from '../../components/question-card';
import QuestionsList from '../../components/question-list';
import HelperCard from '../../components/help-card';
import { useDispatch } from 'react-redux';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { resetChartData } from '../../store/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RootStackParamList } from '../../../app-router';
import { LinearGradient } from 'expo-linear-gradient';

import bgImage from '../../../assets/images/bg/bg.jpg';


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

const Question: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]); // Inicializado como um array de Question
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    setQuestions(questionsData.data.questions);
  }, []);

  const childprops = {
    timeLeft,
    setTimeLeft,
  };

  const handleGoHome = () => {
    dispatch(resetChartData());
    navigation.navigate('Home');
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
        <Text style={styles.timer}>{timeLeft}s</Text>
      </View>
      <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
        <Icon name="home" size={30} color="white" />
      </TouchableOpacity>
      <View style={styles.content}>
        {questions && (
          <View style={styles.questionContainer}>
            <QuestionCard questions={questions} />
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
    // backgroundColor: '#f0f0f0',
    padding: 20,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
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

export default Question;