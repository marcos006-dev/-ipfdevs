import bcrypt from "bcryptjs";
import { PersonaModel } from "../models/Persona.model.js";

export const getAlumnos = async (req, res) => {
  try {
    const alumnos = await PersonaModel.find().select("_id direccion_persona nombre_persona apellido_persona dni_persona cuil_persona fecha_nac_persona sexo_persona correo_persona telefono_persona nombre_usuario documentaciones inasistencias _materia");

    // console.log(alumnos);
    return res.status(200).json(alumnos);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAlumno = async (req, res) => {
  try {
    const { id } = req.params;

    const alumno = await PersonaModel.findById(id).select("_id direccion_persona nombre_persona apellido_persona dni_persona cuil_persona fecha_nac_persona sexo_persona correo_persona telefono_persona nombre_usuario");

    // console.log(alumno);
    return res.status(200).json(alumno);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
