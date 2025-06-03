import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  imagePickerText: {
    color: '#800080',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: { 
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12, 
    paddingLeft: 8,    
    borderRadius: 5,
  },

  passwordContainer: {
    flexDirection: 'row',     
    alignItems: 'center',     
    height: 40,               
    borderColor: 'gray',      
    borderWidth: 1,           
    borderRadius: 5,          
    marginBottom: 12,         
    
  },
  passwordInput: {
    flex: 1,                  
    height: '100%',           
    paddingLeft: 8,           
    paddingRight: 5,          
  },
  eyeIcon: {
    paddingHorizontal: 10,    
    height: '100%',           
    justifyContent: 'center', 
  },

  updateButton: {
    backgroundColor: '#9f8b9f',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 18,
  },
  logoutButton: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
  },
  bottomNavBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default styles;