// AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/home';
import Questions from './src/screens/questions';

export type RootStackParamList = {
    Home: undefined;
    Questions: { questionId: number };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
              headerShown:false
            }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Questions" component={Questions} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;