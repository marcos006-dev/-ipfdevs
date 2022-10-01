import { MateriaModel } from "../../models/Materia.model.js";

export const crearMaterias = async (_id) => {
  await MateriaModel.create({
    _id,
    descripcion_materia: "Programacion IV",
    nombre_carrera: "Tecnico en Programación",
    horarios: [{
      dia_semana: "lunes",
      horario_semana: "09:40 a 10:00",
    },
    {
      dia_semana: "martes",
      horario_semana: "10:40 a 11:20",
    },

    ],
    anio_lectivo: [{
      descripcion_anio: "2022",
    }],
  });
};
