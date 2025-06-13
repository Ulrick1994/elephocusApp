// views/CatalogoTemario.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import { observer } from "mobx-react-lite";
import { catalogoTemarioStore } from "../../viewmodels/CatalogoTemarioViewModel";
import styles from "../../styles/CatalogoTemarioStyles";
import BottomNavBar from "../../components/BottomNavBar";
import { LinearGradient } from "expo-linear-gradient";

const CatalogoTemario = observer(({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoTema, setNuevoTema] = useState("");

  useEffect(() => {
    catalogoTemarioStore.cargarTemas();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
      {!item.isGlobal && (
        <TouchableOpacity
          onPress={() =>
            catalogoTemarioStore.eliminarTema(item.id, item.userId, item.isGlobal)
          }
        >
          <Text style={{ color: "red", fontWeight: "bold" }}>Eliminar</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
       <LinearGradient
        colors={["#e0c3fc", "#8ec5fc"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <Text style={styles.title}>Catálogo de Temarios</Text>
      </LinearGradient>
   
      <View style={styles.content}>
      
       

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          
          <Text style={styles.addButtonText}>+ Agregar Tema</Text>
        </TouchableOpacity>

        <FlatList
          data={catalogoTemarioStore.temas}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          refreshing={catalogoTemarioStore.isLoading}
          onRefresh={() => catalogoTemarioStore.cargarTemas()}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nuevo Tema</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del tema"
              value={nuevoTema}
              onChangeText={setNuevoTema}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={async () => {
                  await catalogoTemarioStore.agregarTema(nuevoTema);
                  setNuevoTema("");
                  setModalVisible(false);
                }}
              >
                <Text style={styles.confirmButtonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <BottomNavBar
        navigation={navigation}
        onHomePress={() => navigation.navigate("Main")}
        onBookPress={() => navigation.navigate("CatalogoFlashcards")}
        onAddPress={() => navigation.navigate("CrearFlashcard")}
        onListPress={() => navigation.navigate("CatalogoTemario")}
        onSettingsPress={() => navigation.navigate("Settings")}
      />
    </View>
  );
});

export default CatalogoTemario;
