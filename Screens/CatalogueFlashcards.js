import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const obtenerFlashcards = async () => {
  try {
    const flashcardsGuardadas = await AsyncStorage.getItem('flashcards');
    return flashcardsGuardadas ? JSON.parse(flashcardsGuardadas) : [];
  } catch (error) {
    console.error('Error al obtener las flashcards:', error);
    return [];
  }
};

const CatalogoFlashcardsScreen = () => {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    const cargarFlashcards = async () => {
      const flashcardsGuardadas = await obtenerFlashcards();
      setFlashcards(flashcardsGuardadas);
    };
    cargarFlashcards();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.flashcardItem}>
      <Text style={styles.pregunta}>{item.pregunta}</Text>
      <Text style={styles.respuesta}>{item.respuesta}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Catálogo de Flashcards</Text>
      <FlatList
        data={flashcards}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
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
  flashcardItem: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  pregunta: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  respuesta: {
    fontSize: 16,
  },
});

export default CatalogoFlashcardsScreen;