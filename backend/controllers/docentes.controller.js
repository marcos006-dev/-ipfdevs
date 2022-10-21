import { MateriaModel } from "../models/Materia.model.js";
import { NotaModel } from "../models/Nota.model.js";
import { PersonaModel } from "../models/Persona.model.js";

export const getMateriasDocente = async (req, res) => {
  try {
    const { _id } = req.decoded;
    const materias = await PersonaModel.findById(_id).select("_materia -_id").populate({ path: "_materia", select: "descripcion_materia horarios _id nombre_carrera" });

    // console.log(materias);
    return res.status(200).json(materias);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getNotasDocente = async (req, res) => {
  try {
    const { _id } = req.decoded;

    // obtener materias docente

    const { _materia } = await PersonaModel.findById(_id);

    console.log(_materia);
    // const notas = await NotaModel.find({ _materia }).select("_materia -_id estado_nota tipo_nota").distinct("tipo_nota");

    const notas = await NotaModel.aggregate(
      [
        {
          $group: {
            _id: "$_materia",
            tipo_nota: { $first: "$tipo_nota" },
            estado_nota: { $first: "$estado_nota" },
            descripcion_materia: { $first: "$descripcion_materia" },
          },
        },
      ],
    );
    console.log(notas);
    return res.status(200).json(notas);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getNotasMateriasDocente = async (req, res) => {
  try {
    // const { _id } = req.decoded;
    const { _materia, tipo_nota } = JSON.parse(req.params.id);

    // console.log(materiaTipoNota);

    const notas = await NotaModel.find({ _materia, tipo_nota }).populate({
      path: "_persona",
      select: "nombre_persona apellido_persona dni_persona",
    });
    console.log(notas);
    // ]);
    return res.status(200).json(notas);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postNotasDocente = async (req, res) => {
  try {
    const {
      _materia,
      _persona,
      descripcion_nota,
      tipo_nota,
    } = req.body;

    const { descripcion_materia } = await MateriaModel.findOne({ _id: _materia });

    const estadoNota = "en revision";

    await NotaModel.create({
      _materia,
      _persona,
      descripcion_nota,
      tipo_nota,
      descripcion_materia,
      estadoNota,
    });

    return res.status(200).json("Nota creada correctamente");
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const putNotasDocente = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      _materia,
      _persona,
      descripcion_nota,
      tipo_nota,
    } = req.body;

    const { descripcion_materia } = await MateriaModel.findOne({ _id: _materia });

    const estadoNota = "en revision";

    await NotaModel.findByIdAndUpdate(id, {
      _materia,
      _persona,
      descripcion_nota,
      tipo_nota,
      descripcion_materia,
      estadoNota,
    });

    return res.status(200).json("Nota actualizada correctamente");
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteNotasDocente = async (req, res) => {
  try {
    const { id } = req.params;
    await NotaModel.findByIdAndDelete(id);

    return res.status(200).json("Nota eliminada correctamente");
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
