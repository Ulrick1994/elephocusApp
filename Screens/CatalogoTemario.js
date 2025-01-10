import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomNavBar from "../components/BottomNavBar";

const CatalogoTemario = ({ navigation }) => {
  const [temas, setTemas] = useState([]);

  useEffect(() => {
    const cargarTemas = async () => {
      try {
        const flashcardsGuardadas = await AsyncStorage.getItem("flashcards");
        const flashcards = flashcardsGuardadas
          ? JSON.parse(flashcardsGuardadas)
          : [];

        const temasUnicos = [
          ...new Set(flashcards.map((flashcard) => flashcard.tema)),
        ];
        setTemas(temasUnicos);
      } catch (error) {
        console.error("Error al cargar los temas:", error);
      }
    };

    cargarTemas();
  }, []);

  const handleTemaPress = (tema) => {
    navigation.navigate("CatalogoFlashcards", { temaSeleccionado: tema });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleTemaPress(item)}
    >
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Temarios</Text>
        <FlatList
          data={temas}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item}-${index}`}
        />
      </View>
      <View style={styles.bottomNavBar}>
        <BottomNavBar
          onHomePress={() => navigation.navigate("Main")}
          onBookPress={() => navigation.navigate("CatalogoFlashcards")}
          onAddPress={() => navigation.navigate("CrearFlashcard")}
          onListPress={() => navigation.navigate("CatalogoTemario")}
          onSettingsPress={() => navigation.navigate("Settings")}
          navigation={navigation}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#6a11cb",
    marginBottom: 20,
    textAlign: "center",
  },
  itemContainer: {
    backgroundColor: "#f9f9f9", 
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderRadius: 10,
    width: "80%",
    borderColor: "#6a11cb", 
    borderWidth: 1,
    elevation: 3, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  itemText: {
    fontSize: 18,
    color: "#6a11cb",
    fontWeight: "600",
  },
  bottomNavBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default CatalogoTemario;
