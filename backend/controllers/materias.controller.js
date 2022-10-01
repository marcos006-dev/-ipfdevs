import { MateriaModel } from "../models/Materia.model";

export const getMaterias = async (req, res) => {
  try {
    const materias = await MateriaModel.find().select("_id descripcion_materia nombre_carrera horarios anio_lectivos anio_lectivo");

    // console.log(materias);
    return res.status(200).json(materias);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getMateria = async (req, res) => {
  try {
    const { id } = req.params;

    const materia = await MateriaModel.findById(id).select("_id descripcion_materia nombre_carrera horarios anio_lectivos anio_lectivo");

    // console.log(materia);
    return res.status(200).json(materia);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postMateria = async (req, res) => {
  try {
    const {
      descripcion_materia,
      nombre_carrera,
      horarios,
      anio_lectivo,
    } = req.body;

    await MateriaModel.create({
      descripcion_materia,
      nombre_carrera,
      horarios,
      anio_lectivo,
    });

    // console.log(materia);
    return res.status(200).json({
      msg: "Materia creada correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const putMateria = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      descripcion_materia,
      nombre_carrera,
      horarios,
      anio_lectivo,
    } = req.body;

    await MateriaModel.findByIdAndUpdate(id, {
      descripcion_materia,
      nombre_carrera,
      horarios,
      anio_lectivo,
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

export const deleteMateria = async (req, res) => {
  try {
    const { id } = req.params;

    await MateriaModel.findByIdAndUpdate(id, { activo: false });
    return res.status(200).json({
      msg: "Materia Desactivado",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const activarMateria = async (req, res) => {
  try {
    const { id } = req.params;

    await MateriaModel.findByIdAndUpdate(id, { activo: true });
    return res.status(200).json({
      msg: "Materia Activada",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
