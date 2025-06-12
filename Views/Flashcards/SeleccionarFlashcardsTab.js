import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import styles from "../../styles/SeleccionarFlashcardsTabStyles";

const SeleccionarFlashcardsTab = ({ eventoId, onGuardado }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState(new Set());

  const user = firebase.auth().currentUser;
  const db = firebase.firestore();

  useEffect(() => {
    if (!user) return;

    const cargarFlashcards = async () => {
      try {
        // Obtener flashcards asociadas al evento
        const eventoDoc = await db
          .collection("usuarios")
          .doc(user.uid)
          .collection("eventos")
          .doc(eventoId)
          .get();

        const flashcardsAsociadas = eventoDoc.exists
          ? eventoDoc.data().flashcards || []
          : [];

        // Obtener todas las flashcards del usuario
        const snapshot = await db
          .collection("usuarios")
          .doc(user.uid)
          .collection("flashcards")
          .get();

        // Filtrar las flashcards para que solo aparezcan las no asociadas
        const disponibles = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((f) => !flashcardsAsociadas.includes(f.id));

        setFlashcards(disponibles);
        setSeleccionadas(new Set());
      } catch (error) {
        console.error("Error al cargar flashcards:", error);
      }
    };

    cargarFlashcards();
  }, [eventoId]);

  const toggleSeleccion = (id) => {
    const nuevasSeleccionadas = new Set(seleccionadas);
    if (nuevasSeleccionadas.has(id)) {
      nuevasSeleccionadas.delete(id);
    } else {
      nuevasSeleccionadas.add(id);
    }
    setSeleccionadas(nuevasSeleccionadas);
  };

  const agregarFlashcardsEvento = async () => {
    try {
      const eventoRef = db
        .collection("usuarios")
        .doc(user.uid)
        .collection("eventos")
        .doc(eventoId);

      const eventoDoc = await eventoRef.get();
      const flashcardsExistentes = eventoDoc.exists
        ? eventoDoc.data().flashcards || []
        : [];

      const nuevasFlashcards = Array.from(seleccionadas);

      const flashcardsActualizadas = [...flashcardsExistentes, ...nuevasFlashcards];

      await eventoRef.set(
        { flashcards: flashcardsActualizadas },
        { merge: true }
      );

      Alert.alert("Flashcards agregadas", "Se agregaron las flashcards correctamente.");
      setSeleccionadas(new Set());
      // Recargar para reflejar que esas flashcards ya no aparecen
      const snapshot = await db
        .collection("usuarios")
        .doc(user.uid)
        .collection("flashcards")
        .get();
      const disponiblesActualizados = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((f) => !flashcardsActualizadas.includes(f.id));
      setFlashcards(disponiblesActualizados);

      if (onGuardado) onGuardado();
    } catch (error) {
      console.error("Error al agregar flashcards:", error);
      Alert.alert("Error", "No se pudo agregar las flashcards.");
    }
  };

  return (
    <View style={styles.container}>
      {flashcards.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20, fontSize: 16, color: "#555" }}>
          No hay flashcards disponibles para agregar.
        </Text>
      ) : (
        <FlatList
          data={flashcards}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.flashcardItem,
                seleccionadas.has(item.id) && styles.flashcardSeleccionada,
              ]}
              onPress={() => toggleSeleccion(item.id)}
            >
              <Text style={styles.pregunta}>{item.pregunta}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity
        style={[styles.botonAgregar, { marginTop: 10 }]}
        onPress={agregarFlashcardsEvento}
        disabled={seleccionadas.size === 0}
      >
        <Text style={styles.textoBotonAgregar}>Agregar Seleccionadas</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SeleccionarFlashcardsTab;
