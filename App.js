import React, { useState, useEffect } from 'react'; 
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Importación de pantallas
import HomeScreen from './Views/Main/HomeScreen';
import AuthScreen from './Views/Auth/AuthScreen';
import MainScreen from './Views/Main/MainScreen';
import CrearFlashcardScreen from './Views/Flashcards/CreateFlashcard';
import CatalogoFlashcardsScreen from './Views/Flashcards/CatalogueFlashcards';
import CatalogoTemario from './Views/Flashcards/CatalogoTemario';
import SettingsScreen from './Views/Main/SettingsScreen';
import ResetPasswordScreen from './Views/Auth/ResetPasswordScreen';
import EventosScreen from './Views/Flashcards/EventosScreen';
import SeleccionarFlashcardsScreen from './Views/Flashcards/SeleccionarFlashcardsScreen';

import { useFonts } from 'expo-font';
import { ActivityIndicator, View } from 'react-native'; 

const firebaseConfig = {
  apiKey: "AIzaSyBzBiX4RqKGo7v4NPbu4dY81jI5uQck-u0",
  authDomain: "elephocus-837d5.firebaseapp.com",
  projectId: "elephocus-837d5",
  storageBucket: "elephocus-837d5.firebasestorage.app",
  messagingSenderId: "170227767316",
  appId: "1:170227767316:android:eb159a85710c5f28e76f01"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log("¡Firebase inicializado correctamente con configuración explícita en App.js!");
} else {
  firebase.app(); 
  console.log("Firebase ya estaba inicializado en App.js.");
}

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    'Oleo Script': require('./assets/fonts/OleoScript-Regular.ttf'),
    'Oleo Script Bold': require('./assets/fonts/OleoScript-Bold.ttf')
  });

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(firebaseUser => {
      console.log('Auth State Changed. User:', firebaseUser ? firebaseUser.uid : null);
      setUser(firebaseUser); 
      if (initializing) {
        setInitializing(false);
      }
    });

    return subscriber; 
  }, []); 

  if (!fontsLoaded || initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#800080" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="CrearFlashcard" component={CrearFlashcardScreen} />
            <Stack.Screen name="CatalogoTemario" component={CatalogoTemario} />
            <Stack.Screen name="CatalogoFlashcards" component={CatalogoFlashcardsScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Eventos" component={EventosScreen} />
            <Stack.Screen name="SeleccionarFlashcards" component={SeleccionarFlashcardsScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;