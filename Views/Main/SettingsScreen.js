// Views/Main/SettingsScreen.js

import React, { useState } from 'react'; // Asegúrate de importar useState
import {
  View, Text, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView
} from 'react-native';
// Importamos el componente de iconos
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import useSettingsScreenViewModel from '../../viewmodels/SettingsScreenViewModel';
import styles from '../../styles/SettingsScreenStyles.jsx'; // Tus estilos
import BottomNavBar from '../../components/BottomNavBar';

const SettingsScreen = ({ navigation }) => {
  const {
    profileImage,
    username,
    email,
    currentPassword,
    newPassword,
    confirmNewPassword,
    pickImage,
    handleUsernameChange,
    handleCurrentPasswordChange,
    handleNewPasswordChange,
    handleConfirmNewPasswordChange,
    handleUpdateProfile,
    handleChangePassword, // Esta es la función que ahora tiene la lógica segura
    handleLogout
  } = useSettingsScreenViewModel(navigation);

  // Nuevos estados para la visibilidad de las contraseñas
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmNewPasswordVisible, setIsConfirmNewPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          <Image
            source={profileImage ? { uri: profileImage } : require('../../assets/perfil-default.png')}
            style={styles.profileImage}
          />
          <Text style={styles.imagePickerText}>Cambiar foto de perfil</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Nombre de Usuario:</Text>
        <TextInput
          style={styles.input} // Usamos el estilo 'input' normal aquí
          value={username}
          onChangeText={handleUsernameChange}
          placeholder="Nombre de Usuario"
        />

        <Text style={styles.label}>Correo Electrónico:</Text>
        <TextInput
          style={styles.input} // Usamos el estilo 'input' normal aquí
          value={email}
          editable={false}
          placeholder="Correo Electrónico"
        />

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
          <Text style={styles.updateButtonText}>Actualizar Perfil</Text>
        </TouchableOpacity>

        {/* --- Campo Contraseña Actual con visibilidad --- */}
        <Text style={styles.label}>Contraseña Actual:</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={currentPassword}
            onChangeText={handleCurrentPasswordChange}
            placeholder="Contraseña Actual"
            secureTextEntry={!isCurrentPasswordVisible}
          />
          <TouchableOpacity 
            onPress={() => setIsCurrentPasswordVisible(!isCurrentPasswordVisible)}
            style={styles.eyeIcon}
          >
            <MaterialCommunityIcons 
              name={isCurrentPasswordVisible ? "eye-off" : "eye"} 
              size={24} 
              color="grey" 
            />
          </TouchableOpacity>
        </View>

        {/* --- Campo Nueva Contraseña con visibilidad --- */}
        <Text style={styles.label}>Nueva Contraseña:</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={newPassword}
            onChangeText={handleNewPasswordChange}
            placeholder="Nueva Contraseña"
            secureTextEntry={!isNewPasswordVisible}
          />
          <TouchableOpacity 
            onPress={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
            style={styles.eyeIcon}
          >
            <MaterialCommunityIcons 
              name={isNewPasswordVisible ? "eye-off" : "eye"} 
              size={24} 
              color="grey" 
            />
          </TouchableOpacity>
        </View>

        {/* --- Campo Confirmar Nueva Contraseña con visibilidad --- */}
        <Text style={styles.label}>Confirmar Nueva Contraseña:</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={confirmNewPassword}
            onChangeText={handleConfirmNewPasswordChange}
            placeholder="Confirmar Nueva Contraseña"
            secureTextEntry={!isConfirmNewPasswordVisible}
          />
          <TouchableOpacity 
            onPress={() => setIsConfirmNewPasswordVisible(!isConfirmNewPasswordVisible)}
            style={styles.eyeIcon}
          >
            <MaterialCommunityIcons 
              name={isConfirmNewPasswordVisible ? "eye-off" : "eye"} 
              size={24} 
              color="grey" 
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.updateButton} onPress={handleChangePassword}>
          <Text style={styles.updateButtonText}>Cambiar Contraseña</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomNavBar}>
        <BottomNavBar
          onHomePress={() => navigation.navigate('Main')}
          onBookPress={() => navigation.navigate('CatalogoFlashcards')} // Ajusta según tus rutas
          onAddPress={() => navigation.navigate('CrearFlashcard')}
          onListPress={() => navigation.navigate('CatalogoTemario')} // Ajusta según tus rutas
          onSettingsPress={() => navigation.navigate('Settings')}
          navigation={navigation}
        />
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;