import React from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../../styles/SettingsScreenStyles';
import useSettingsScreenViewModel from '../../viewmodels/SettingsScreenViewModel';
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
    handleChangePassword,
    handleLogout
  } = useSettingsScreenViewModel(navigation);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            <Image
              source={profileImage ? { uri: profileImage } : require('../../assets/perfil-default.png')}
              style={styles.profileImage}
            />
            <Text style={styles.imagePickerText}>Cambiar foto de perfil</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Nombre de Usuario</Text>
          <LinearGradient colors={['#e0c3fc', '#8ec5fc']} style={styles.gradientInput}>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={handleUsernameChange}
              placeholder="Nombre de Usuario"
              placeholderTextColor="#444"
            />
          </LinearGradient>

          <Text style={styles.label}>Correo Electrónico</Text>
          <LinearGradient colors={['#f0f0f0', '#d9d9d9']} style={styles.gradientInput}>
            <TextInput
              style={styles.input}
              value={email}
              editable={false}
              placeholder="Correo Electrónico"
              placeholderTextColor="#444"
            />
          </LinearGradient>

          <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
            <Text style={styles.updateButtonText}>Actualizar Perfil</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Contraseña Actual</Text>
          <LinearGradient colors={['#e0c3fc', '#8ec5fc']} style={styles.gradientInput}>
            <TextInput
              style={styles.input}
              value={currentPassword}
              onChangeText={handleCurrentPasswordChange}
              placeholder="Contraseña Actual"
              placeholderTextColor="#444"
              secureTextEntry
            />
          </LinearGradient>

          <Text style={styles.label}>Nueva Contraseña</Text>
          <LinearGradient colors={['#e0c3fc', '#8ec5fc']} style={styles.gradientInput}>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={handleNewPasswordChange}
              placeholder="Nueva Contraseña"
              placeholderTextColor="#444"
              secureTextEntry
            />
          </LinearGradient>

          <Text style={styles.label}>Confirmar Nueva Contraseña</Text>
          <LinearGradient colors={['#e0c3fc', '#8ec5fc']} style={styles.gradientInput}>
            <TextInput
              style={styles.input}
              value={confirmNewPassword}
              onChangeText={handleConfirmNewPasswordChange}
              placeholder="Confirmar Nueva Contraseña"
              placeholderTextColor="#444"
              secureTextEntry
            />
          </LinearGradient>

          <TouchableOpacity style={styles.updateButton} onPress={handleChangePassword}>
            <Text style={styles.updateButtonText}>Cambiar Contraseña</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomNavBar}>
        <BottomNavBar
          onHomePress={() => navigation.navigate('Main')}
          onBookPress={() => navigation.navigate('CatalogoFlashcards')}
          onAddPress={() => navigation.navigate('CrearFlashcard')}
          onListPress={() => navigation.navigate('Eventos')}
          onSettingsPress={() => navigation.navigate('Settings')}
          navigation={navigation}
        />
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
