// Views/Flashcards/CatalogoTemario.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Modal,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet as RNStyleSheet,
} from "react-native";
import { useCatalogoTemarioViewModel } from "../../viewmodels/CatalogoTemarioViewModel";
import BottomNavBar from "../../components/BottomNavBar";
import styles from "../../styles/CatalogoTemarioStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CatalogoTemario = ({ navigation }) => {
  const viewModel = useCatalogoTemarioViewModel();
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoTemaNombre, setNuevoTemaNombre] = useState([]);
  const [temas, setTemas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarTemas = async () => {
    setIsLoading(true);
    try {
      await viewModel.cargarTemas();
      setTemas(Array.isArray(viewModel.temas) ? viewModel.temas.slice() : []);
      setError(null);
    } catch (e) {
      setError("Error al cargar los temas.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    cargarTemas();
  }, []);

  const handleTemaPress = (temaName) => {
    navigation.navigate("CatalogoFlashcards", { temaSeleccionado: temaName });
  };

  const handleAgregarTema = async () => {
    if (nuevoTemaNombre.trim()) {
      await viewModel.agregarTema(nuevoTemaNombre.trim());
      setNuevoTemaNombre("");
      setModalVisible(false);
      cargarTemas(); // recarga la lista
    } else {
      Alert.alert("Error", "El nombre del tema no puede estar vacío.");
    }
  };

  const handleDeleteTema = (tema) => {
    if (tema.isGlobal) {
      Alert.alert("Operación no permitida", "No puedes eliminar temas globales.");
      return;
    }
    Alert.alert(
      "Confirmar Eliminación",
      `¿Estás seguro de que quieres eliminar el tema "${tema.name}"? Esta acción no se puede deshacer.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: async () => {
            await viewModel.eliminarTema(tema.id, tema.userId, tema.isGlobal);
            cargarTemas(); // recarga tras eliminar
          },
          style: "destructive",
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleTemaPress(item.name)}>
      <Text style={styles.itemText}>{item.name}</Text>
      {!item.isGlobal && (
        <TouchableOpacity onPress={() => handleDeleteTema(item)} style={localStyles.deleteIcon}>
          <MaterialCommunityIcons name="delete-outline" size={24} color="#800080" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  if (isLoading && temas.length === 0) {
    return (
      <SafeAreaView style={[styles.container, localStyles.centered]}>
        <ActivityIndicator size="large" color="#6a11cb" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Temarios</Text>
        {error && <Text style={localStyles.errorText}>{error}</Text>}

        <FlatList
          data={temas}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text style={localStyles.emptyListText}>No hay temas disponibles. ¡Añade algunos!</Text>
          }
          contentContainerStyle={localStyles.flatListContent}
        />

        <TouchableOpacity style={localStyles.nuevoTemaButton} onPress={() => setModalVisible(true)}>
          <Text style={localStyles.nuevoTemaButtonText}>Nuevo Tema</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={localStyles.modalOverlay}>
          <View style={localStyles.modalContent}>
            <Text style={localStyles.modalTitle}>Agregar Nuevo Tema Personalizado</Text>
            <TextInput
              style={localStyles.modalInput}
              placeholder="Nombre del tema"
              value={nuevoTemaNombre}
              onChangeText={setNuevoTemaNombre}
            />
            <View style={localStyles.modalButtonsContainer}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} color="#888" />
              <Button title="Agregar" onPress={handleAgregarTema} color="#800080" />
            </View>
          </View>
        </View>
      </Modal>

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

const localStyles = RNStyleSheet.create({
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  deleteIcon: {
    paddingLeft: 10,
  },
  nuevoTemaButton: {
    backgroundColor: "#6a11cb",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  nuevoTemaButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 10,
    width: "85%",
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalInput: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 25,
    fontSize: 16,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  emptyListText: {
    marginTop: 20,
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
  flatListContent: {
    paddingBottom: 40,
  },
});

export default CatalogoTemario;
