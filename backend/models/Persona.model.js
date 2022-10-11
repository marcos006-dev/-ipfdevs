import { Schema, model } from "mongoose";
// import bcrypt from "bcryptjs";

const PersonaSchema = new Schema({
  nombre_persona: Schema.Types.String,
  apellido_persona: Schema.Types.String,
  dni_persona: {
    type: Schema.Types.String,
    max: 8,
    min: 8,
    unique: true,
  },
  cuil_persona: {
    type: Schema.Types.String,
    max: 11,
    min: 11,
    unique: true,
  },
  fecha_nac_persona: Schema.Types.String,
  sexo_persona: {
    type: Schema.Types.String,
    enum: ["Masculino", "Femenino", "Undefined"],
  },
  correo_persona: {
    type: Schema.Types.String,
    unique: true,
  },
  telefono_persona: {
    type: Schema.Types.String,
    unique: true,
  },
  direccion_persona: {
    manzana: Schema.Types.String,
    casa: Schema.Types.String,
    sector: Schema.Types.String,
    lote: Schema.Types.String,
    parcela: Schema.Types.String,
  },

  documentaciones: [{
    url_documento: Schema.Types.String,
    tipo_documento: {
      type: Schema.Types.String,
      enum: ["analitico", "domicilio"],
    },
  }],

  inasistencias: [{
    fecha: Schema.Types.Date,
  }],

  _materia: [{
    type: Schema.Types.ObjectId,
    ref: "Materia",
  }],

  nombre_usuario: {
    type: Schema.Types.String,
    unique: true,
  },
  password_usuario: Schema.Types.String,

  fecha_alta: {
    type: Schema.Types.Date,
    default: Date.now,
  },
  activo: {
    type: Schema.Types.Boolean,
    default: true,
  },

  roles: {
    descripcion_rol: {
      type: Schema.Types.String,
      enum: ["alumno", "docente", "administrativo"],
      required: true,
    },
    acceso_endpoint: {
      type: [Schema.Types.String],
      enum: ["notas", "materias", "administrativos", "docentes", "alumnos", "avisos", "inasistencias-alumnos", "notas-alumnos", "avisos-alumnos", "tipos-docum-alumnos", "horarios-alumnos", "materias-docentes", "cargar-notas", "editar-notas", "eliminar-notas", "materias-carrera", "carreras"],
      required: true,
    },
  },
});

// PersonaSchema.pre("save", () => {
//   try {
//     this.password_usuario = bcrypt.hashSync(this.password_usuario, 10);
//   } catch (error) {
//     throw new Error("Error al guardar el usuario");
//   }
// });

export const PersonaModel = model("Persona", PersonaSchema);
