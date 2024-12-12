import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

// Componente de la tarjeta
const Card = ({ children, style }) => (
  <View style={[styles.card, style]}>{children}</View>
);

// Componente de la shadow card
const ShadowCard = ({ style }) => (
  <View style={[styles.shadowCard, style]} />
);

// Componente del ícono del lápiz
const PencilIcon = ({ onPress, style }) => (
  <TouchableOpacity onPress={onPress}>
    <FontAwesome
      name="pencil"
      size={45}
      color="white"
      style={[styles.pencilIcon, style]}
    />
  </TouchableOpacity>
);

// Componente de la barra de navegación inferior
const BottomNavBar = ({
  onHomePress,
  onBookPress,
  onAddPress,
  onListPress,
  onSettingsPress,
  navigation, // Agrega la prop navigation
}) => (
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
    <TouchableOpacity onPress={onListPress}>
      <FontAwesome name="list" size={24} color="white" />
    </TouchableOpacity>
    <TouchableOpacity onPress={onSettingsPress}>
      <MaterialIcons name="settings" size={24} color="white" />
    </TouchableOpacity>
  </View>
);

// Vista principal reutilizando los componentes
const MainView = ({ navigation }) => {
  // Recibe la prop navigation
  return (
    <View style={styles.container}>
      {/* Sección de cartas sobrepuestas */}
      <View style={styles.cardsContainer}>
        <ShadowCard />
        <Card style={styles.topCard}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Integrals</Text>
            <Text style={styles.cardUnderline}>_____</Text>
            <PencilIcon onPress={() => console.log("Pencil Pressed")} />
          </View>
        </Card>
      </View>

      {/* Barra de navegación inferior */}
      <BottomNavBar
        onHomePress={() => console.log("Home")}
        onBookPress={() => navigation.navigate("CatalogoFlashcards")}
        onAddPress={() => navigation.navigate("CrearFlashcard")}
        onListPress={() => console.log("List")}
        onSettingsPress={() => console.log("Settings")}
        navigation={navigation} // Pasa la prop navigation a BottomNavBar
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffffff",
    justifyContent: "space-between",
  },
  cardsContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 180,
  },
  shadowCard: {
    position: "absolute",
    width: 230,
    height: 340,
    backgroundColor: "#543C3C",
    borderRadius: 40,
    top: 40,
    left: 40,
    zIndex: 1,
  },
  topCard: {
    width: 230,
    height: 340,
    backgroundColor: "#D4B2DA",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    left: 40,
  },
  cardContent: {
    alignItems: "center",
    position: "relative",
  },
  card: {
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 48,
    fontFamily: "Oleo Script",
    color: "#000",
  },
  cardUnderline: {
    fontSize: 40,
    color: "#000",
  },
  pencilIcon: {
    position: "absolute",
    top: -200,
    left: 50,
  },
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

export default MainView;