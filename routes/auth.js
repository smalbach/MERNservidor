//Rutas para autenticar usuarios
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const auth = require("../midleware/auth");

//Crea un usuario
//api/auth

router.post(
  "/",
  [
    check("email", "Agrega un email valido").isEmail(),
    check("password", "El password es obligatorio").isLength({ min: 6 }),
  ],
  authController.autenticarUsuario
);

//Obtiene el usuario autenticado
router.get("/", auth, authController.usuarioAutenticado);

module.exports = router;
