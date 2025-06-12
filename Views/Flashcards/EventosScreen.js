import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import BottomNavBar from "../../components/BottomNavBar";
import EventosViewModel from "../../viewmodels/EventosViewModel";
import styles from "../../styles/EventosScreenStyles";
import Swipeable from "react-native-gesture-handler/Swipeable";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";

const EventosScreen = ({ navigation }) => {
  const {
    eventos,
    nuevoEvento,
    setNuevoEvento,
    fecha,
    setFecha,
    agregarEvento,
    cargarEventos,
    eliminarEvento,
    prepararEdicion,
    eventoEditando,
  } = EventosViewModel();

  const [mostrarFechaPicker, setMostrarFechaPicker] = useState(false);

  useEffect(() => {
    cargarEventos();
  }, []);

  const guardarEvento = async () => {
    if (!nuevoEvento || !fecha) {
      Alert.alert("Campos incompletos", "Por favor completa nombre y fecha.");
      return;
    }

    await agregarEvento();
  };

  const renderEvento = ({ item }) => (
    <Swipeable
      renderLeftActions={() => (
        <Animatable.View
          animation="fadeInLeft"
          style={[styles.swipeAction, styles.deleteAction]}
        >
          <Icon name="delete" size={30} color="white" />
        </Animatable.View>
      )}
      renderRightActions={() => (
        <Animatable.View
          animation="fadeInRight"
          style={[styles.swipeAction, styles.editAction]}
        >
          <Icon name="pencil" size={30} color="white" />
        </Animatable.View>
      )}
      onSwipeableLeftOpen={() =>
        Alert.alert("Eliminar Evento", "¿Deseas eliminar este evento?", [
          { text: "Cancelar", style: "cancel" },
          { text: "Eliminar", onPress: () => eliminarEvento(item.id) },
        ])
      }
      onSwipeableRightOpen={() => prepararEdicion(item)}
    >
      <TouchableOpacity
        style={styles.eventoItem}
        onPress={() =>
          navigation.navigate("SeleccionarFlashcards", { eventoId: item.id })
        }
      >
        <Text style={styles.eventoNombre}>{item.nombre}</Text>
        <Text style={styles.eventoFecha}>{item.fecha}</Text>
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#e0c3fc", "#8ec5fc"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <Text style={styles.titulo}>Eventos de Estudio</Text>
      </LinearGradient>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre del Evento"
          value={nuevoEvento}
          onChangeText={setNuevoEvento}
          placeholderTextColor="#888"
        />

        <TouchableOpacity
          style={styles.fechaButton}
          onPress={() => setMostrarFechaPicker(true)}
        >
          <Icon name="calendar-month-outline" size={26} color="#fff" />
        </TouchableOpacity>
        {fecha ? <Text style={styles.fechaSeleccionada}>{fecha}</Text> : null}

        {mostrarFechaPicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setMostrarFechaPicker(false);
              if (selectedDate) {
                setFecha(selectedDate.toLocaleDateString());
              }
            }}
          />
        )}

        <TouchableOpacity style={styles.botonGuardar} onPress={guardarEvento}>
          <Text style={styles.botonGuardarTexto}>
            {eventoEditando ? "Actualizar Evento" : "Guardar Evento"}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderEvento}
        contentContainerStyle={styles.listaEventos}
      />

      <BottomNavBar
        onHomePress={() => navigation.navigate("Main")}
        onBookPress={() => navigation.navigate("CatalogoFlashcards")}
        onAddPress={() => navigation.navigate("CrearFlashcard")}
        onListPress={() => navigation.navigate("Eventos")}
        onSettingsPress={() => navigation.navigate("Settings")}
        navigation={navigation}
      />
    </View>
  );
};

export default EventosScreen;
