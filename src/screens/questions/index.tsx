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

import bgImage from '../../../assets/images/bg/bg.jpg';
import { Question } from '../../types/types';

type QuestionScreenRouteProp = RouteProp<RootStackParamList, 'Questions'>;

const Questions: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<QuestionScreenRouteProp>();
  const { questionId } = route.params;

  useEffect(() => {
    setQuestions(questionsData.data.questions);
  }, []);

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
       <View style={styles.overlay} />
      <View style={styles.container}>
        <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
          <Icon name="home" size={30} color="white" />
        </TouchableOpacity>
        <View style={styles.content}>
          {questions && (
            <View style={styles.questionContainer}>
              <QuestionCard questions={questions} currentQuestionId={questionId} questionNumber={questionId} />
              <QuestionsList questions={questions} />
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
  homeButton: {
    backgroundColor: '#ad8056',
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Cor cinza escura com 50% de opacidade
  },
});

export default Questions;