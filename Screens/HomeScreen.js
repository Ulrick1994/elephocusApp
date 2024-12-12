import React from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 

const HomeScreen = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate('Login'); 
  };

  const handleCreateAccount = () => {
    alert('Redirigiendo a la creación de cuenta...');
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpeg')} 
      style={styles.background}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'transparent']} 
        style={styles.gradient}
      />

      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />
      
      <Text style={styles.appName}>Elephocus</Text>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.startButton} onPress={handleLogin}>
          <Text style={styles.startButtonText}>Iniciar</Text>
        </TouchableOpacity>

        <View style={styles.createAccountContainer}>
          <Text style={styles.noAccountText}>¿No tienes una cuenta? </Text>
          <TouchableOpacity onPress={handleCreateAccount}>
            <Text style={styles.createAccountLink}>Crea una aquí</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%', 
  },
  logo: {
    width: 170,
    height: 220,
    resizeMode: 'contain',
    marginBottom: 20,
    position: 'absolute',
    top: 50,
  },
  appName: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#A5A5A5',
    marginBottom: 50,
    position: 'absolute',
    top: 260, 
    textAlign: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 50,
    width: '80%',
    alignItems: 'center',
    top: 650, 
  },
  startButton: {
    backgroundColor: '#800080', 
    paddingVertical: 15, 
    paddingHorizontal: 40,
    borderRadius: 30, 
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20, 
    width: '100%',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  createAccountContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  noAccountText: {
    color: '#D5D5D5',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createAccountLink: {
    color: '#800080', 
    fontSize: 16,
    textDecorationLine: 'underline', 
  },
});

export default HomeScreen;