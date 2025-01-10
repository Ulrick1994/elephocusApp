import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert, ScrollView, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavBar from "../components/BottomNavBar";

const SettingsScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const loadCurrentUserId = async () => {
      const id = await AsyncStorage.getItem('currentUserId');
      setCurrentUserId(id);
    };

    loadCurrentUserId();
  }, []);

  useEffect(() => {
    if (currentUserId) {
      loadUserData(currentUserId);
    }
  }, [currentUserId]);

  const loadUserData = async (userId) => {
    try {
      const storedData = await AsyncStorage.getItem('users');
      const users = storedData ? JSON.parse(storedData) : [];
      const currentUser = users.find(u => u.id === userId);

      if (currentUser) {
        setUsername(currentUser.username);
        setEmail(currentUser.email);
        if (currentUser.profileImage) {
          setProfileImage(currentUser.profileImage);
        }
      }
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error);
      Alert.alert('Error', 'Hubo un problema al cargar los datos del usuario.');
    }
  };

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
    try {
      const storedData = await AsyncStorage.getItem('users');
      const users = storedData ? JSON.parse(storedData) : [];
      const currentUserIndex = users.findIndex(u => u.id === currentUserId);

      if (currentUserIndex !== -1) {
        users[currentUserIndex].username = username;
        users[currentUserIndex].profileImage = profileImage;

        await AsyncStorage.setItem('users', JSON.stringify(users));
        Alert.alert('Éxito', 'Perfil actualizado correctamente.');
      }
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      Alert.alert('Error', 'Hubo un problema al actualizar el perfil.');
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      const storedData = await AsyncStorage.getItem('users');
      const users = storedData ? JSON.parse(storedData) : [];
      const currentUser = users.find(u => u.id === currentUserId);

      if (currentUser && currentUser.password === currentPassword) {
        currentUser.password = newPassword;
        await AsyncStorage.setItem('users', JSON.stringify(users));
        Alert.alert('Éxito', 'Contraseña actualizada correctamente.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        Alert.alert('Error', 'La contraseña actual es incorrecta.');
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      Alert.alert('Error', 'Hubo un problema al cambiar la contraseña.');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('currentUserId'); // Elimina la sesión actual

      
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'Hubo un problema al cerrar sesión.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          <Image
            source={profileImage ? { uri: profileImage } : require('../assets/perfil-default.png')}
            style={styles.profileImage}
          />
          <Text style={styles.imagePickerText}>Cambiar foto de perfil</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Nombre de Usuario:</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Nombre de Usuario"
        />

        <Text style={styles.label}>Correo Electrónico:</Text>
        <TextInput
          style={styles.input}
          value={email}
          keyboardType="email-address"
          editable={false}
          placeholder="Correo Electrónico"
        />

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
          <Text style={styles.updateButtonText}>Actualizar Perfil</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Contraseña Actual:</Text>
        <TextInput
          style={styles.input}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholder="Contraseña Actual"
          secureTextEntry
        />

        <Text style={styles.label}>Nueva Contraseña:</Text>
        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Nueva Contraseña"
          secureTextEntry
        />

        <Text style={styles.label}>Confirmar Nueva Contraseña:</Text>
        <TextInput
          style={styles.input}
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
          placeholder="Confirmar Nueva Contraseña"
          secureTextEntry
        />

        <TouchableOpacity style={styles.updateButton} onPress={handleChangePassword}>
          <Text style={styles.updateButtonText}>Cambiar Contraseña</Text>
        </TouchableOpacity>

        {/* Botón para cerrar sesión */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomNavBar}>
        <BottomNavBar
          onHomePress={() => navigation.navigate("Main")}
          onBookPress={() => navigation.navigate("CatalogoFlashcards")}
          onAddPress={() => navigation.navigate("CrearFlashcard")}
          onListPress={() => navigation.navigate("CatalogoTemario")}
          onSettingsPress={() => navigation.navigate("Settings")}
          navigation={navigation}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 80, 
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  imagePickerText: {
    color: '#800080',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  updateButton: {
    backgroundColor: '#9f8b9f',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 18,
  },
  logoutButton: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
  },
  bottomNavBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default SettingsScreen;
