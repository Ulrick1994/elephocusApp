// viewmodels/CreateFlashcardViewModel.js

import { useState, useEffect } from "react"; // useEffect puede ser útil si la selección inicial del tema depende de temas cargados
import { Alert } from 'react-native';
// Ya no usaremos AsyncStorage para guardar flashcards directamente aquí
// import AsyncStorage from "@react-native-async-storage/async-storage";

// Importaciones de Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Importamos el ViewModel de Temarios para acceder a la lista de temas
import { useCatalogoTemarioViewModel } from "./CatalogoTemarioViewModel"; // Verifica que la ruta sea correcta
import { getFriendlyFirebaseErrorMessage } from '../utils/firebaseErrorUtils.jsx'; // Para manejo de errores

const useCreateFlashcardViewModel = () => {
  const [pregunta, setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState("");
  
  // Usamos el ViewModel de Temarios para obtener la lista de temas disponibles
  const catalogoTemarioViewModel = useCatalogoTemarioViewModel();
  // 'selectedThemeId' almacenará el ID del tema que el usuario elija en el Picker
  const [selectedThemeId, setSelectedThemeId] = useState(""); 

  // Si quieres preseleccionar el primer tema de la lista cuando los temas se cargan:
  // (Esto es opcional y depende de cómo quieras que funcione tu UI)
  useEffect(() => {
    if (!selectedThemeId && catalogoTemarioViewModel.temas && catalogoTemarioViewModel.temas.length > 0) {
      // Comprueba que no sea un tema global si solo quieres preseleccionar personales, o ajusta la lógica
      // Por ahora, simplemente tomamos el primero de la lista combinada si existe.
      // setSelectedThemeId(catalogoTemarioViewModel.temas[0].id); 
      // Es mejor dejar que el usuario elija explícitamente o que la vista maneje la preselección
      // si viene de un contexto específico (ej. "añadir flashcard a ESTE tema").
    }
  }, [catalogoTemarioViewModel.temas, selectedThemeId]);


  const handleGuardarFlashcard = async () => {
    const currentUser = firebase.auth().currentUser;

    if (!currentUser) {
      Alert.alert("Error de Autenticación", "Debes iniciar sesión para poder crear una flashcard.");
      return;
    }

    if (!pregunta.trim() || !respuesta.trim() || !selectedThemeId) {
      Alert.alert("Campos Incompletos", "Por favor, completa la pregunta, la respuesta y selecciona un tema para la flashcard.");
      return;
    }

    console.log(`[CreateFlashcardVM] Guardando flashcard para UID: ${currentUser.uid}, TemaID: ${selectedThemeId}`);
    console.log(`[CreateFlashcardVM] Pregunta: ${pregunta.trim().substring(0,20)}..., Respuesta: ${respuesta.trim().substring(0,20)}...`);

    try {
      const flashcardData = {
        userId: currentUser.uid,        // UID del usuario que crea la flashcard
        themeId: selectedThemeId,       // ID del tema asociado
        pregunta: pregunta.trim(),
        respuesta: respuesta.trim(),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(), // Fecha de creación
        // Podrías añadir otros campos aquí en el futuro:
        // lastReviewedAt: null,
        // easeFactor: 2.5, 
        // interval: 0,
        // etc. para algoritmos de repetición espaciada
      };

      // Añadimos la flashcard a la subcolección 'flashcards' del usuario actual.
      // Usamos .add() para que Firestore genere un ID único para la nueva flashcard.
      const docRef = await firebase.firestore()
        .collection('users')        // Colección de usuarios
        .doc(currentUser.uid)       // Documento del usuario actual
        .collection('flashcards')   // Subcolección de flashcards de este usuario
        .add(flashcardData);        // Añade la nueva flashcard

      console.log("[CreateFlashcardVM] ✅ Flashcard guardada exitosamente en Firestore con ID:", docRef.id);
      Alert.alert("¡Éxito!", "Flashcard guardada correctamente en la nube.");
      
      // Limpiar los campos del formulario después de guardar
      setPregunta("");
      setRespuesta("");
      // setSelectedThemeId(""); // Opcional: resetear el tema o mantener el último seleccionado para facilitar la creación de varias flashcards del mismo tema.
                              // Por ahora, lo comentamos para que el usuario lo vea y decida si quiere cambiarlo.
      
    } catch (error) {
      console.error("[CreateFlashcardVM] 🛑 Error al guardar la flashcard en Firestore:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
      const friendlyErrorMessage = getFriendlyFirebaseErrorMessage(error);
      Alert.alert("Error al Guardar", `No se pudo guardar la flashcard: ${friendlyErrorMessage}`);
    }
  };

  return {
    pregunta,
    respuesta,
    selectedThemeId,                                // El ID del tema seleccionado
    temasDisponibles: catalogoTemarioViewModel.temas, // La lista de objetos tema para el Picker
    isLoadingTemas: catalogoTemarioViewModel.isLoading, // Estado de carga de los temas
    
    setPregunta,
    setRespuesta,
    setSelectedThemeId,                             // Para que la Vista actualice el ID
    
    handleGuardarFlashcard,
    // Exponemos el método para cargar temas del CatalogoTemarioViewModel
    // para que la pantalla CreateFlashcard pueda invocarlo si es necesario (ej. en un useEffect).
    cargarTemasDelCatalogo: catalogoTemarioViewModel.cargarTemas, 
  };
};

export default useCreateFlashcardViewModel;