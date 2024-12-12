import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const guardarFlashcard = async (flashcard) => {
  try {
    const flashcardsGuardadas = await AsyncStorage.getItem('flashcards');
    const flashcards = flashcardsGuardadas ? JSON.parse(flashcardsGuardadas) : [];
    flashcards.push(flashcard);
    await AsyncStorage.setItem('flashcards', JSON.stringify(flashcards));
    console.log('Flashcard guardada correctamente');
  } catch (error) {
    console.error('Error al guardar la flashcard:', error);
  }
};

const CrearFlashcardScreen = () => {
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('');

  const handleGuardarFlashcard = async () => {
    const nuevaFlashcard = { pregunta, respuesta };
    await guardarFlashcard(nuevaFlashcard);

    setPregunta('');
    setRespuesta('');
  };

  return (
    <View style={styles.container}>
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
      <Button title="Guardar" onPress={handleGuardarFlashcard} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 15,
  },
});

export default CrearFlashcardScreen;