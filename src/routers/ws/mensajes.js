import mensajesApi from "../../api/mensajes.js";
import { normalizarMensajes } from "../../normalizacion/index.js";

export default async function configurarSocket(socket, sockets) {
  // carga inicial de mensajes
  socket.on("nuevoMensaje", async (mensaje) => {
    await mensajesApi.guardar(mensaje);
    io.sockets.emit("mensajes", normalizarMensajes());
  });
  // actualizacion de mensajes
  socket.emit("mensajes", await normalizarMensajes());
}
