import bcrypt from "bcryptjs";
import { PersonaModel } from "../models/Persona.model.js";

export const getAdministrativos = async (req, res) => {
  try {
    const administrativos = await PersonaModel.find().select("_id direccion_persona nombre_persona apellido_persona dni_persona cuil_persona fecha_nac_persona sexo_persona correo_persona telefono_persona nombre_usuario");

    // console.log(administrativos);
    return res.status(200).json(administrativos);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAdministrativo = async (req, res) => {
  try {
    const { id } = req.params;

    const administrativo = await PersonaModel.findById(id).select("_id direccion_persona nombre_persona apellido_persona dni_persona cuil_persona fecha_nac_persona sexo_persona correo_persona telefono_persona nombre_usuario");

    // console.log(administrativo);
    return res.status(200).json(administrativo);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postAdministrativo = async (req, res) => {
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

    await PersonaModel.create({
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

    // const { _id, nombre_persona: NombrePersona, apellido_persona: apellidPersona } = usuario;

    // const token = await generarJwt({ _id, NombrePersona, apellidPersona });

    return res.status(200).json({
      msg: "Administrativo registrado correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const putAdministrativo = async (req, res) => {
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
      msg: "Administrativo Actualizado",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteAdministrativo = async (req, res) => {
  try {
    const { id } = req.params;

    await PersonaModel.findByIdAndUpdate(id, { activo: false });
    return res.status(200).json({
      msg: "Administrativo Desactivado",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const activarAdministrativo = async (req, res) => {
  try {
    const { id } = req.params;

    await PersonaModel.findByIdAndUpdate(id, { activo: true });
    return res.status(200).json({
      msg: "Administrativo Activado",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
