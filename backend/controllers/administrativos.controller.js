import bcrypt from "bcryptjs";
import { generarJwt } from "../helpers/generarJwt.js";
import { PersonaModel } from "../models/Persona.model.js";

export const registrarAdministrativos = async (req, res) => {
  const {
    nombre_persona,
    apellido_persona,
    dni_persona,
    cuil_persona,
    fecha_nac_persona,
    sexo_persona,
    correo_persona,
    telefono_persona,
    direccion_persona,
    nombre_usuario,
    password_usuario,
    roles,
  } = req.body;

  try {
    const passwordEncriptado = bcrypt.hashSync(password_usuario, 10);

    const usuario = await PersonaModel.create({
      nombre_persona,
      apellido_persona,
      dni_persona,
      cuil_persona,
      fecha_nac_persona,
      sexo_persona,
      correo_persona,
      telefono_persona,
      direccion_persona,
      nombre_usuario,
      password_usuario: passwordEncriptado,
      roles,
    });

    const { _id, nombre_persona: NombrePersona, apellido_persona: apellidPersona } = usuario;

    const token = await generarJwt({ _id, NombrePersona, apellidPersona });

    return res.status(200).json({
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const actualizarAdministrativos = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      nombre_persona,
      apellido_persona,
      dni_persona,
      cuil_persona,
      fecha_nac_persona,
      sexo_persona,
      correo_persona,
      telefono_persona,
      direccion_persona,
      nombre_usuario,
      password_usuario,
      roles,
    } = req.body;
    const passwordEncriptado = bcrypt.hashSync(password_usuario, 10);

    await PersonaModel.findByIdAndUpdate(id, {
      nombre_persona,
      apellido_persona,
      dni_persona,
      cuil_persona,
      fecha_nac_persona,
      sexo_persona,
      correo_persona,
      telefono_persona,
      direccion_persona,
      nombre_usuario,
      password_usuario: passwordEncriptado,
      roles,
    });

    return res.status(200).json({
      mensaje: "Administrativo Actualizado",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
