import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f0fc", // fondo general lavanda claro
  },

  headerGradient: {
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: "Poppins_500Medium",
    color: "#fff",
    textAlign: "center",
    textShadowColor: "#00000044",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },

  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  input: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  fechaButton: {
    backgroundColor: "#b185c8",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    width: 50,
    alignSelf: "center",
  },

  fechaButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },

  botonGuardar: {
    backgroundColor: "#b185c8",
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  botonGuardarTexto: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },

  listaEventos: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },

  eventoItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  eventoNombre: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
  },

  eventoFecha: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },

  swipeAction: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    marginVertical: 5,
    borderRadius: 10,
  },

  deleteAction: {
    backgroundColor: "#f44336",
  },

  editAction: {
    backgroundColor: "#4caf50",
  },

  botonAgregarFlashcards: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "#9f8b9f",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },

  masIcono: {
    color: "white",
    fontSize: 20,
  },

  fechaSeleccionada: {
  fontSize: 16,
  color: "#555",
  textAlign: "center",
  marginTop: 8,
  },

});

export default styles;
