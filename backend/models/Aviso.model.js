import { Schema, model } from "mongoose";

const AvisoSchema = new Schema({
  descripcion_aviso: {
    type: Schema.Types.String,
  },

  tipo_aviso: {
    type: Schema.Types.String,
    enum: ["general", "particular"],
  },

  _id_persona: [{
    type: Schema.Types.ObjectId,
    ref: "personas",
  }],
});

export const AvisoModel = model("Aviso", AvisoSchema);
