import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import styles from "../../styles/FlashcardsAsociadasTabStyles";

const FlashcardsAsociadasTab = ({ eventoId }) => {
  const [flashcards, setFlashcards] = useState([]);
  const user = firebase.auth().currentUser;
  const db = firebase.firestore();

  useEffect(() => {
    if (!user) return;

    const cargarFlashcardsAsociadas = async () => {
      try {
        const eventoDoc = await db
          .collection("usuarios")
          .doc(user.uid)
          .collection("eventos")
          .doc(eventoId)
          .get();

        if (!eventoDoc.exists) {
          setFlashcards([]);
          return;
        }

        const flashcardsIds = eventoDoc.data().flashcards || [];

        // Obtener detalles de las flashcards asociadas
        const flashcardsData = [];
        for (const fid of flashcardsIds) {
          const fDoc = await db
            .collection("usuarios")
            .doc(user.uid)
            .collection("flashcards")
            .doc(fid)
            .get();

          if (fDoc.exists) {
            flashcardsData.push({ id: fid, ...fDoc.data() });
          }
        }

        setFlashcards(flashcardsData);
      } catch (error) {
        console.error("Error al cargar flashcards asociadas:", error);
      }
    };

    cargarFlashcardsAsociadas();
  }, [eventoId]);

  return (
    <View style={styles.container}>
      {flashcards.length === 0 ? (
        <Text style={styles.noFlashcardsText}>No hay flashcards asociadas.</Text>
      ) : (
        <FlatList
          data={flashcards}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.flashcardItem}>
              <Text style={styles.pregunta}>{item.pregunta}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default FlashcardsAsociadasTab;
