import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

const BottomNavBar = ({
  onHomePress,
  onBookPress,
  onAddPress,
  onListPress,
  onSettingsPress,
  navigation, 
}) => {
  return (
    <View style={styles.bottomNavBar}>
      <TouchableOpacity onPress={onHomePress}>
        <FontAwesome name="home" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onBookPress}>
        <FontAwesome name="book" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onAddPress} style={styles.addButton}>
        <MaterialIcons name="add" size={32} color="white" />
      </TouchableOpacity>
      {/* Botón "List" que navega a "CatalogoTemario" */}
      <TouchableOpacity onPress={() => navigation.navigate("CatalogoTemario")}>
        <FontAwesome name="list" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onSettingsPress}>
        <MaterialIcons name="settings" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#222",
    paddingVertical: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  addButton: {
    backgroundColor: "#9f8b9f",
    padding: 10,
    borderRadius: 50,
  },
});

export default BottomNavBar;