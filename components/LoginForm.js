// components/LoginForm.js

import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
// Importamos el componente de iconos
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import LoginScreenViewModel from '../viewmodels/LoginScreenViewModel';

const LoginForm = ({ navigation }) => {
  const [identifier, setIdentifier] = useState(""); // Sigue siendo para el email
  const [password, setPassword] = useState("");

  // Nuevo estado para la visibilidad de la contraseña
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const viewModel = useMemo(() => new LoginScreenViewModel(navigation), [navigation]);

  const handleLoginAttempt = async () => {
    await viewModel.handleLogin(identifier, password); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Elephocus</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail" 
        value={identifier}
        onChangeText={setIdentifier}
        keyboardType="email-address"
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

      <TouchableOpacity style={styles.loginButton} onPress={handleLoginAttempt}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

// Tus estilos existentes, con los añadidos para el contenedor de contraseña
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
  input: { // Estilo para input normal (email)
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
  loginButton: {
    backgroundColor: '#800080',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default LoginForm;