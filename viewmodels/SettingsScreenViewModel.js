// viewmodels/SettingsScreenViewModel.js

import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFriendlyFirebaseErrorMessage } from '../utils/firebaseErrorUtils.jsx';

const useSettingsScreenViewModel = (navigation) => {
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  
  const [currentPassword, setCurrentPassword] = useState(''); // Para el cambio de contraseña
  const [newPassword, setNewPassword] = useState('');       // Para el cambio de contraseña
  const [confirmNewPassword, setConfirmNewPassword] = useState(''); // Para el cambio de contraseña

  useEffect(() => {
    const loadUserData = async () => {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        setEmail(currentUser.email || '');
        console.log('[SettingsVM] Email cargado de Firebase Auth:', currentUser.email);
        try {
          const userDocRef = firebase.firestore().collection('users').doc(currentUser.uid);
          const userDoc = await userDocRef.get();
          if (userDoc.exists) {
            const userDataFromFirestore = userDoc.data();
            console.log('[SettingsVM] Perfil de Firestore encontrado:', userDataFromFirestore);
            if (userDataFromFirestore.username) {
              setUsername(userDataFromFirestore.username);
            }
            // Lógica para profileImage (aún pendiente de Firebase Storage)
            const storedUsers = await AsyncStorage.getItem('users'); // Temporalmente
            const users = storedUsers ? JSON.parse(storedUsers) : [];
            const localUser = users.find(u => u.id === currentUser.uid || u.email === currentUser.email);
            if (localUser && localUser.profileImage && !profileImage) { // Solo si no hay imagen de Firestore (que no implementamos aún)
                 setProfileImage(localUser.profileImage);
            }
          } else {
            console.warn('[SettingsVM] No se encontró documento de perfil en Firestore para UID:', currentUser.uid);
          }
        } catch (error) {
          console.error('[SettingsVM] Error al obtener perfil de Firestore:', error);
          Alert.alert('Error', 'No se pudo cargar la información del perfil desde la nube.');
        }
      }
    };
    loadUserData();
  }, []); // Se ejecuta una vez

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleUpdateProfile = async () => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) { Alert.alert('Error', 'Debes estar autenticado.'); return; }
    if (!username.trim()) { Alert.alert('Error', 'El nombre de usuario no puede estar vacío.'); return; }
    console.log(`[SettingsVM] Intentando actualizar perfil en Firestore. UID: ${currentUser.uid}, Nuevo Username: ${username}`);
    try {
      const userDocRef = firebase.firestore().collection('users').doc(currentUser.uid);
      const dataToUpdate = { username: username };
      await userDocRef.update(dataToUpdate);
      // Opcional: Actualizar displayName en Firebase Auth
      // await currentUser.updateProfile({ displayName: username });
      console.log('[SettingsVM] ✅ Perfil actualizado exitosamente en Firestore.');
      Alert.alert('Éxito', 'Tu nombre de usuario ha sido actualizado.');
    } catch (error) {
      console.error('[SettingsVM] 🛑 Error al actualizar perfil en Firestore:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
      const friendlyErrorMessage = getFriendlyFirebaseErrorMessage(error);
      Alert.alert('Error', `No se pudo actualizar el perfil: ${friendlyErrorMessage}`);
    }
  };

  // --- FUNCIÓN handleChangePassword MODIFICADA PARA FIREBASE AUTH CON RE-AUTENTICACIÓN ---
  const handleChangePassword = async () => {
    console.log('[SettingsVM] Iniciando cambio de contraseña...');
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      Alert.alert('Error', 'Por favor, completa todos los campos de contraseña.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Error', 'La nueva contraseña y su confirmación no coinciden.');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Error', 'La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }

    const user = firebase.auth().currentUser;
    if (user && user.email) { // Necesitamos el email para crear la credencial
      console.log(`[SettingsVM] Usuario actual: ${user.email}. Intentando re-autenticar.`);
      // Paso 1: Crear la credencial con la contraseña actual
      const credential = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);

      try {
        // Paso 2: Re-autenticar al usuario
        await user.reauthenticateWithCredential(credential);
        console.log('[SettingsVM] ✅ Usuario re-autenticado exitosamente.');

        // Paso 3: Si la re-autenticación fue exitosa, actualizar la contraseña
        try {
          await user.updatePassword(newPassword);
          console.log('[SettingsVM] ✅ Contraseña actualizada exitosamente en Firebase.');
          Alert.alert('Éxito', '¡Tu contraseña ha sido actualizada exitosamente!');
          // Limpiar campos de contraseña después del éxito
          setCurrentPassword('');
          setNewPassword('');
          setConfirmNewPassword('');
        } catch (updateError) {
          console.error('[SettingsVM] 🛑 Error al ACTUALIZAR la contraseña después de re-autenticar:', JSON.stringify(updateError, Object.getOwnPropertyNames(updateError), 2));
          const friendlyErrorMessage = getFriendlyFirebaseErrorMessage(updateError);
          Alert.alert('Error al Actualizar', `No se pudo actualizar la contraseña: ${friendlyErrorMessage}`);
        }
      } catch (reauthError) {
        console.error('[SettingsVM] 🛑 Error de RE-AUTENTICACIÓN:', JSON.stringify(reauthError, Object.getOwnPropertyNames(reauthError), 2));
        let friendlyErrorMessage = getFriendlyFirebaseErrorMessage(reauthError);
        // Firebase a veces devuelve 'auth/wrong-password' o 'auth/invalid-credential' en re-autenticación
        if (reauthError.code === 'auth/wrong-password' || reauthError.code === 'auth/invalid-credential') {
          friendlyErrorMessage = 'La contraseña actual que ingresaste es incorrecta.';
        }
        Alert.alert('Error de Autenticación', friendlyErrorMessage);
      }
    } else {
      Alert.alert('Error', 'No se pudo obtener la información del usuario actual para el cambio de contraseña.');
      console.error('[SettingsVM] No hay usuario actual o email de usuario para cambiar contraseña.');
    }
  };
  // --- FIN DE handleChangePassword MODIFICADA ---

  const handleLogout = () => {
    Alert.alert("Confirmar Cierre de Sesión", "¿Estás seguro de que quieres cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sí, cerrar sesión", onPress: async () => {
            try {
              await firebase.auth().signOut();
            } catch (error) {
              const friendlyErrorMessage = getFriendlyFirebaseErrorMessage(error);
              Alert.alert('Error', friendlyErrorMessage);
            }
          }, style: "destructive"
        }
      ]
    );
  };

  return {
    profileImage, username, email, currentPassword, newPassword, confirmNewPassword,
    pickImage,
    handleUsernameChange: setUsername,
    handleCurrentPasswordChange: setCurrentPassword,
    handleNewPasswordChange: setNewPassword,
    handleConfirmNewPasswordChange: setConfirmNewPassword,
    handleUpdateProfile,
    handleChangePassword, // ¡Ahora con lógica segura de Firebase!
    handleLogout          
  };
};

export default useSettingsScreenViewModel;