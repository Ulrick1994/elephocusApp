export const getFriendlyFirebaseErrorMessage = (error) => {
  let friendlyMessage = 'Ocurrió un error inesperado. Por favor, intenta de nuevo más tarde.';

  if (error && error.code) { 
    switch (error.code) {

      case 'auth/email-already-in-use':
        friendlyMessage = 'El correo electrónico que ingresaste ya está en uso por otra cuenta.';
        break;
      case 'auth/invalid-email':
        friendlyMessage = 'El formato del correo electrónico no es válido. Por favor, revísalo.';
        break;
      case 'auth/operation-not-allowed':
        friendlyMessage = 'La operación no está permitida. Contacta al administrador.'; 
        break;
      case 'auth/weak-password':
        friendlyMessage = 'La contraseña es demasiado débil. Debe tener al menos 6 caracteres.';
        break;
      case 'auth/user-disabled':
        friendlyMessage = 'Esta cuenta de usuario ha sido deshabilitada por un administrador.';
        break;
      case 'auth/user-not-found':
        friendlyMessage = 'No se encontró ningún usuario con estas credenciales.';
        break;
      case 'auth/wrong-password':
        friendlyMessage = 'La contraseña es incorrecta. Por favor, inténtalo de nuevo.';
        break;
      case 'auth/invalid-credential': 
        friendlyMessage = 'Credenciales incorrectas. Por favor, verifica tu correo y contraseña.';
        break;
      case 'auth/too-many-requests':
        friendlyMessage = 'Hemos bloqueado todas las solicitudes de este dispositivo debido a actividad inusual. Inténtalo más tarde.';
        break;
      
      case 'auth/network-request-failed':
        friendlyMessage = 'Error de red. Por favor, verifica tu conexión a internet e intenta de nuevo.';
        break;

      default:
        console.warn("Código de error de Firebase no mapeado:", error.code, error.message);
        friendlyMessage = `Ocurrió un error (${error.code}). Intenta de nuevo.`;
        break;
    }
  } else if (error && error.message) {
    friendlyMessage = error.message;
    console.error("Error no-Firebase con mensaje:", error.message);
  } else {
    console.error("Error desconocido o malformado:", error);
  }
  
  return friendlyMessage;
};
