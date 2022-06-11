import productosApi from "../../api/productos.js";

export default async function configurarSocket(socket, sockets) {
  socket.emit("productos", await productosApi.listarAll());
  socket.on("update", async (producto) => {
    productosApi.guardar(producto);
    sockets.emit("productos", await productosApi.listarAll());
  });
  socket.emit("productos", await productosApi.listarAll());
}
