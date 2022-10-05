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

    // console.log(avisosAlumno.avisoGeneral);

    return res.status(200).json(avisosAlumno);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getTiposDocumAlumno = async (req, res) => {
  try {
    const { id } = req.params;

    const tiposDocumentos = await PersonaModel.schema.path("documentaciones.0.tipo_documento").enumValues;

    // buscar si el alumno ya posee esos documentos

    const { documentaciones } = await PersonaModel.findById(id);

    const documentosAlumno = {};

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < tiposDocumentos.length; i++) {
      // eslint-disable-next-line no-plusplus
      for (let j = 0; j < documentaciones.length; j++) {
        if (tiposDocumentos[i] === documentaciones[j].tipo_documento) {
          documentosAlumno[tiposDocumentos[i]] = documentaciones[j];
        } else {
          documentosAlumno[tiposDocumentos[i]] = {};
        }
      }
    }
    return res.status(200).json(documentosAlumno);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const putTiposDocumAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    const { documentos } = req.body;

    await PersonaModel.findByIdAndUpdate(id, { documentaciones: [...documentos] });

    return res.status(200).json("documentosAlumno");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getHorariosAlumno = async (req, res) => {
  try {
    const { id } = req.params;

    const { _materia } = await PersonaModel.findById(id).select("_materias -_id").populate({ path: "_materia", select: "descripcion_materia horarios -_id" });

    console.log({ horarios: _materia });
    return res.status(200).json({ horarios: _materia });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
