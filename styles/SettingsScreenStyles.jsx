import { StyleSheet } from 'react-native';

const SettingsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f6fc',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  imagePickerText: {
    color: '#6a0dad',
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4b4b4b',
    marginBottom: 5,
  },
  gradientInput: {
    borderRadius: 12,
    marginBottom: 15,
    padding: 1,
  },
  input: {
    backgroundColor: '#ffffffcc',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  updateButton: {
    backgroundColor: '#8f5bb3',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#d32f2f',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNavBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default SettingsScreenStyles;
