// styles/CatalogoTemarioStyles.js

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4a148c",
    marginBottom: 24,
    textAlign: "center",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0d7f9", // Lila suave
    paddingVertical: 28,
    paddingHorizontal: 24,
    marginBottom: 20,
    borderRadius: 0, // Sin bordes redondeados
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
  bottomNavBar: {
    backgroundColor: "#fff",
    paddingBottom: 10,
  },
});

export default styles;
