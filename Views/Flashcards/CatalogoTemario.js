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
import { observer } from "mobx-react-lite";
import { useCatalogoTemarioViewModel } from "../../viewmodels/CatalogoTemarioViewModel";
import BottomNavBar from "../../components/BottomNavBar";
import styles from "../../styles/CatalogoTemarioStyles";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CatalogoTemario = observer(({ navigation }) => {
  const viewModel = useCatalogoTemarioViewModel(); 
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoTemaNombre, setNuevoTemaNombre] = useState("");

  useEffect(() => {
    console.log("[CatalogoTemarioScreen] Montado o viewModel cambió. Intentando cargar temas...");
    viewModel.cargarTemas();
  }, [viewModel]); 

  // --- LOGS DE DEPURACIÓN Y SALVAGUARDAS ---
  console.log("[CatalogoTemarioScreen] Renderizando. viewModel.isLoading:", viewModel.isLoading);
  console.log("[CatalogoTemarioScreen] Renderizando. viewModel.temas antes de salvaguarda:", viewModel.temas);

  const temasParaFlatList = Array.isArray(viewModel.temas) ? viewModel.temas : [];
  const hayTemasCargados = temasParaFlatList.length > 0; // Para la condición del ActivityIndicator

  console.log("[CatalogoTemarioScreen] Renderizando. temasParaFlatList (después de salvaguarda):", temasParaFlatList);
  // --- FIN DE LOGS DE DEPURACIÓN Y SALVAGUARDAS ---

  const handleTemaPress = (temaName) => {
    navigation.navigate("CatalogoFlashcards", { temaSeleccionado: temaName });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleTemaPress(item.name)}
    >
      <View style={localStyles.itemContentWrapper}>
        <Text style={styles.itemText}>{item.name}</Text>
        {!item.isGlobal && (
          <TouchableOpacity 
            onPress={() => handleDeleteTema(item)}
            style={localStyles.deleteIcon}
          >
            <MaterialCommunityIcons name="delete-outline" size={24} color="#800080" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  const handleAgregarTema = () => {
    if (nuevoTemaNombre.trim()) {
      viewModel.agregarTema(nuevoTemaNombre.trim());
      setNuevoTemaNombre("");
      setModalVisible(false);
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
          onPress: () => viewModel.eliminarTema(tema.id, tema.userId, tema.isGlobal),
          style: "destructive" 
        },
      ]
    );
  };

  // Condición de carga actualizada para ser más robusta
  if (viewModel.isLoading && !hayTemasCargados) { 
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
        {viewModel.error && <Text style={localStyles.errorText}>{viewModel.error}</Text>}
        <FlatList
          data={temasParaFlatList} // Usamos la variable salvaguardada
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text style={localStyles.emptyListText}>No hay temas disponibles. ¡Añade algunos!</Text>}
          contentContainerStyle={localStyles.flatListContent}
        />
      </View>
      
      <TouchableOpacity
        style={localStyles.fab}
        onPress={() => setModalVisible(true)}
      >
        <MaterialCommunityIcons name="plus" size={30} color="white" />
      </TouchableOpacity>
      
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
});

// (localStyles sigue igual que en el mensaje anterior)
const localStyles = RNStyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  itemContentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  deleteIcon: {
    padding: 5,
  },
  fab: {
    position: 'absolute',
    right: 25, 
    bottom: 75, 
    backgroundColor: '#6a11cb',
    width: 60,   
    height: 60,  
    borderRadius: 30, 
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 25, 
    borderRadius: 10,
    width: '85%', 
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20, 
    fontWeight: 'bold',
    marginBottom: 20, 
  },
  modalInput: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingVertical: 10, 
    paddingHorizontal: 5, 
    marginBottom: 25, 
    fontSize: 16, 
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    width: '100%',
  },
  emptyListText: { 
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
  flatListContent: { 
    paddingBottom: 80, 
  }
});

export default CatalogoTemario;