import { useState, useEffect } from "react";
import { Alert } from "react-native";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { catalogoTemarioStore } from "./CatalogoTemarioViewModel";
import { getFriendlyFirebaseErrorMessage } from "../utils/firebaseErrorUtils.jsx";

const useCreateFlashcardViewModel = () => {
  const [pregunta, setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [selectedThemeId, setSelectedThemeId] = useState("");

  const catalogoTemarioViewModel = catalogoTemarioStore;

  useEffect(() => {
    if (!selectedThemeId && catalogoTemarioViewModel.temas.length > 0) {
      // Puedes preseleccionar el primer tema si deseas
    }
  }, [catalogoTemarioViewModel.temas, selectedThemeId]);

  const handleGuardarFlashcard = async () => {
    const currentUser = firebase.auth().currentUser;

    if (!currentUser) {
      Alert.alert("Error de Autenticación", "Debes iniciar sesión para poder crear una flashcard.");
      return;
    }

    if (!pregunta.trim() || !respuesta.trim() || !selectedThemeId) {
      Alert.alert("Campos Incompletos", "Por favor, completa la pregunta, la respuesta y selecciona un tema.");
      return;
    }

    const temaSeleccionado = catalogoTemarioViewModel.temas.find(t => t.id === selectedThemeId);

    try {
      const flashcardData = {
        userId: currentUser.uid,
        themeId: selectedThemeId,
        tema: temaSeleccionado?.name || "", // 🔥 clave para el filtro
        pregunta: pregunta.trim(),
        respuesta: respuesta.trim(),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      const docRef = await firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid)
        .collection("flashcards")
        .add(flashcardData);

      Alert.alert("¡Éxito!", "Flashcard guardada correctamente en la nube.");

      setPregunta("");
      setRespuesta("");
    } catch (error) {
      console.error("Error al guardar flashcard:", error);
      const friendlyMessage = getFriendlyFirebaseErrorMessage(error);
      Alert.alert("Error al Guardar", `No se pudo guardar la flashcard: ${friendlyMessage}`);
    }
  };

  return {
    pregunta,
    respuesta,
    selectedThemeId,
    temasDisponibles: catalogoTemarioViewModel.temas,
    isLoadingTemas: catalogoTemarioViewModel.isLoading,

    setPregunta,
    setRespuesta,
    setSelectedThemeId,

    handleGuardarFlashcard,
    cargarTemasDelCatalogo: catalogoTemarioViewModel.cargarTemas,
  };
};

export default useCreateFlashcardViewModel;
