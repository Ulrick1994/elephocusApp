import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomNavBar from "../components/BottomNavBar";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Para los iconos
import * as Animatable from "react-native-animatable"; // Animaciones

const obtenerFlashcards = async () => {
  try {
    const flashcardsGuardadas = await AsyncStorage.getItem("flashcards");
    return flashcardsGuardadas ? JSON.parse(flashcardsGuardadas) : [];
  } catch (error) {
    console.error("Error al obtener las flashcards:", error);
    return [];
  }
};

const CatalogoFlashcardsScreen = ({ route, navigation }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [flashcardEdit, setFlashcardEdit] = useState(null);
  const { temaSeleccionado } = route.params || {};

  useEffect(() => {
    const cargarFlashcards = async () => {
      const todasLasFlashcards = await obtenerFlashcards();
      const flashcardsConId = todasLasFlashcards.map((flashcard, index) => ({
        ...flashcard,
        id: flashcard.id || index, 
      }));
      const flashcardsFiltradas = temaSeleccionado
        ? flashcardsConId.filter(
            (flashcard) => flashcard.tema === temaSeleccionado
          )
        : flashcardsConId;
      setFlashcards(flashcardsFiltradas);
    };

    cargarFlashcards();
  }, [temaSeleccionado]);

  const eliminarFlashcard = (id) => {
    Alert.alert(
      "Eliminar Flashcard",
      "¿Estás seguro de que deseas eliminar esta flashcard?",
      [
        { text: "Cancelar" },
        {
          text: "Eliminar",
          onPress: async () => {
            const nuevasFlashcards = flashcards.filter(
              (flashcard) => flashcard.id !== id
            );
            await AsyncStorage.setItem(
              "flashcards",
              JSON.stringify(nuevasFlashcards)
            );
            setFlashcards(nuevasFlashcards); // Actualiza el estado
          },
        },
      ]
    );
  };

  const editarFlashcard = (flashcard) => {
    setFlashcardEdit(flashcard);
    setModalVisible(true); // Muestra el modal de edición
  };

  const handleSaveEdit = async () => {
    const updatedFlashcards = flashcards.map((flashcard) =>
      flashcard.id === flashcardEdit.id ? flashcardEdit : flashcard
    );
    await AsyncStorage.setItem("flashcards", JSON.stringify(updatedFlashcards));
    setFlashcards(updatedFlashcards); // Actualiza el estado
    setModalVisible(false); // Cierra el modal
  };

  const leftSwipe = () => (
    <Animatable.View
      animation="shake"
      duration={500}
      style={[styles.swipeAction, styles.deleteAction]}
    >
      <Icon name="delete" size={30} color="white" />
    </Animatable.View>
  );

  const rightSwipe = () => (
    <Animatable.View
      animation="shake" 
      duration={500}
      style={[styles.swipeAction, styles.editAction]}
    >
      <Icon name="pencil" size={30} color="white" />
    </Animatable.View>
  );

  const renderItem = ({ item }) => {
    if (!item.id) {
      console.warn("Flashcard sin ID:", item);
      return null;
    }

    return (
      <Swipeable
        renderLeftActions={leftSwipe} // Deslizar a la izquierda para eliminar
        renderRightActions={rightSwipe} // Deslizar a la derecha para editar
        onSwipeableLeftOpen={() => eliminarFlashcard(item.id)} // Elimina solo la flashcard seleccionada
        onSwipeableRightOpen={() => editarFlashcard(item)} 
      >
        <TouchableOpacity style={styles.flashcardItem}>
          <Text style={styles.pregunta}>{item.pregunta}</Text>
          <Text style={styles.respuesta}>{item.respuesta}</Text>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titulo}>
          {temaSeleccionado
            ? `Flashcards de ${temaSeleccionado}`
            : "Catálogo de Flashcards"}
        </Text>
        <FlatList
          data={flashcards}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()} // Usar el id como clave
          contentContainerStyle={styles.listContentContainer}
        />
      </View>

      {/* Modal de edición */}
      {flashcardEdit && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Editar Flashcard</Text>
            <TextInput
              style={styles.modalInput}
              value={flashcardEdit.pregunta}
              onChangeText={(text) =>
                setFlashcardEdit({ ...flashcardEdit, pregunta: text })
              }
              placeholder="Pregunta"
            />
            <TextInput
              style={styles.modalInput}
              value={flashcardEdit.respuesta}
              onChangeText={(text) =>
                setFlashcardEdit({ ...flashcardEdit, respuesta: text })
              }
              placeholder="Respuesta"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveEdit}
              >
                <Text style={styles.saveButtonText}>Guardar cambios</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      <View style={styles.bottomNavBar}>
        <BottomNavBar
          onHomePress={() => navigation.navigate("Main")}
          onBookPress={() => navigation.navigate("CatalogoFlashcards")}
          onAddPress={() => navigation.navigate("CrearFlashcard")}
          onListPress={() => navigation.navigate("CatalogoTemario")}
          onSettingsPress={() => navigation.navigate("Settings")}
          navigation={navigation}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7", 
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "700",
    color: "#4A148C",
    marginBottom: 20,
    textAlign: "center",
  },
  flashcardItem: {
    backgroundColor: "#9f8b9f", 
    padding: 20,
    marginVertical: 12,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    transform: [{ scale: 1 }],
  },
  pregunta: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
  },
  respuesta: {
    fontSize: 16,
    color: "#F5F5F5",
    textAlign: "center",
  },
  listContentContainer: {
    paddingBottom: 100, 
  },
  bottomNavBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    elevation: 10,
  },
  swipeAction: {
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: 75, 
    borderRadius: 50, 
    backgroundColor: "transparent",
  },
  deleteAction: {
    backgroundColor: "rgba(255, 0, 0, 0.8)", 
  },
  editAction: {
    backgroundColor: "rgba(200, 100, 255, 0.8)", 
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  modalInput: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 16,
    borderRadius: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: "#4A148C",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 15,
    borderRadius: 10,
    flex: 1,
  },
  saveButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  cancelButtonText: {
    color: "#333",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default CatalogoFlashcardsScreen;
