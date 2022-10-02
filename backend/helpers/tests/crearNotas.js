import { NotaModel } from "../../models/Nota.model";

export const crearNotas = async (_id, _idMateria, _idPersona) => {
  await NotaModel.create({
    _id,
    _materia: _idMateria,
    _persona: _idPersona,
    descripcion_nota: 6,
    tipo_nota: "primer parcial",
    descripcion_materia: "Matematicas",
    estado_nota: "publicado",
  });
};
