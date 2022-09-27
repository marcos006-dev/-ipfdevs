import bcrypt from "bcryptjs";
import { generarJwt } from "../helpers/generarJwt.js";
import { PersonaModel } from "../models/Persona.model.js";

export const registrarUsuarios = async (req, res) => {
  // nombre_persona: "Marcos",
  //   apellido_persona: "Franco",
  //   dni_persona: "12345679",
  //   cuil_persona: "12345678902",
  //   fecha_nac_persona: "2022/09/01",
  //   sexo_persona: "Masculino",
  //   correo_persona: "correo2@gmail.com",
  //   telefono_persona: "3704652812",
  //   direccion_persona: {
  //     manzana: "66",
  //     casa: "13",
  //     sector: "-",
  //     lote: "-",
  //     parcela: "-",
  //   },
  //   nombre_usuario: "marcosDAS",
  //   password_usuario: "asdbf",
  //   roles: {
  //     descripcion_rol: "alumno",
  //     acceso_endpoint: ["notas", "post"],
  //   },

  const {
    nombre_persona,
    apellido_persona,
    dni_persona,
    cuil_persona,
    fecha_nac_persona,
    sexo_persona,
    correo_persona,
    telefono_persona,
    direccion_persona,
    nombre_usuario,
    password_usuario,
    roles,
  } = req.body;

  try {
    const passwordEncriptado = bcrypt.hashSync(password_usuario, 10);

    const usuario = await PersonaModel.create({
      nombre_persona,
      apellido_persona,
      dni_persona,
      cuil_persona,
      fecha_nac_persona,
      sexo_persona,
      correo_persona,
      telefono_persona,
      direccion_persona,
      nombre_usuario,
      password_usuario: passwordEncriptado,
      roles,
    });

    const { _id, nombre_persona: NombrePersona, apellido_persona: apellidPersona } = usuario;

    const token = await generarJwt({ _id, NombrePersona, apellidPersona });

    return res.status(200).json({
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
