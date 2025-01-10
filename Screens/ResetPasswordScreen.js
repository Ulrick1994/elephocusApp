import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResetPasswordScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    if (username === '') {
      Alert.alert('Error', 'Por favor ingresa tu nombre de usuario.');
      return;
    }

    try {
      const storedData = await AsyncStorage.getItem('users');
      const users = storedData ? JSON.parse(storedData) : [];
      const currentUser = users.find(u => u.username === username);

      if (!currentUser) {
        Alert.alert('Error', 'Usuario no encontrado.');
        return;
      }

      // Actualiza la contraseña del usuario
      currentUser.password = newPassword;
      const updatedUsers = users.map(u => (u.username === username ? currentUser : u));

      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
      Alert.alert('Éxito', 'Contraseña restablecida correctamente.');
      navigation.navigate('Home'); // Redirigir a la pantalla de inicio

    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      Alert.alert('Error', 'Hubo un problema al restablecer la contraseña.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restablecer Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de Usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Nueva Contraseña"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Nueva Contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Restablecer Contraseña" onPress={handleResetPassword} color="#800080" />
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
});

export default ResetPasswordScreen;
