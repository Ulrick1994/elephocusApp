import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AuthToggle from '../components/AuthToggle';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import { AntDesign } from "@expo/vector-icons";

const AuthScreen = ({navigation}) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = (isLoginForm) => {
    setIsLogin(isLoginForm);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ImageBackground
        source={require('../assets/background.jpeg')}
        style={styles.background}
      >
        <LinearGradient colors={['rgba(0,0,0,0.7)', 'transparent']} style={styles.gradientOverlay}>
          <ScrollView contentContainerStyle={styles.scrollViewContent} bounces={false}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />

            <View style={styles.formContainer}>
              <AuthToggle isLogin={isLogin} onToggle={handleToggle} />
              <View style={styles.formCard}>
                {isLogin ? <LoginForm navigation={navigation}/> : <SignupForm />}
              </View>

              <TouchableOpacity style={styles.forgotPassword}onPress={() => navigation.navigate('ResetPassword')}>
                 
                <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 150,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
    marginTop: 50,
  },
  formContainer: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 5,
  },
  formCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  forgotPassword: {
    marginTop: 15,
  },
  forgotPasswordText: {
    color: '#000000',
    fontSize: 16,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 30,
  },
  socialButton: {
    marginHorizontal: 15,
  },
});

export default AuthScreen;