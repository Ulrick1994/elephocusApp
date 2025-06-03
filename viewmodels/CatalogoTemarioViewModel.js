// viewmodels/CatalogoTemarioViewModel.js

import React, { useState } from 'react'; // <--- ¡IMPORTACIÓN AÑADIDA/CORREGIDA!
import { makeAutoObservable, runInAction } from "mobx";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Alert } from 'react-native';

// Lista de temas globales predefinidos
const GLOBAL_PREDEFINED_THEMES = [
  { id: 'global_math', name: "Matemáticas", isGlobal: true, userId: null }, // Añadimos userId: null para consistencia de objeto
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
    
    console.log("[CatalogoTemarioVM] Cargando temas...");
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
      // Inicializa con una copia de los temas globales para que MobX los detecte como un nuevo array
      this.temas = [...GLOBAL_PREDEFINED_THEMES]; 
    });

    if (!currentUser) {
      console.warn("[CatalogoTemarioVM] No hay usuario logueado. Mostrando solo temas globales.");
      runInAction(() => {
        this.isLoading = false;
      });
      return;
    }

    try {
      console.log(`[CatalogoTemarioVM] Cargando temas personalizados para UID: ${currentUser.uid}`);
      const snapshot = await firebase.firestore()
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
        console.log("[CatalogoTemarioVM] Temas combinados cargados:", this.temas.length);
      });

    } catch (e) {
      console.error("[CatalogoTemarioVM] Error al cargar temas personalizados:", JSON.stringify(e, Object.getOwnPropertyNames(e), 2));
      runInAction(() => {
        this.temas = [...GLOBAL_PREDEFINED_THEMES]; 
        this.error = "No se pudieron cargar tus temas personalizados.";
        this.isLoading = false;
      });
    }
  }

  async agregarTema(nombreTema) {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      Alert.alert("Error", "Debes iniciar sesión para agregar un tema personalizado.");
      return;
    }
    const trimmedNombreTema = nombreTema.trim();
    if (!trimmedNombreTema) {
      Alert.alert("Error", "El nombre del tema no puede estar vacío.");
      return;
    }

    const nombreTemaLowerCase = trimmedNombreTema.toLowerCase();
    if (this.temas.some(tema => tema.name.toLowerCase() === nombreTemaLowerCase)) {
        Alert.alert("Tema Existente", "Este tema ya existe en la lista (global o personal).");
        return;
    }

    console.log(`[CatalogoTemarioVM] Agregando tema personalizado: ${trimmedNombreTema} para UID: ${currentUser.uid}`);
    // Podrías añadir un estado 'isAdding' o similar si la UI necesita reaccionar
    
    try {
      await firebase.firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('themes')
        .add({
          name: trimmedNombreTema,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
          // No es necesario 'isGlobal: false' aquí, ya que solo los temas de usuario se guardan así
        });
      console.log("[CatalogoTemarioVM] Tema personalizado agregado.");
      await this.cargarTemas(); 
    } catch (e) {
      console.error("[CatalogoTemarioVM] Error al agregar tema personalizado:", JSON.stringify(e, Object.getOwnPropertyNames(e), 2));
      Alert.alert("Error", "No se pudo agregar el tema personalizado.");
      // Aquí podrías usar getFriendlyFirebaseErrorMessage(e) si 'e' es un error de Firebase.
    }
  }

  async eliminarTema(themeId, userIdDelTema, isGlobalTema) {
    if (isGlobalTema) {
      Alert.alert("Operación no permitida", "Los temas globales no se pueden eliminar desde la aplicación.");
      return;
    }

    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      Alert.alert("Error", "Debes iniciar sesión.");
      return;
    }
    if (currentUser.uid !== userIdDelTema) {
      Alert.alert("Error", "No puedes eliminar un tema que no te pertenece.");
      return;
    }
    if (!themeId) {
      Alert.alert("Error", "ID de tema no proporcionado.");
      return;
    }

    console.log(`[CatalogoTemarioVM] Eliminando tema ID: ${themeId} de Firestore para UID: ${currentUser.uid}`);
    try {
      await firebase.firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('themes')
        .doc(themeId)
        .delete();

      console.log("[CatalogoTemarioVM] Tema personalizado eliminado exitosamente.");
      runInAction(() => {
        this.temas = this.temas.filter((t) => t.id !== themeId);
      });
    } catch (e) {
      console.error("[CatalogoTemarioVM] Error al eliminar tema personalizado:", JSON.stringify(e, Object.getOwnPropertyNames(e), 2));
      Alert.alert("Error", "No se pudo eliminar el tema personalizado.");
    }
  }
}

export const useCatalogoTemarioViewModel = () => {
  // Esta línea crea una nueva instancia del ViewModel cada vez que se llama al hook.
  // Para que el estado (como la lista de temas cargados) persista mientras el componente que usa el hook
  // está montado, useState es una buena aproximación aquí.
  const [store] = useState(() => new CatalogoTemarioViewModel());
  return store;
};