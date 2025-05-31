import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFriendlyFirebaseErrorMessage } from '../utils/firebaseErrorUtils.jsx'; 

const useSettingsScreenViewModel = (navigation) => {
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      setEmail(currentUser.email);
      const loadUsernameAndImageFromAsyncStorage = async (uid) => {
        try {
          const storedData = await AsyncStorage.getItem('users');
          const users = storedData ? JSON.parse(storedData) : [];
          const appUser = users.find(u => u.id === uid || u.email === currentUser.email); 
          if (appUser) {
            if (appUser.username) setUsername(appUser.username);
            if (appUser.profileImage) setProfileImage(appUser.profileImage);
          }
        } catch (e) { console.error("Error cargando datos de perfil de AsyncStorage", e); }
      };
      if (currentUser.uid) {
          loadUsernameAndImageFromAsyncStorage(currentUser.uid);
      }
    }
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleUpdateProfile = async () => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) { Alert.alert('Error', 'No hay usuario activo.'); return; }
    try {
      const storedData = await AsyncStorage.getItem('users');
      let users = storedData ? JSON.parse(storedData) : [];
      const index = users.findIndex(u => u.id === currentUser.uid || u.email === currentUser.email);
      if (index !== -1) {
        users[index].username = username;
        users[index].profileImage = profileImage;
        await AsyncStorage.setItem('users', JSON.stringify(users));
        Alert.alert('Éxito', 'Perfil (local) actualizado.');
      } else { Alert.alert('Error', 'Usuario local no encontrado.'); }
    } catch (e) { console.error('Error actualizando perfil local:', e); Alert.alert('Error', 'Problema al actualizar perfil local.');}
  };

  const handleChangePassword = async () => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) { Alert.alert('Error', 'No hay usuario activo.'); return; }
    if (newPassword !== confirmNewPassword) { Alert.alert('Error', 'Nuevas contraseñas no coinciden.'); return; }
    if (!currentPassword || !newPassword) { Alert.alert('Error', 'Completa campos de contraseña.'); return; }
    try {
      const storedData = await AsyncStorage.getItem('users');
      let users = storedData ? JSON.parse(storedData) : [];
      const userIndex = users.findIndex(u => u.id === currentUser.uid || u.email === currentUser.email);
      if (userIndex !== -1 && users[userIndex].password === currentPassword) {
        users[userIndex].password = newPassword;
        await AsyncStorage.setItem('users', JSON.stringify(users));
        Alert.alert('Éxito', 'Contraseña (local) actualizada. Para Firebase, se requiere otro flujo.');
        setCurrentPassword(''); setNewPassword(''); setConfirmNewPassword('');
      } else { Alert.alert('Error', 'Contraseña actual (local) incorrecta.'); }
    } catch (e) { console.error('Error cambiando contraseña local:', e); Alert.alert('Error', 'Problema al cambiar contraseña local.');}
  };

  const handleLogout = () => {
    console.log("[SettingsScreenViewModel] Solicitud de cierre de sesión recibida.");
    Alert.alert(
      "Confirmar Cierre de Sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("[SettingsScreenViewModel] Cierre de sesión cancelado."),
          style: "cancel"
        },
        {
          text: "Sí, cerrar sesión",
          onPress: async () => {
            console.log("[SettingsScreenViewModel] Usuario confirmó. Procediendo con Firebase signOut...");
            try {
              await firebase.auth().signOut();
              console.log("[SettingsScreenViewModel] Sesión cerrada exitosamente en Firebase.");
            } catch (error) {
              console.error('[SettingsScreenViewModel] Error al cerrar sesión en Firebase:', error);
              const friendlyErrorMessage = getFriendlyFirebaseErrorMessage(error);
              Alert.alert('Error', friendlyErrorMessage);
            }
          },
          style: "destructive"
        }
      ],
      { cancelable: true }
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
    handleChangePassword,
    handleLogout
  };
};

export default useSettingsScreenViewModel;