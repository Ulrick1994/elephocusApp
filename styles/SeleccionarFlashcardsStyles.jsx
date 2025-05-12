import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  flashcardItem: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#eee",
    marginBottom: 10,
  },
  flashcardSeleccionada: {
    backgroundColor: "#cce5ff",
  },
  pregunta: {
    fontSize: 16,
  },
  botonGuardar: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  botonGuardarTexto: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default styles;
