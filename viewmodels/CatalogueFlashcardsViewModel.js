// viewmodels/CatalogueFlashcardsViewModel.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { Alert } from 'react-native';

const CatalogueFlashcardsViewModel = {
  cargarFlashcards: async (temaSeleccionado, setFlashcards) => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      Alert.alert("Error", "Debes iniciar sesión para ver tus flashcards.");
      return;
    }

    try {
      let query = firebase.firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('flashcards');

      if (temaSeleccionado) {
        query = query.where('tema', '==', temaSeleccionado);
      }

      const snapshot = await query.orderBy('createdAt', 'desc').get();
      const flashcards = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setFlashcards(flashcards);
    } catch (error) {
      console.error("Error al cargar las flashcards:", error);
    }
  },

  eliminarFlashcard: async (id, flashcards, setFlashcards) => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      Alert.alert("Error", "Debes iniciar sesión.");
      return;
    }

    try {
      await firebase.firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('flashcards')
        .doc(id)
        .delete();

      const nuevasFlashcards = flashcards.filter(f => f.id !== id);
      setFlashcards(nuevasFlashcards);
    } catch (error) {
      console.error("Error al eliminar la flashcard:", error);
      Alert.alert("Error", "No se pudo eliminar la flashcard.");
    }
  },

  guardarFlashcardEditada: async (flashcardEdit, flashcards, setFlashcards) => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      Alert.alert("Error", "Debes iniciar sesión.");
      return;
    }

    try {
      await firebase.firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('flashcards')
        .doc(flashcardEdit.id)
        .update({
          ...flashcardEdit,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

      const actualizadas = flashcards.map(f =>
        f.id === flashcardEdit.id ? flashcardEdit : f
      );
      setFlashcards(actualizadas);
    } catch (error) {
      console.error("Error al guardar flashcard editada:", error);
      Alert.alert("Error", "No se pudo guardar la flashcard editada.");
    }
  }
};

export default CatalogueFlashcardsViewModel;
