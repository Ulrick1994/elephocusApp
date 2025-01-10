import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import BottomNavBar from "../components/BottomNavBar";

const guardarFlashcard = async (flashcard) => {
  try {
    const flashcardsGuardadas = await AsyncStorage.getItem("flashcards");
    const flashcards = flashcardsGuardadas ? JSON.parse(flashcardsGuardadas) : [];
    flashcards.push(flashcard);
    await AsyncStorage.setItem("flashcards", JSON.stringify(flashcards));
    console.log("Flashcard guardada correctamente");
  } catch (error) {
    console.error("Error al guardar la flashcard:", error);
  }
};

const CrearFlashcardScreen = ({ navigation }) => {
  const [pregunta, setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [tema, setTema] = useState("Matemáticas");

  const handleGuardarFlashcard = async () => {
    const nuevaFlashcard = { pregunta, respuesta, tema };
    await guardarFlashcard(nuevaFlashcard);

    setPregunta("");
    setRespuesta("");
    setTema("Matemáticas");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titulo}>Crear Flashcard</Text>
        <TextInput
          style={styles.input}
          placeholder="Pregunta"
          value={pregunta}
          onChangeText={setPregunta}
        />
        <TextInput
          style={styles.input}
          placeholder="Respuesta"
          value={respuesta}
          onChangeText={setRespuesta}
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={tema}
            onValueChange={(itemValue) => setTema(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Matemáticas" value="Matemáticas" />
            <Picker.Item label="Ciencias Naturales" value="Ciencias Naturales" />
            <Picker.Item label="Historia" value="Historia" />
            <Picker.Item label="Geografía" value="Geografía" />
            <Picker.Item label="Otro" value="Otro" />
          </Picker>
        </View>
        <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardarFlashcard}>
          <Text style={styles.botonGuardarTexto}>Guardar</Text>
        </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#AAA",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#FFF",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#AAA",
    borderRadius: 8,
    marginBottom: 20,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  botonGuardar: {
    backgroundColor: "#D4B2DA",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  botonGuardarTexto: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CrearFlashcardScreen;
