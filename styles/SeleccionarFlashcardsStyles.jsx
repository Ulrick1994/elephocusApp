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
  tabContainer: {
  flexDirection: 'row',
  marginVertical: 10,
  justifyContent: 'center',
},

tabButton: {
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderWidth: 1,
  borderColor: '#888',
  borderRadius: 20,
  marginHorizontal: 5,
},

tabActivo: {
  backgroundColor: '#8ec5fc',
  borderColor: '#4b7bec',
},

tabTexto: {
  fontWeight: 'bold',
  color: '#333',
},

pestanas: {
  flexDirection: "row",
  justifyContent: "center",
  marginBottom: 10,
},

pestana: {
  flex: 1,
  paddingVertical: 10,
  alignItems: "center",
  borderBottomWidth: 2,
  borderBottomColor: "#ccc",
},

pestanaActiva: {
  borderBottomColor: "#6c5ce7",
},

textoPestana: {
  fontSize: 16,
  fontWeight: "bold",
},

flashcardDeshabilitada: {
  backgroundColor: "#e0e0e0",
  opacity: 0.5,
},
etiquetaAsociada: {
  fontSize: 12,
  color: "#555",
  marginTop: 4,
},


});

export default styles;
