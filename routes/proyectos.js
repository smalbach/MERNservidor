const express = require("express");
const router = express.Router();
const proyectoController = require("../controllers/proyectoController");
const auth = require("../midleware/auth");
const { check } = require("express-validator");

//Crea Proyectos
//Api/proyectos
router.post(
  "/",
  auth,
  [check("nombre", "El nombre del proyecto es obligatoio").not().isEmpty()],
  proyectoController.crearProyecto
);
//Obtener todos los proyecots
router.get("/", auth, proyectoController.obtenerProyectos);

//Actualizar proyectos
router.put(
  "/:id",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio.").not().isEmpty()],
  proyectoController.actualizarProyecto
);

//Elimianr proyectos
router.delete("/:id", auth, proyectoController.eliminarProyecto);

module.exports = router;
