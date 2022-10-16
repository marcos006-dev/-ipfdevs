// import bcrypt from "bcryptjs";
import { AvisoModel } from "../models/Aviso.model.js";
import { NotaModel } from "../models/Nota.model.js";
import { PersonaModel } from "../models/Persona.model.js";

export const getInasistenciaAlumno = async (req, res) => {
  try {
    const { _id } = req.decoded;

    const inasistencias = await PersonaModel.findOne({ _id }).select(
      "_id inasistencias",
    );

    // console.log(inasistencias);
    return res.status(200).json(inasistencias);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getNotaAlumno = async (req, res) => {
  try {
    const { _id } = req.decoded;
    const notas = await NotaModel.find({
      _persona: _id,
      estado_nota: "publicado",
    }).select(
      "_id tipo_nota descripcion_materia estado_nota descripcion_nota",
    );

    // console.log(notas);
    return res.status(200).json(notas);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAvisoAlumno = async (req, res) => {
  try {
    const { _id } = req.decoded;

    // console.log(idAlumno);
    // buscar los avisos y obtener los docentes que la publicaron

    const { _materia } = await PersonaModel.findById(_id).select(
      "_materia -_id",
    );
    const avisosAlumno = {
      avisoGeneral: [],
      avisoParticular: [],
    };

    // avisos particulares
    avisosAlumno.avisoParticular = await AvisoModel.find({
      _materia: { $in: _materia },
    })
      .select("descripcion_aviso tipo_aviso fecha_alta -_id")
      .sort({ fecha_alta: "desc" });

    // avisos generales

    avisosAlumno.avisoGeneral = await AvisoModel.find({
      tipo_aviso: "general",
    })
      .select("descripcion_aviso tipo_aviso fecha_alta -_id")
      .sort({ fecha_alta: "desc" });

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
    const { _id } = req.decoded;

    const tiposDocumentos = await PersonaModel.schema.path(
      "documentaciones.0.tipo_documento",
    ).enumValues;

    // buscar si el alumno ya posee esos documentos
    const { documentaciones } = await PersonaModel.findById(_id);

    const documentosAlumno = {};

    tiposDocumentos.forEach((tipoDocumento) => {
      documentosAlumno[tipoDocumento] = {};
    });

    Object.values(documentaciones).forEach((value) => {
      if (tiposDocumentos.includes(value.tipo_documento)) {
        documentosAlumno[value.tipo_documento] = value;
      }
    });

    // console.log(documentosAlumno);
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
    const { _id } = req.decoded;
    const documentos = req.body;

    const documentosAlumno = [];

    Object.keys(documentos).forEach((documentoKey) => {
      documentosAlumno.push(documentos[documentoKey]);
    });

    await PersonaModel.findByIdAndUpdate(_id, {
      documentaciones: documentosAlumno,
    });
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
    const { _id } = req.decoded;

    const { _materia } = await PersonaModel.findById(_id)
      .select("_materias")
      .populate({
        path: "_materia",
        select: "descripcion_materia horarios",
      });

    // console.log({ horarios: _materia });
    return res.status(200).json({ horarios: _materia });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
