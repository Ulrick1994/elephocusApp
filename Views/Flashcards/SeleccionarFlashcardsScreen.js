import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles/SeleccionarFlashcardsStyles";
import { SafeAreaView } from 'react-native-safe-area-context';


const SeleccionarFlashcardsScreen = ({ route, navigation }) => {
  const { eventoId } = route.params;
  const [flashcards, setFlashcards] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      const todas = JSON.parse(await AsyncStorage.getItem("flashcards")) || [];
      const eventosRaw = await AsyncStorage.getItem("eventos");
      const eventos = eventosRaw ? JSON.parse(eventosRaw) : [];
      const evento = eventos.find((e) => e.id === eventoId);
      const yaAsignadas = evento?.flashcards || [];

      // Excluir flashcards ya asignadas
      const disponibles = todas.filter(f => !yaAsignadas.includes(f.id));

      setFlashcards(disponibles);
      setSeleccionadas([]); // Siempre desde cero al abrir
    };

    cargar();
  }, [eventoId]);

  const toggleSeleccion = (id) => {
    setSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const guardarAsociacion = async () => {
    const eventosRaw = await AsyncStorage.getItem("eventos");
    const eventos = eventosRaw ? JSON.parse(eventosRaw) : [];
    const eventoIndex = eventos.findIndex((e) => e.id === eventoId);

    if (eventoIndex !== -1) {
      const evento = eventos[eventoIndex];
      const existentes = evento.flashcards || [];
      const nuevas = [...new Set([...existentes, ...seleccionadas])];
      eventos[eventoIndex].flashcards = nuevas;

      await AsyncStorage.setItem("eventos", JSON.stringify(eventos));
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingTop: 20}}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Selecciona Flashcards</Text>
        <FlatList
          data={flashcards}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.flashcardItem,
                seleccionadas.includes(item.id) && styles.flashcardSeleccionada,
              ]}
              onPress={() => toggleSeleccion(item.id)}
            >
              <Text style={styles.pregunta}>{item.pregunta}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity style={styles.botonGuardar} onPress={guardarAsociacion}>
          <Text style={styles.botonGuardarTexto}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SeleccionarFlashcardsScreen;
