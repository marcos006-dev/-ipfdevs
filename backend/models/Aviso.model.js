import { Schema, model } from "mongoose";

const AvisoSchema = new Schema({
  descripcion_aviso: {
    type: Schema.Types.String,
  },

  tipo_aviso: {
    type: Schema.Types.String,
    enum: ["general", "particular"],
  },

  _persona: [{
    type: Schema.Types.ObjectId,
    ref: "Persona",
  }],

  fecha_alta: {
    type: Schema.Types.Date,
    default: Date.now,
  },
});

export const AvisoModel = model("Aviso", AvisoSchema);
