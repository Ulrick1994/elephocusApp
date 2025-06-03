// components/SignupForm.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// Importamos el componente de iconos
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import RegisterViewModel from '../viewmodels/RegisterViewModel';

const SignupForm = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Nuevos estados para la visibilidad de las contraseñas
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const handleSignup = async () => {
    if (!email || !username || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }
    RegisterViewModel.handleRegister(
      email,
      username,
      password,
      confirmPassword,
      (successMessage) => {
        Alert.alert('Éxito', successMessage);
        setEmail('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
      },
      (errorMessage) => {
        Alert.alert('Error', errorMessage);
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Elephocus</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      
      {/* Campo de Contraseña con icono para ver/ocultar */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible} // Visibilidad controlada por el estado
        />
        <TouchableOpacity 
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          style={styles.eyeIcon}
        >
          <MaterialCommunityIcons 
            name={isPasswordVisible ? "eye-off" : "eye"} 
            size={24} 
            color="grey" 
          />
        </TouchableOpacity>
      </View>

      {/* Campo de Confirmar Contraseña con icono para ver/ocultar */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!isConfirmPasswordVisible} // Visibilidad controlada por el estado
        />
        <TouchableOpacity 
          onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
          style={styles.eyeIcon}
        >
          <MaterialCommunityIcons 
            name={isConfirmPasswordVisible ? "eye-off" : "eye"} 
            size={24} 
            color="grey" 
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: { // Estilo para inputs normales (email, username)
    height: 45,
    borderColor: '#000000',
    borderWidth: 0,
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  passwordContainer: { // Contenedor para el input de contraseña y el icono
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#000000',
    marginBottom: 15,
  },
  passwordInput: { // Estilo para el TextInput de contraseña
    flex: 1,
    height: 45,
    paddingHorizontal: 10,
  },
  eyeIcon: { // Estilo para el icono del ojo
    padding: 10,
  },
  signupButton: {
    backgroundColor: '#800080',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  signupButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default SignupForm;