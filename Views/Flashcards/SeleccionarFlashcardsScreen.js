import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BottomNavBar from "../../components/BottomNavBar";
import styles from "../../styles/SeleccionarFlashcardsStyles";

const SeleccionarFlashcardsScreen = ({ route, navigation }) => {
  const { eventoId } = route.params;
  const [flashcards, setFlashcards] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [tab, setTab] = useState("ver"); // 'ver' | 'agregar'

  const user = firebase.auth().currentUser;
  const db = firebase.firestore();

  useEffect(() => {
    if (!user) return;

    const cargarFlashcards = async () => {
      try {
        // Obtener todas las flashcards del usuario
        const flashcardsSnap = await db
          .collection("users")
          .doc(user.uid)
          .collection("flashcards")
          .get();

        const todas = flashcardsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Obtener flashcards asociadas al evento
        const eventoDoc = await db
          .collection("users")
          .doc(user.uid)
          .collection("eventos")
          .doc(eventoId)
          .get();

        const flashcardsAsociadas =
          (eventoDoc.exists && eventoDoc.data().flashcards) || [];

        setFlashcards(todas);
        setSeleccionadas(flashcardsAsociadas);
      } catch (error) {
        console.error("Error al cargar flashcards:", error);
      }
    };

    cargarFlashcards();
  }, []);

  // Toggle selección solo si estamos en tab "agregar"
  const toggleSeleccion = (id) => {
    if (tab === "agregar") {
      setSeleccionadas((prev) =>
        prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
      );
    }
  };

  const guardarAsociacion = async () => {
    if (!user) return;

    try {
      const eventoRef = db
        .collection("users")
        .doc(user.uid)
        .collection("eventos")
        .doc(eventoId);

      await eventoRef.update({ flashcards: seleccionadas });
      navigation.goBack();
    } catch (error) {
      console.error("Error al asociar flashcards al evento:", error);
    }
  };

  // Filtrar listas según tab activa:
  // Tab "ver": mostrar solo flashcards asociadas, sin opción de seleccionar
  // Tab "agregar": mostrar solo flashcards NO asociadas, con opción de seleccionar
  const flashcardsVer = flashcards.filter((f) => seleccionadas.includes(f.id));
  const flashcardsAgregar = flashcards.filter((f) => !seleccionadas.includes(f.id));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Flashcards del Evento</Text>

        {/* Tabs */}
        <View style={localStyles.tabsContainer}>
          <TouchableOpacity
            style={[
              localStyles.tab,
              tab === "ver" ? localStyles.tabActive : null,
            ]}
            onPress={() => setTab("ver")}
          >
            <Text style={tab === "ver" ? localStyles.tabTextActive : localStyles.tabText}>
              Ver Asociadas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              localStyles.tab,
              tab === "agregar" ? localStyles.tabActive : null,
            ]}
            onPress={() => setTab("agregar")}
          >
            <Text style={tab === "agregar" ? localStyles.tabTextActive : localStyles.tabText}>
              Agregar Flashcards
            </Text>
          </TouchableOpacity>
        </View>

        {/* Lista de flashcards */}
        <FlatList
          data={tab === "ver" ? flashcardsVer : flashcardsAgregar}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.flashcardItem,
                tab === "agregar" && seleccionadas.includes(item.id) && styles.flashcardSeleccionada,
              ]}
              onPress={() => toggleSeleccion(item.id)}
              disabled={tab === "ver"} // En tab "ver" no se pueden tocar
            >
              <Text style={styles.pregunta}>{item.pregunta}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 120 }}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 20, color: "#666" }}>
              {tab === "ver"
                ? "No hay flashcards asociadas."
                : "No hay flashcards para agregar."}
            </Text>
          }
        />
      </View>

      {/* Botón guardar fijo arriba del navbar */}
      <View style={localStyles.fixedButtonContainer}>
        <TouchableOpacity style={localStyles.botonGuardar} onPress={guardarAsociacion}>
          <Icon name="content-save-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Navbar fijo abajo */}
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

const localStyles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: 3,
    borderColor: "transparent",
  },
  tabActive: {
    borderColor: "#6a0dad",
  },
  tabText: {
    fontSize: 16,
    color: "#555",
  },
  tabTextActive: {
    fontSize: 16,
    color: "#6a0dad",
    fontWeight: "bold",
  },
   fixedButtonContainer: {
    position: "absolute",
    bottom: 120, // subido 20px más arriba que antes (era 70)
    width: "100%",
    alignItems: "center",
    zIndex: 10,
  },
  botonGuardar: {
    backgroundColor: "#6a0dad",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default SeleccionarFlashcardsScreen;
