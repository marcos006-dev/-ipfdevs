import { Schema, model } from "mongoose";

const MateriaSchema = new Schema({
  descripcion_materia: {
    type: Schema.Types.String,
    unique: true,
  },

  nombre_carrera: {
    type: Schema.Types.String,
    enum: ["Tecnico en Programación"],
  },

  horarios: [
    {
      _id: false,
      dia_semana: {
        type: Schema.Types.String,
        enum: ["lunes", "martes", "miercoles", "jueves", "viernes"],
      },
      horario_semana: {
        type: Schema.Types.String,
        enum: ["09:40 a 10:00", "10:00 a 10:40", "10:40 a 11:20", "11:20 a 12:00", "12:00 a 14:00", "14:00 a 14:40", "14:40 a 15:20", "15:20 a 16:00", "16:00 a 17:00"],
      },
    },
  ],

  anio_lectivo: [{
    descripcion_anio: {
      type: Schema.Types.String,
    },
    activo: {
      type: Schema.Types.String,
      default: true,
    },
  }],

  activo: {
    type: Schema.Types.Boolean,
    default: true,
  },
});

export const MateriaModel = model("Materia", MateriaSchema);
