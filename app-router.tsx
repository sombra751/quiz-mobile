// import 'react-native-reanimated';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/home';
import Questions from './src/screens/questions';
import { Finish } from './src/screens/finish';

// Importe o Reanimated e inicialize-o no início do arquivo


export type RootStackParamList = {
  Home: undefined;
  Questions: { questionId: number; userName: string };
  Finish: { total: string; points: string; userName: string };
};

const { Navigator, Screen, Group } = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen
          name="Home"
          component={Home}
        />

        <Group screenOptions={{ gestureEnabled: false }}>
          <Screen
            name="Questions"
            component={Questions}
          />

          <Screen
            name="Finish"
            component={Finish}
          />
        </Group>
      </Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;