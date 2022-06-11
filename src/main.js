import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";

import config from "./config.js";

import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";

import authWebRouter from "./routers/web/auth.js";
import homeWebRouter from "./routers/web/home.js";
import productosWebRouter from "./routers/web/home.js";

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

io.on("connection", async (socket) => {
  addProductosHandlers(socket, io.sockets);
  addMensajesHandlers(socket, io.sockets);
});

//--------------------------------------------
// configuro el servidor

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Colocar web routers en dos app.use (auth y home)

app.use(homeWebRouter);
app.use(productosWebRouter);

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
app.get("/api/productos-test", productosApiRouter);

//--------------------------------------------
// rutas del servidor web

app.get("/home", homeWebRouter);

app.get("/login", authWebRouter);

app.post("/login", authWebRouter);

app.get("/logout", authWebRouter);

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
