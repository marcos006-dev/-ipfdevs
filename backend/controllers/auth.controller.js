import bcrypt from "bcryptjs";
import { generarJwt } from "../helpers/generarJwt.js";
import { PersonaModel } from "../models/Persona.model.js";

export const loguearse = async (req, res) => {
  const { nombre_usuario, password_usuario } = req.body;

  try {
    const usuario = await PersonaModel.findOne({ nombre_usuario });

    if (!usuario) {
      return res.status(401).json({
        msg: "Error al loguearse",
      });
    }

    if (!usuario.activo) {
      return res.status(401).json({
        msg: "Error al loguearse",
      });
    }

    const passwordEncriptado = bcrypt.compareSync(
      password_usuario,
      usuario.password_usuario,
    );

    if (!passwordEncriptado) {
      return res.status(401).json({
        msg: "El password no es valido",
      });
    }

    const { _id, nombre_persona, apellido_persona } = usuario;

    const token = await generarJwt({ _id, nombre_persona, apellido_persona });

    return res.status(200).json({
      token,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
