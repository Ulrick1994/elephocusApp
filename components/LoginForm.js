import React, { useState, useMemo } from "react"; // Importa useMemo
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert, 
} from "react-native";

import LoginScreenViewModel from '../viewmodels/LoginScreenViewModel'; 

const LoginForm = ({ navigation }) => {
  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState("");
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
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLoginAttempt}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
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
  input: {
    height: 45,
    borderColor: '#000000',
    borderWidth: 0,
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
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