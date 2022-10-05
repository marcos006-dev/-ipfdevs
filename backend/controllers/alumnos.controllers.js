// import bcrypt from "bcryptjs";
import { AvisoModel } from "../models/Aviso.model.js";
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
    const idAlumno = req.params.id;

    // console.log(idAlumno);
    // buscar los avisos y obtener los docentes que la publicaron

    const { _materia } = await PersonaModel.findById(idAlumno).select("_materia -_id");
    const avisosAlumno = {
      avisoGeneral: [],
      avisoParticular: [],
    };

    // avisos particulares
    avisosAlumno.avisoParticular = await AvisoModel.find({ _materia: { $in: _materia } }).select("descripcion_aviso tipo_aviso fecha_alta -_id").sort({ fecha_alta: "desc" });

    // avisos generales

    avisosAlumno.avisoGeneral = await AvisoModel.find({ tipo_aviso: "general" }).select("descripcion_aviso tipo_aviso fecha_alta -_id").sort({ fecha_alta: "desc" });

    console.log(avisosAlumno.avisoGeneral);

    return res.status(200).json(avisosAlumno);
  } catch (error) {
    console.log(error);
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
