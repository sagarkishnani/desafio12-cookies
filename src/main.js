import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";

import config from "./config.js";

import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";

import authWebRouter from "./routers/web/auth.js";
import homeWebRouter from "./routers/web/home.js";
import productosApiRouter from "./routers/api/productos.js";

import addProductosHandlers from "./routers/ws/productos.js";
import addMensajesHandlers from "./routers/ws/mensajes.js";

//--------------------------------------------
// instancio servidor, socket y api

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

//--------------------------------------------
// configuro el socket

io.on("connection", async (socket) => {});

async function listarMensajesNormalizados() {
  const mensajes = await mensajesApi.listarAll();
  const normalizedData = normalizarMensajes({ id: "mensajes", mensajes });
  return normalizedData;
}

//--------------------------------------------
// configuro el servidor

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongoRemote.cnxStr,
      mongoOptions: config.mongoRemote.options,
    }),
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 40000,
    },
  })
);

//--------------------------------------------
// rutas del servidor API REST

//--------------------------------------------
// rutas del servidor web

app.get("/api/productos-test", productosApiRouter);

app.get("/home", homeWebRouter);

app.get("/productos-vista-test", homeWebRouter);

//--------------------------------------------
// inicio el servidor

const connectedServer = httpServer.listen(config.PORT, () => {
  console.log(
    `Servidor http escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);
