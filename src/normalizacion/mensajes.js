import { normalize, schema } from "normalizr";
import mensajesApi from "../api/mensajes.js";

// Definimos un esquema de autor
const schemaAuthor = new schema.Entity("author", {}, { idAttribute: "id" });

// Definimos un esquema de mensaje
const schemaMensaje = new schema.Entity(
  "post",
  { author: schemaAuthor },
  { idAttribute: "_id" }
);

// Definimos un esquema de posts
const schemaMensajes = new schema.Entity(
  "posts",
  { mensajes: [schemaMensaje] },
  { idAttribute: "id" }
);

const normalizarMensajes = normalize(
  await mensajesApi.listarAll(),
  schemaMensajes
);

export { normalizarMensajes };
