// styles/MainScreenStyles.jsx

import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f0fc",
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
    fontFamily: "Oleo Script",
    color: "#fff",
    textAlign: "center",
    textShadowColor: "#00000044",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  cardsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  flatListContent: {
    alignItems: "center",
    paddingBottom: 10,
  },
  cardWrapper: {
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    backgroundColor: "#fff",
    elevation: 5,
    marginVertical: 10,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.4,
  },
});

export default styles;
