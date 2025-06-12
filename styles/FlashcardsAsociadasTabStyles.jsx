// En FlashcardsAsociadasTabStyles.js y SeleccionarFlashcardsTabStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  noFlashcardsText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#555",
  },
  flashcardItem: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: "#eef",
    borderRadius: 8,
  },
  pregunta: {
    fontSize: 16,
    color: "#222",
  },
  inputBusqueda: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  flashcardSeleccionada: {
    backgroundColor: "#add8e6",
  },
  botonAgregar: {
    backgroundColor: "#4a90e2",
    padding: 12,
    marginTop: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBotonAgregar: {
    color: "#fff",
    fontWeight: "bold",
  },
});
