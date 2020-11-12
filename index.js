const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");

//Creamos el servidor

const app = express();

//Conectar base de datos
conectarDB();

//Habilitar cors
app.use(cors());

//Habilitar express.json

app.use(express.json({ extended: true }));

//Puerto de la apop
const port = process.env.port || 4000;

//Importar rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tareas"));

//Definipmos pagina principal
app.get("/", (req, res) => {
  res.send("Hola mundo");
});

//Iniciamos la pp

app.listen(port, "0.0.0.0", () => {
  console.log(`El servidor esta corriendo en el puerto  ${port}`);
});
