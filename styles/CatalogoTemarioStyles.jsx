// styles/CatalogoTemarioStyles.js

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topGradientContainer: {
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: "#f6f0fc", // similar al gradiente superior
  },

  headerGradient: {
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
  },


  curveSvg: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: "Poppins_500Medium",
    color: "#fff",
    textAlign: "center",
    textShadowColor: "#00000044",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },

  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0d7f9",
    paddingVertical: 28,
    paddingHorizontal: 24,
    marginBottom: 20,
    borderRadius: 0,
    borderLeftWidth: 8,
    borderLeftColor: "#6a11cb",
    width: "100%",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  itemText: {
    fontSize: 22,
    color: "#4a148c",
    fontWeight: "600",
    flex: 1,
  },
  addButton: {
    backgroundColor: "#6a11cb",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "center",
    marginBottom: 16,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4a148c",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
  },
  confirmButton: {
    backgroundColor: "#6a11cb",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
  },
  cancelButtonText: {
    textAlign: "center",
    color: "#333",
    fontWeight: "bold",
  },
  confirmButtonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  bottomNavBar: {
    backgroundColor: "#fff",
    paddingBottom: 10,
  },
});

export default styles;
