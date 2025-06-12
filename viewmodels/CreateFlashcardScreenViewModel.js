// viewmodels/CreateFlashcardViewModel.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { Alert } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

const CreateFlashcardViewModel = {
  guardarNuevaFlashcard: async (titulo, descripcion, tema, callback) => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      Alert.alert("Error", "Debes iniciar sesión.");
      return;
    }

    if (!titulo || !descripcion || !tema) {
      Alert.alert("Campos incompletos", "Completa todos los campos.");
      return;
    }

    try {
      await firebase.firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('flashcards')
        .add({
          id: uuidv4(),
          titulo,
          descripcion,
          tema,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

      Alert.alert("Éxito", "Flashcard guardada correctamente.");
      if (callback) callback(); // Resetear formulario, navegar, etc.
    } catch (error) {
      console.error("Error al guardar nueva flashcard:", error);
      Alert.alert("Error", "No se pudo guardar la flashcard.");
    }
  }
};

export default CreateFlashcardViewModel;
