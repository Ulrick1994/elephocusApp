import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

const useEventosViewModel = () => {
  const [eventos, setEventos] = useState([]);
  const [nuevoEvento, setNuevoEvento] = useState("");
  const [fecha, setFecha] = useState("");
  const [eventoEditando, setEventoEditando] = useState(null);

  const cargarEventos = async () => {
    const eventosGuardados = await AsyncStorage.getItem("eventos");
    setEventos(eventosGuardados ? JSON.parse(eventosGuardados) : []);
  };

  const guardarEventos = async (nuevosEventos) => {
    await AsyncStorage.setItem("eventos", JSON.stringify(nuevosEventos));
    setEventos(nuevosEventos);
  };

  const agregarEvento = async () => {
    if (!nuevoEvento || !fecha) return;

    if (eventoEditando) {
      const eventosActualizados = eventos.map((ev) =>
        ev.id === eventoEditando.id
          ? { ...ev, nombre: nuevoEvento, fecha }
          : ev
      );
      await guardarEventos(eventosActualizados);
      setEventoEditando(null);
    } else {
      const nuevo = {
        id: Date.now(),
        nombre: nuevoEvento,
        fecha,
        flashcards: [],
      };
      await guardarEventos([...eventos, nuevo]);
    }

    setNuevoEvento("");
    setFecha("");
  };

  const eliminarEvento = async (id) => {
    const eventosActualizados = eventos.filter((e) => e.id !== id);
    await guardarEventos(eventosActualizados);
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
