import { Schema, model } from "mongoose";

const NotaSchema = new Schema({
  _materia: [{
    type: Schema.Types.ObjectId,
    ref: "Materia",
  }],

  _persona: [{
    type: Schema.Types.ObjectId,
    ref: "Persona",
  }],

  descripcion_nota: {
    type: Schema.Types.Number,
  },

  tipo_nota: {
    type: Schema.Types.String,
    enum: ["primer parcial", "segundo parcial", "recuperatorio", "recuperatorio extraordinaria"],
  },

  descripcion_materia: {
    type: Schema.Types.String,
  },

  estado_nota: {
    type: Schema.Types.String,
    enum: ["publicado", "en revision"],
  },
});

export const NotaModel = model("Nota", NotaSchema);
