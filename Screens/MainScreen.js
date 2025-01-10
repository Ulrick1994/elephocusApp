import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { useFonts } from "expo-font";
import BottomNavBar from "../components/BottomNavBar";
import Flashcard from "../components/Flashcard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RoundedImage from '../components/RoundedImage';

// Función para obtener flashcards desde AsyncStorage
const obtenerFlashcards = async () => {
  try {
    const flashcardsGuardadas = await AsyncStorage.getItem("flashcards");
    return flashcardsGuardadas ? JSON.parse(flashcardsGuardadas) : [];
  } catch (error) {
    console.error("Error al obtener las flashcards:", error);
    return [];
  }
};

const MainScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "Oleo Script": require("../assets/fonts/OleoScript-Regular.ttf"),
    "Oleo Script Bold": require("../assets/fonts/OleoScript-Bold.ttf"),
  });

  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    const cargarFlashcards = async () => {
      const flashcardsGuardadas = await obtenerFlashcards();
      setFlashcards(flashcardsGuardadas);
    };
    cargarFlashcards();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const renderFlashcard = ({ item }) => (
    <View style={styles.cardWrapper}>
      <Flashcard pregunta={item.pregunta} respuesta={item.respuesta} />
    </View>
  );

  return (
    <View style={styles.container}>

      
      <RoundedImage source={require('../assets/library.jpeg')} style={styles.topImage} />

     
      <View style={styles.cardsContainer}>
        {flashcards.length > 0 ? (
          <FlatList
            data={flashcards}
            renderItem={renderFlashcard}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Flashcard
              pregunta="No hay flashcards disponibles"
              respuesta="Crea nuevas flashcards para comenzar"
            />
          </View>
        )}
      </View>

      {/* Barra de navegación inferior */}
      <BottomNavBar
        onHomePress={() => console.log("Home")}
        onBookPress={() => navigation.navigate("CatalogoFlashcards")} 
        onAddPress={() => navigation.navigate("CrearFlashcard")}
        onListPress={() => navigation.navigate("CatalogoTemario")}
        onSettingsPress={() => navigation.navigate("Settings")}
        navigation={navigation} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  topImage: {
    width: '100%',
    height: 200,
    marginBottom: 10, 
  },
  cardsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10, 
  },
  flatListContent: {
    alignItems: "center",
  },
  cardWrapper: {
    width: Dimensions.get("window").width * 1.0, 
    justifyContent: "center",
    alignItems: "center",

    padding: 20,
    borderRadius: 20, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },

  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height * 0.4,
  },
});

export default MainScreen;
