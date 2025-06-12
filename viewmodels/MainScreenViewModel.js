// viewmodels/MainScreenViewModel.js

import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const useMainScreenViewModel = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarFlashcards = async () => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      setFlashcards([]);
      setIsLoading(false);
      return;
    }

    try {
      const snapshot = await firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid)
        .collection("flashcards")
        .orderBy("createdAt", "desc")
        .get();

      const nuevasFlashcards = [];
      snapshot.forEach((doc) => {
        nuevasFlashcards.push({ id: doc.id, ...doc.data() });
      });

      setFlashcards(nuevasFlashcards);
    } catch (e) {
      console.error("Error al cargar las flashcards:", e);
      setError("No se pudieron cargar las flashcards.");
      setFlashcards([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    cargarFlashcards();
  }, []);

  return {
    flashcards,
    isLoading,
    error,
    cargarFlashcards, // opcional, si usas useFocusEffect
  };
};

export default useMainScreenViewModel;
