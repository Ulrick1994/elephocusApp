import React from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

const BottomNavBar = ({ navigation }) => {
  return (
    <View style={styles.bottomNavBar}>
      <TouchableOpacity onPress={() => navigation.navigate("Main")}>
        <FontAwesome name="home" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Eventos")}>
        <FontAwesome name="calendar" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("CrearFlashcard")} style={styles.addButton}>
        <MaterialIcons name="add" size={32} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("CatalogoTemario")}>
        <FontAwesome name="book" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <MaterialIcons name="settings" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavBar: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#222",
    paddingVertical: 12,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  addButton: {
    backgroundColor: "#9f8b9f",
    padding: 10,
    borderRadius: 30,
  },
});

export default BottomNavBar;
