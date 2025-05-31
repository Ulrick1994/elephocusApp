import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Alert } from 'react-native';
import { getFriendlyFirebaseErrorMessage } from '../utils/firebaseErrorUtils.js'; 
class LoginScreenViewModel {
  constructor(navigation) {
    this.navigation = navigation; 
  }

  async handleLogin(email, password) { 
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, ingresa tu correo y contraseña.');
      return;
    }
    console.log(`[LoginScreenViewModel] >>> Intentando iniciar sesión con Email: ${email}`);

    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log('[LoginScreenViewModel] ✅✅✅ ÉXITO al iniciar sesión. Usuario UID:', user.uid, "Email:", user.email);
      
      Alert.alert('Éxito', `¡Bienvenido de nuevo!`);
    
    } catch (error) {
      console.error('[LoginScreenViewModel] 🛑🛑🛑 ERROR COMPLETO al iniciar sesión:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
      const friendlyErrorMessage = getFriendlyFirebaseErrorMessage(error);
      Alert.alert('Error', friendlyErrorMessage);
    }
  }

  handleCreateAccount() {
    this.navigation.navigate('Auth'); 
  }

  handleForgotPassword() {
    this.navigation.navigate('ResetPassword');
  }
}

export default LoginScreenViewModel;