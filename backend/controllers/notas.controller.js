import { MateriaModel } from "../models/Materia.model.js";
import { NotaModel } from "../models/Nota.model.js";
import { PersonaModel } from "../models/Persona.model.js";

export const getNotas = async (req, res) => {
  try {
    const notas = await NotaModel.find().select("_id _materia _persona tipo_nota descripcion_materia estado_nota").populate({ path: "_materia", select: "descripcion_materia nombre_carrera horarios" }).populate({ path: "_persona", select: "nombre_persona apellido_persona" });

    // console.log(notas[0]._persona);
    return res.status(200).json(notas);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getNota = async (req, res) => {
  try {
    const { id } = req.params;

    const nota = await NotaModel.findById(id).select("_id _materia _persona tipo_nota descripcion_materia estado_nota").populate({ path: "_materia", select: "descripcion_materia nombre_carrera horarios" }).populate({ path: "_persona", select: "nombre_persona apellido_persona" });

    // console.log(nota);
    return res.status(200).json(nota);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postNota = async (req, res) => {
  try {
    const {
      _materia,
      _persona,
      descripcion_nota,
      tipo_nota,
    } = req.body;

    const { descripcion_materia } = await MateriaModel.findOne({ _id: _materia });
    await NotaModel.create({
      _materia,
      _persona,
      descripcion_nota,
      tipo_nota,
      descripcion_materia,
      estado_nota: "en revision",
    });

    // console.log(nota);
    return res.status(200).json({
      msg: "Nota creada correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const putNota = async (req, res) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const idUsuario = req.decoded._id;

    // console.log(req.decoded._id);

    const { id } = req.params;
    const {
      _materia,
      _persona,
      descripcion_nota,
      tipo_nota,
    } = req.body;

    // obtener la descripion de la materia
    const { descripcion_materia } = await MateriaModel.findOne({ _id: _materia });

    // obtener el tipo de rol del usuario

    const { roles } = await PersonaModel.findById({ _id: idUsuario });

    const estado_nota = roles.descripcion_rol === "docente" ? "en revision" : "publicado";

    await NotaModel.findByIdAndUpdate(id, {
      _materia,
      _persona,
      descripcion_nota,
      tipo_nota,
      descripcion_materia,
      estado_nota,
    });

    return res.status(200).json({
      msg: "Nota Actualizado",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteNota = async (req, res) => {
  try {
    const { id } = req.params;

    await NotaModel.findByIdAndDelete(id);
    return res.status(200).json({
      msg: "Nota Eliminada",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
