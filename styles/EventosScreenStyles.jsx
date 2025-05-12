import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
  },
  fechaButton: {
    backgroundColor: "#d4b2da",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  fechaButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  botonGuardar: {
    backgroundColor: "#d4b2da",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  botonGuardarTexto: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  listaEventos: {
    paddingBottom: 100,
  },
  eventoItem: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  eventoNombre: {
    fontSize: 18,
    fontWeight: "bold",
  },
  eventoFecha: {
    fontSize: 14,
    color: "#666",
  },
  botonAgregarFlashcards: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#9f8b9f',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  masIcono: {
    color: 'white',
    fontSize: 20,
  }
  
});

export default styles;
