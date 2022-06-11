import { normalize, schema } from "normalizr";

// Definimos un esquema de autor
const schemaAuthor = new schema.Entity("authors", {}, { idAttribute: "id" });

// Definimos un esquema de mensaje
const schemaMensaje = new schema.Entity(
  "post",
  { author: schemaAuthor },
  { idAttribute: "id" }
);

// Definimos un esquema de posts
const schemaMensajes = new schema.Entity(
  "posts",
  { mensajes: [schemaMensaje] },
  { idAttribute: "id" }
);

const normalizarMensajes = (mensajesConId) =>
  normalize(mensajesConId, schemaMensajes);

export { normalizarMensajes };
