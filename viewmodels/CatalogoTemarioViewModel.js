// viewmodels/CatalogoTemarioViewModel.js

import { makeAutoObservable, runInAction } from "mobx";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Alert } from 'react-native';

const GLOBAL_PREDEFINED_THEMES = [
  { id: 'global_math', name: "Matemáticas", isGlobal: true, userId: null },
  { id: 'global_history', name: "Historia", isGlobal: true, userId: null },
  { id: 'global_science', name: "Ciencias", isGlobal: true, userId: null },
  { id: 'global_english', name: "Inglés", isGlobal: true, userId: null },
];

class CatalogoTemarioViewModel {
  temas = [];
  isLoading = true;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  async cargarTemas() {
    const currentUser = firebase.auth().currentUser;
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
      this.temas = [...GLOBAL_PREDEFINED_THEMES];
    });

    if (!currentUser) {
      runInAction(() => {
        this.isLoading = false;
      });
      return;
    }

    try {
      const snapshot = await firebase
        .firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('themes')
        .orderBy('name')
        .get();

      const temasUsuario = [];
      snapshot.forEach(doc => {
        temasUsuario.push({ id: doc.id, ...doc.data(), isGlobal: false, userId: currentUser.uid });
      });

      runInAction(() => {
        const nombresTemasUsuario = new Set(temasUsuario.map(t => t.name.toLowerCase()));
        const temasGlobalesFiltrados = GLOBAL_PREDEFINED_THEMES.filter(
          globalTheme => !nombresTemasUsuario.has(globalTheme.name.toLowerCase())
        );
        this.temas = [...temasGlobalesFiltrados, ...temasUsuario].sort((a, b) => a.name.localeCompare(b.name));
        this.isLoading = false;
      });
    } catch (e) {
      console.error("Error al cargar temas:", e);
      runInAction(() => {
        this.temas = [...GLOBAL_PREDEFINED_THEMES];
        this.error = "No se pudieron cargar tus temas personalizados.";
        this.isLoading = false;
      });
    }
  }

  async agregarTema(nombreTema) {
    const currentUser = firebase.auth().currentUser;
    const trimmed = nombreTema.trim();
    if (!currentUser) return Alert.alert("Error", "Debes iniciar sesión.");
    if (!trimmed) return Alert.alert("Error", "El nombre del tema no puede estar vacío.");

    const exists = this.temas.some(t => t.name.toLowerCase() === trimmed.toLowerCase());
    if (exists) return Alert.alert("Tema existente", "Este tema ya está en la lista.");

    try {
      await firebase
        .firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('themes')
        .add({
          name: trimmed,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      await this.cargarTemas();
    } catch (e) {
      console.error("Error al agregar tema:", e);
      Alert.alert("Error", "No se pudo agregar el tema.");
    }
  }

  async eliminarTema(themeId, userIdDelTema, isGlobalTema) {
    const currentUser = firebase.auth().currentUser;
    if (isGlobalTema) return Alert.alert("Operación no permitida", "No puedes eliminar temas globales.");
    if (!currentUser || currentUser.uid !== userIdDelTema) return Alert.alert("Error", "No puedes eliminar este tema.");
    if (!themeId) return Alert.alert("Error", "ID de tema inválido.");

    try {
      await firebase
        .firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('themes')
        .doc(themeId)
        .delete();

      runInAction(() => {
        this.temas = this.temas.filter(t => t.id !== themeId);
      });
    } catch (e) {
      console.error("Error al eliminar tema:", e);
      Alert.alert("Error", "No se pudo eliminar el tema.");
    }
  }
}

export const catalogoTemarioStore = new CatalogoTemarioViewModel();
