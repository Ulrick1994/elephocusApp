import React from "react"; // Asegúrate de que React esté importado
import { View, FlatList, Text, StyleSheet } from "react-native"; // Añade Text y StyleSheet
import { useFonts } from "expo-font";
import BottomNavBar from "../../components/BottomNavBar";
import Flashcard from "../../components/Flashcard";
import RoundedImage from '../../components/RoundedImage';
import useMainScreenViewModel from "../../viewmodels/MainScreenViewModel";
import stylesImportados from "../../styles/MainScreenStyles"; // Usaremos estos como base

const MainScreen = ({ navigation }) => {
  const { flashcards } = useMainScreenViewModel(); // Obtiene flashcards del ViewModel
  const [fontsLoaded] = useFonts({
    "Oleo Script": require("../../assets/fonts/OleoScript-Regular.ttf"),
    "Oleo Script Bold": require("../../assets/fonts/OleoScript-Bold.ttf"),
  });

  // --- LOGS DE DEPURACIÓN Y SALVAGUARDA ---
  console.log("[MainScreen] Renderizando. 'flashcards' del ViewModel antes de salvaguarda:", flashcards);
  const flashcardsParaFlatList = Array.isArray(flashcards) ? flashcards : [];
  console.log("[MainScreen] Renderizando. 'flashcardsParaFlatList' (después de salvaguarda):", flashcardsParaFlatList.length, "elementos");
  // --- FIN DE LOGS DE DEPURACIÓN Y SALVAGUARDA ---

  if (!fontsLoaded) {
    // Podrías mostrar un ActivityIndicator aquí también si la carga de fuentes tarda
    return null; 
  }

  const renderFlashcard = ({ item }) => (
    // Usamos el estilo cardWrapper de tus estilos importados
    <View style={stylesImportados.cardWrapper}> 
      <Flashcard pregunta={item.pregunta} respuesta={item.respuesta} />
    </View>
  );

  return (
    // Usamos el estilo container de tus estilos importados
    <View style={stylesImportados.container}> 
      <RoundedImage source={require('../../assets/library.jpeg')} style={stylesImportados.topImage} />

      {/* Usamos el estilo cardsContainer de tus estilos importados */}
      <View style={stylesImportados.cardsContainer}> 
        {/* Usamos flashcardsParaFlatList.length para la condición */}
        {flashcardsParaFlatList.length > 0 ? (
          <FlatList
            data={flashcardsParaFlatList} // Usamos la variable salvaguardada
            renderItem={renderFlashcard}
            // Es mejor usar un 'id' único de tus datos flashcard si lo tienen.
            // Si tus flashcards (de AsyncStorage por ahora) no tienen un id único, index es un fallback.
            // Cuando migremos flashcards a Firestore, tendrán un ID único.
            keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()} 
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={stylesImportados.flatListContent} // Usando estilo importado
          />
        ) : (
          // Usamos el estilo emptyContainer de tus estilos importados
          <View style={stylesImportados.emptyContainer}> 
            <Flashcard // Este componente Flashcard es el tuyo
              pregunta="No hay flashcards disponibles"
              respuesta="Crea nuevas flashcards para comenzar"
            />
          </View>
        )}
      </View>

      <BottomNavBar
        onHomePress={() => navigation.navigate("Main")}
        onBookPress={() => navigation.navigate("CatalogoFlashcards")}
        onAddPress={() => navigation.navigate("CrearFlashcard")}
        onListPress={() => navigation.navigate("CatalogoTemario")}
        onSettingsPress={() => navigation.navigate("Settings")}
        navigation={navigation}
      />
    </View>
  );
};


export default MainScreen;