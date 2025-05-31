import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFriendlyFirebaseErrorMessage } from '../utils/firebaseErrorUtils.jsx'; 

class RegisterViewModel {
  async handleRegister(email, username, password, confirmPassword, onSuccess, onError) {
    console.log("[RegisterViewModel] >>> Iniciando handleRegister con:", { email, username: username.substring(0,3) + '...' });

    if (!email || !username || !password || !confirmPassword) {
      if (onError) onError('Por favor completa todos los campos.');
      return;
    }
    if (password !== confirmPassword) {
      if (onError) onError('Las contraseñas no coinciden.');
      return;
    }

    try {
      console.log("[RegisterViewModel] --- Intentando firebase.auth().createUserWithEmailAndPassword...");
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log('[RegisterViewModel] ✅✅✅ ÉXITO al crear usuario en Firebase Auth. UID:', user.uid);
      
      if (onSuccess) onSuccess('¡Usuario registrado exitosamente en Firebase!');
    } catch (error) {
      console.error('[RegisterViewModel] 🛑🛑🛑 ERROR COMPLETO al crear usuario en Firebase:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
      const friendlyErrorMessage = getFriendlyFirebaseErrorMessage(error); 
      if (onError) onError(friendlyErrorMessage);
    }
  }
}

export default new RegisterViewModel();