import { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const useEventosViewModel = () => {
  const [eventos, setEventos] = useState([]);
  const [nuevoEvento, setNuevoEvento] = useState("");
  const [fecha, setFecha] = useState("");
  const [eventoEditando, setEventoEditando] = useState(null);

  const user = firebase.auth().currentUser;

  const cargarEventos = async () => {
    if (!user) return;
    try {
      const eventosRef = firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .collection("eventos");

      const snapshot = await eventosRef.get();
      const eventosCargados = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEventos(eventosCargados);
    } catch (error) {
      console.error("Error al cargar eventos:", error);
    }
  };

  const agregarEvento = async () => {
    if (!user || !nuevoEvento || !fecha) return;

    try {
      const eventosRef = firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .collection("eventos");

      if (eventoEditando) {
        await eventosRef.doc(eventoEditando.id).update({
          nombre: nuevoEvento,
          fecha,
        });
        setEventoEditando(null);
      } else {
        await eventosRef.add({
          nombre: nuevoEvento,
          fecha,
          flashcards: [],
        });
      }

      setNuevoEvento("");
      setFecha("");
      cargarEventos();
    } catch (error) {
      console.error("Error al agregar evento:", error);
    }
  };

  const eliminarEvento = async (id) => {
    if (!user) return;
    try {
      const eventoRef = firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .collection("eventos")
        .doc(id);

      await eventoRef.delete();
      cargarEventos();
    } catch (error) {
      console.error("Error al eliminar evento:", error);
    }
  };

  const prepararEdicion = (evento) => {
    setNuevoEvento(evento.nombre);
    setFecha(evento.fecha);
    setEventoEditando(evento);
  };

  return {
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
  };
};

export default useEventosViewModel;
