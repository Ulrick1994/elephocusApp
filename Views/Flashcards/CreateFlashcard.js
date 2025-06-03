// Views/Flashcards/CreateFlashcard.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet, 
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { observer } from "mobx-react-lite"; // <--- ¡NUEVA IMPORTACIÓN!
import BottomNavBar from "../../components/BottomNavBar";
import useCreateFlashcardViewModel from "../../viewmodels/CreateFlashcardViewModel";
import stylesImportados from "../../styles/CreateFlashcardStyles";

// Envuelve el componente con observer
const CreateFlashcard = observer(({ navigation, route }) => { // <--- ¡CAMBIO AQUÍ!
  const {
    pregunta,
    respuesta,
    selectedThemeId,
    temasDisponibles,
    isLoadingTemas,
    setPregunta,
    setRespuesta,
    setSelectedThemeId,
    handleGuardarFlashcard,
    cargarTemasDelCatalogo,
  } = useCreateFlashcardViewModel();

  const [nombreTemaPreseleccionado, setNombreTemaPreseleccionado] = useState('');
  const temaDesdeParamsId = route.params?.temaId;
  const temaDesdeParamsName = route.params?.temaName;

  useEffect(() => {
    console.log("[CreateFlashcard] Montado. Llamando a cargarTemasDelCatalogo...");
    cargarTemasDelCatalogo(); 
  }, [cargarTemasDelCatalogo]);

  useEffect(() => {
    if (temaDesdeParamsId) {
      setSelectedThemeId(temaDesdeParamsId);
      if (temaDesdeParamsName) {
        setNombreTemaPreseleccionado(temaDesdeParamsName);
      }
      console.log("[CreateFlashcard] Tema preseleccionado por params:", temaDesdeParamsId);
    }
  }, [temaDesdeParamsId, temaDesdeParamsName, setSelectedThemeId]);

  console.log("[CreateFlashcard] Renderizando. isLoadingTemas:", isLoadingTemas);
  console.log("[CreateFlashcard] Renderizando. temasDisponibles (del ViewModel) antes de salvaguarda:", temasDisponibles);
  const safeTemasDisponibles = Array.isArray(temasDisponibles) ? temasDisponibles : [];
  console.log("[CreateFlashcard] Renderizando. safeTemasDisponibles (después de salvaguarda):", safeTemasDisponibles.length, "elementos");

  const onSave = () => {
    if (!selectedThemeId && !temaDesdeParamsId) {
        Alert.alert("Selecciona un Tema", "Por favor, elige un tema para tu flashcard.");
        return;
    }
    handleGuardarFlashcard(); 
  };

  const renderPickerItems = () => {
    if (isLoadingTemas && safeTemasDisponibles.length === 0) {
      return <Picker.Item label="Cargando temas..." value="" />;
    }
    if (safeTemasDisponibles.length === 0) {
      return <Picker.Item label="No hay temas disponibles para seleccionar" value="" />;
    }
    return safeTemasDisponibles.map((tema) => (
      <Picker.Item key={tema.id} label={tema.name} value={tema.id} />
    ));
  };

  return (
    <View style={stylesImportados.container}>
      <View style={stylesImportados.content}>
        <Text style={stylesImportados.titulo}>Crear Nueva Flashcard</Text>
        
        <TextInput
          style={stylesImportados.input}
          placeholder="Pregunta"
          value={pregunta}
          onChangeText={setPregunta}
          multiline
        />
        <TextInput
          style={stylesImportados.input}
          placeholder="Respuesta"
          value={respuesta}
          onChangeText={setRespuesta}
          multiline
        />

        {(isLoadingTemas && safeTemasDisponibles.length === 0) ? (
          <ActivityIndicator size="small" color="#800080" style={{ marginVertical: 10 }} />
        ) : temaDesdeParamsId ? (
          <View style={localStyles.temaPreseleccionadoContainer}>
            <Text style={localStyles.label}>Tema:</Text>
            <Text style={localStyles.temaPreseleccionadoNombre}>{nombreTemaPreseleccionado || temaDesdeParamsId}</Text>
          </View>
        ) : (
          <>
            <Text style={localStyles.label}>Selecciona un Tema:</Text>
            <View style={localStyles.pickerContainer}>
              <Picker
                selectedValue={selectedThemeId}
                style={localStyles.picker}
                onValueChange={(itemValue) => {
                  if (itemValue) setSelectedThemeId(itemValue);
                }}
                prompt="Elige un tema"
                enabled={!isLoadingTemas && safeTemasDisponibles.length > 0}
              >
                <Picker.Item label="-- Elige un tema --" value="" />
                {renderPickerItems()} 
              </Picker>
            </View>
          </>
        )}

        <TouchableOpacity
          style={stylesImportados.botonGuardar}
          onPress={onSave}
        >
          <Text style={stylesImportados.botonGuardarTexto}>Guardar Flashcard</Text>
        </TouchableOpacity>
      </View>

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
}); // <--- ¡CAMBIO AQUÍ! (Cierre del observer)

// (localStyles sigue igual)
const localStyles = StyleSheet.create({
  label: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5, marginTop: 10, },
  pickerContainer: { height: 50, width: '100%', borderWidth: 1, borderColor: '#AAA', borderRadius: 8, marginBottom: 15, justifyContent: 'center', },
  picker: { height: '100%', width: '100%', },
  temaPreseleccionadoContainer: { marginBottom: 15, paddingVertical: 10, },
  temaPreseleccionadoNombre: { fontSize: 16, color: '#555', paddingLeft: 8, }
});

// Asegúrate que el nombre de exportación coincida con cómo lo llamas en tu Stack Navigator
// Si en App.js la ruta se llama "CrearFlashcardScreen", entonces:
// export default CrearFlashcardScreen; 
// Si el archivo se llama CreateFlashcard.js y la ruta también:
export default CreateFlashcard;