// MainScreen.js

import React from "react";
import { View, FlatList, Text } from "react-native";
import { useFonts } from "expo-font";
import BottomNavBar from "../../components/BottomNavBar";
import Flashcard from "../../components/Flashcard";
import useMainScreenViewModel from "../../viewmodels/MainScreenViewModel";
import styles from "../../styles/MainScreenStyles";
import { LinearGradient } from "expo-linear-gradient";

const MainScreen = ({ navigation }) => {
  const { flashcards } = useMainScreenViewModel();
  const [fontsLoaded] = useFonts({
    "Oleo Script": require("../../assets/fonts/OleoScript-Regular.ttf"),
    "Oleo Script Bold": require("../../assets/fonts/OleoScript-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  const renderFlashcard = ({ item }) => (
    <View style={styles.cardWrapper}>
      <Flashcard pregunta={item.pregunta} respuesta={item.respuesta} />
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#e0c3fc", "#8ec5fc"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <Text style={styles.titulo}>Bienvenido a Elephocus</Text>
      </LinearGradient>

      <View style={styles.cardsContainer}>
        {flashcards.length > 0 ? (
          <FlatList
            data={flashcards}
            renderItem={renderFlashcard}
            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
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

      <BottomNavBar
        onHomePress={() => navigation.navigate("Main")}
        onBookPress={() => navigation.navigate("CatalogoFlashcards")}
        onAddPress={() => navigation.navigate("CrearFlashcard")}
        onListPress={() => navigation.navigate("CatalogoTemario")}
        onSettingsPress={() => navigation.navigate("Settings")}
        navigation={navigation}
      />
    </View>
  );
};

export default MainScreen;
