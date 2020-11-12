const express = require("express");
const router = express.Router();
const tareaController = require("../controllers/tareaController");
const auth = require("../midleware/auth");
const { check } = require("express-validator");

//Crea Proyectos
//Api/proyectos
router.post(
  "/",
  auth,
  [
    check("nombre", "El nombre del proyecto es obligatoio").not().isEmpty(),
    check("proyecto", "El proyecto es obligatoio").not().isEmpty(),
  ],
  tareaController.creaTarea
);
router.get(
  "/",
  auth,
  [check("proyecto", "El proyecto es obligatoio").not().isEmpty()],
  tareaController.obtenerTareas
);

router.put("/:id", auth, tareaController.actualizarTarea);

router.delete("/:id", auth, tareaController.eliminarTarea);

module.exports = router;

//Elimianr proyectos
