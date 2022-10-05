import { AvisoModel } from "../models/Aviso.model";
import { PersonaModel } from "../models/Persona.model";

export const getAvisos = async (req, res) => {
  try {
    const avisos = await AvisoModel.find().select("_id descripcion_aviso tipo_aviso _persona").populate({ path: "_persona", select: "nombre_persona apellido_persona" });

    // console.log(avisos);
    return res.status(200).json(avisos);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAviso = async (req, res) => {
  try {
    const { id } = req.params;

    const aviso = await AvisoModel.findById(id).select("_id descripcion_aviso tipo_aviso _persona").populate({ path: "_persona", select: "nombre_persona apellido_persona" });

    // console.log(aviso);
    return res.status(200).json(aviso);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postAviso = async (req, res) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const _persona = req.decoded._id;
    const {
      descripcion_aviso,
      _materia,
    } = req.body;

    console.log(_materia);
    const { roles } = await PersonaModel.findOne({ _id: _persona });

    const tipo_aviso = roles.descripcion_rol === "docente" ? "particular" : "general";

    await AvisoModel.create({
      descripcion_aviso,
      tipo_aviso,
      _persona,
      _materia,
    });

    // console.log(aviso);
    return res.status(200).json({
      msg: "Aviso creada correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const putAviso = async (req, res) => {
  try {
    // const _persona = req.decoded._id;

    const { id } = req.params;

    const {
      descripcion_aviso,
      // _materia,
    } = req.body;

    // const { roles } = await PersonaModel.findOne({ _id: _persona });

    // console.log(roles);
    // const tipo_aviso = roles.descripcion_rol === "docente" ? "particular" : "general";

    await AvisoModel.findByIdAndUpdate(id, {
      descripcion_aviso,
      // tipo_aviso,
      // _persona,
      // _materia,
    });

    // console.log(aviso);
    return res.status(200).json({
      msg: "Aviso actualizado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteAviso = async (req, res) => {
  try {
    const { id } = req.params;

    await AvisoModel.findByIdAndDelete(id);
    return res.status(200).json({
      msg: "Aviso Eliminada",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
