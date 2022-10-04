// import bcrypt from "bcryptjs";
import { NotaModel } from "../models/Nota.model.js";
import { PersonaModel } from "../models/Persona.model.js";

export const getInasistenciaAlumno = async (req, res) => {
  try {
    const inasistencias = await PersonaModel.find().select("_id inasistencias");

    console.log(inasistencias);
    return res.status(200).json(inasistencias);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getNotaAlumno = async (req, res) => {
  try {
    const notas = await NotaModel.find().select("_id tipo_nota descripcion_materia estado_nota").populate({ path: "_materia", select: "descripcion_materia nombre_carrera horarios" });

    console.log(notas);
    return res.status(200).json(notas);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAvisoAlumno = async (req, res) => {
  try {
    const notas = await NotaModel.find().select("_id tipo_nota descripcion_materia estado_nota").populate({ path: "_materia", select: "descripcion_materia nombre_carrera horarios" });

    console.log(notas);
    return res.status(200).json(notas);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// export const getAlumno = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const alumno = await PersonaModel.findById(id).select("_id direccion_persona nombre_persona apellido_persona dni_persona cuil_persona fecha_nac_persona sexo_persona correo_persona telefono_persona nombre_usuario");

//     // console.log(alumno);
//     return res.status(200).json(alumno);
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//     });
//   }
// };
