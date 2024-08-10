import { Usuario } from "../models/index.js";
import { generateJWT } from "../helpers/tokens.js";

const createUser = async (req, res) => {
  try {
    const existeUsuario = await Usuario.findOne({
      where: { email: req.body.email },
    });

    if (existeUsuario) {
      return res.status(400).json({ error: "Este correo ya existe" });
    }

    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

const getUser = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json({ usuarios });
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

const login = async (req, res) => {
  try {
    const { email, passwordL } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(400).json({ error: "El usuario no existe!" });
    }

    const verify = await usuario.verificarPassword(passwordL);

    if (!verify) {
      return res.status(400).json({ error: "Contraseña incorrecta!" });
    }

    const { password, ...userWithoutPassword } = usuario.toJSON();

    const token = generateJWT({ id: userWithoutPassword.id });

    return res.status(200).json({ token, user: userWithoutPassword });
  } catch (error) {
    console.error("Error al iniciar sesion:", error);
    res.status(500).json({ error: "Error al iniciar sesion" });
  }
};

export { createUser, getUser, login };
