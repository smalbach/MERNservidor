//Rutas para crear usuarios
const express = require("express");
const router = express.Router();
const usurioController = require("../controllers/usuarioController");
const { check } = require("express-validator");
//Crea un usuario
//api/usuarios

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "Agrega un email valido").isEmail(),
    check("password", "El password es obligatorio").isLength({ min: 6 }),
  ],
  usurioController.crearUsuario
);

module.exports = router;
