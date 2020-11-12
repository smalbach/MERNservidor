const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

exports.crearUsuario = async (req, res) => {
  //Verificar errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //Extraer email y password
  const { email, password } = req.body;

  try {
    //revisar el usuario sea unico

    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    //Crea nuevo usuario
    usuario = new Usuario(req.body);

    //Hast de usuario
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);

    //Guardamos nuevo usuario
    await usuario.save();

    //Creamos  y firmamos el JWT
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };

    //Firmmamos el jwt
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 3600000,
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );

    //mensahe de confirmacion
    //res.json({ msg: "Usuario creado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(400).send("Hubo un error");
  }
};
