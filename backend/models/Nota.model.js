import { Schema, model } from "mongoose";

const NotaSchema = new Schema({
  _id_materia: [{
    type: Schema.Types.ObjectId,
    ref: "materias",
  }],

  _id_persona: [{
    type: Schema.Types.ObjectId,
    ref: "personas",
  }],

  descripcion_nota: {
    type: Schema.Types.Decimal128,
  },

  tipo_nota: {
    type: Schema.Types.String,
    enum: ["primer parcial", "segundo parcial", "recuperatorio", "recuperatorio extraordinaria"],
  },

  descripcion_materia: {
    type: Schema.Types.String,
  },
});

export const NotaModel = model("Nota", NotaSchema);
