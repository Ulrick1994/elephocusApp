import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const users = [
    { username: 'Juzzo', password: '123' },
    { username: 'Ricardo', password: '456' },
  ];

  const handleLogin = () => {
    if (username === '' || password === '') {
      Alert.alert('Por favor ingresa todos los campos');
      return;
    }

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      Alert.alert(`Bienvenido ${username}`);
      navigation.navigate('Main'); 
    } else {
      Alert.alert('Credenciales incorrectas');
    }
  };

  const handleCreateAccount = () => {
    Alert.alert('Redirigiendo a la creación de cuenta...');
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
      <TouchableOpacity onPress={() => Alert.alert('Redirigiendo a recuperación de contraseña...')}>
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