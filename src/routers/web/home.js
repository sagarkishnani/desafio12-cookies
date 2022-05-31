import { Router } from "express";
import { webAuth } from "../../auth/index.js";

import path from "path";

const productosWebRouter = new Router();

//Agregar web auth para hacerlo funcionar
productosWebRouter.get("/home", webAuth, (req, res) => {
  res.render("pages/home", {});
});

productosWebRouter.get("/productos-vista-test", (req, res) => {
  res.sendFile(path.resolve("./") + "/views/productos-vista-test.html");
});

export default productosWebRouter;
