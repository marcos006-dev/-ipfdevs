import { AvisoModel } from "../../models/Aviso.model";

export const crearAvisos = async (_id, _idUsuario, _idMateria) => {
  await AvisoModel.create({
    _id,
    descripcion_aviso: "Hoy no habra clases",
    tipo_aviso: "particular",
    _persona: _idUsuario,
    _materia: _idMateria,
  });
};
