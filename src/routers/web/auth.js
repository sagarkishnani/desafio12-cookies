import { Router } from "express";
import path from "path";
import { webAuth } from "../../auth/index.js";

const authWebRouter = new Router();

authWebRouter.get("/", (req, res) => {
  res.redirect("/home");
});

authWebRouter.get("/login", (req, res, next) => {
  if (!req.session.nombre) {
    res.sendFile(path.resolve("./") + "/views/login.html");
  } else {
    res.render("pages/home", {});
  }
});

authWebRouter.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.json({ error: "olvidar", body: err });
      } else {
        res.sendFile(path.resolve("./") + "/views/login.html");
      }
    });
  }
});

authWebRouter.post("/login", (req, res) => {
  const { nombre } = req.body;
  req.session.nombre = nombre;

  res.render("pages/home", { nombre });
});

export default authWebRouter;
