import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; 
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

      if (user) { 
        try {
          console.log(`[RegisterViewModel] --- Intentando guardar datos del usuario en Firestore. UID: ${user.uid}, Email: ${user.email}, Username: ${username}`);
          
          await firebase.firestore().collection('users').doc(user.uid).set({
            uid: user.uid,                      
            email: user.email.toLowerCase(),    
            username: username,                 
            createdAt: firebase.firestore.FieldValue.serverTimestamp(), 
          });
          console.log('[RegisterViewModel] ✅✅✅ Datos del usuario guardados exitosamente en Firestore.');

        } catch (firestoreError) {
          console.error('[RegisterViewModel] 🛑🛑🛑 ERROR al guardar datos del usuario en Firestore:', JSON.stringify(firestoreError, Object.getOwnPropertyNames(firestoreError), 2));
        
          if (onError) {
            
            onError("Usuario creado en Auth, pero hubo un problema guardando el perfil en Firestore. Por favor, actualiza tu perfil más tarde.");
          }
        }
      }
      
      if (onSuccess) onSuccess('¡Usuario registrado exitosamente en Firebase!');

    } catch (authError) { 
      console.error('[RegisterViewModel] 🛑🛑🛑 ERROR COMPLETO al crear usuario en Firebase AUTH:', JSON.stringify(authError, Object.getOwnPropertyNames(authError), 2));
      const friendlyErrorMessage = getFriendlyFirebaseErrorMessage(authError); 
      if (onError) onError(friendlyErrorMessage);
    }
  }
}

export default new RegisterViewModel();