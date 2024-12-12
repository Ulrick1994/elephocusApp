import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen'; 
import MainScreen from './Screens/MainScreen'; 
import CrearFlashcardScreen from './Screens/CreateFlashcardScreen';
import CatalogoFlashcardsScreen from './Screens/CatalogueFlashcards';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="CrearFlashcard" component={CrearFlashcardScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="CatalogoFlashcards" component={CatalogoFlashcardsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;