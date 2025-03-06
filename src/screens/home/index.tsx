import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Guest from '../../components/guest';
import styles from './styles';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';


import jgImage from '../../../assets/images/bg/jg.png';
import bgImage from '../../../assets/images/bg/bg.jpg';

type RootStackParamList = {
  Home: undefined;
  Questions: { questionId: number };
};

const Stack = createStackNavigator<RootStackParamList>();

const Home = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [openSignIn, setOpenSignIn] = useState(false);

  const handleOpenSignIn = () => setOpenSignIn(true);
  const handleCloseSignIn = () => setOpenSignIn(false);

  const startGame = () => {
    navigation.navigate("Questions", { questionId: 1 });
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
      <View style={styles.home}>
        <TouchableOpacity onPress={handleOpenSignIn} style={styles.homeStart}>
          <Text style={styles.startText}>START</Text>
        </TouchableOpacity>
        <View style={styles.aboutContainer}>
          <Text style={[styles.title, styles.h1]}>
            Quiz do Milhão: Futebol Edition
          </Text>
          <Text style={[styles.description, styles.p]}>
            É um jogo de perguntas e respostas inspirado no clássico formato do
            Show do Milhão, mas totalmente focado no mundo do futebol...
          </Text>
          <Image source={jgImage} style={styles.image} />
        </View>
        <Guest open={openSignIn} onClose={handleCloseSignIn} onStartGame={startGame} display={true} />
      </View>
    </ImageBackground>
  );
};

export default Home;