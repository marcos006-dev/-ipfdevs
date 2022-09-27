import { PersonaModel } from "../../models/Persona.model.js";

export const crearUsuario = async () => {
  try {
    const usuarioCreado = await PersonaModel.create({
      nombre_persona: "Marcos",
      apellido_persona: "Franco",
      dni_persona: "12345678",
      cuil_persona: "12345678901",
      fecha_nac_persona: "2022/09/01",
      sexo_persona: "Masculino",
      correo_persona: "correo1@gmail.com",
      telefono_persona: "3704652811",
      direccion_persona: {
        manzana: "mz 66 casa 13",
        casa: "Schema.Types.String",
        sector: "Schema.Types.String",
        lote: "Schema.Types.String",
        parcela: "Schema.Types.String",
      },
      tipo_persona: "Alumno",
      documentaciones: [{
        url_documento: "https://algunlado.com",
        tipo_documento: "Domicilio",
      }],
      inasistencias: [{
        fecha: "2022/09/20",
      }],
      nombre_usuario: "marcos",
      password_usuario: "$2a$10$EpEgugumkVGnWpgpVw9bjeCpGbC1GhJTAhW0WG9qX/xFMFVKJvPA6",
      roles: {
        descripcion_rol: "alumno",
        acceso_endpoint: ["notas", "pots"],
      },
    });
    return usuarioCreado;
  } catch (error) {
    return Promise.reject(error);
  }
};
