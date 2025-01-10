import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (username === '' || password === '') {
      Alert.alert('Error', 'Por favor ingresa todos los campos.');
      return;
    }

    try {
      // Obtiene usuario de AsyncStorage
      const userString = await AsyncStorage.getItem(username);
      if (userString === null) {
        Alert.alert('Error', 'Usuario no encontrado.');
        return;
      }

      const user = JSON.parse(userString);

      // Verifica contraseña
      if (user.password === password) {
        Alert.alert('Éxito', `Bienvenido ${username}`);
        navigation.navigate('Main');
      } else {
        Alert.alert('Error', 'Contraseña incorrecta.');
      }

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al iniciar sesión.');
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate('Register'); // Navegar a la pantalla de registro
  };

  const handleForgotPassword = () => {
        Alert.alert('Redirigiendo a recuperación de contraseña...');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} color="#800080" />

      <Text style={styles.linkText}>
        ¿No tienes una cuenta?{' '}
        <TouchableOpacity onPress={handleCreateAccount}>
          <Text style={styles.link}>Crea una aquí</Text>
        </TouchableOpacity>
      </Text>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  linkText: {
    textAlign: 'center',
    marginTop: 10,
  },
  link: {
    color: '#800080',
    textDecorationLine: 'underline',
    textAlign: 'center'
  },
});

export default LoginScreen;