import { check } from "express-validator";
import { validarFecha } from "../helpers/validarFechas.js";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { PersonaModel } from "../models/Persona.model.js";

export const postUsuariosMidd = [
  check("nombre_persona")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El nombre de usuario es requerido"),
  check("apellido_persona")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El apellido de la persona es requerida"),
  check("dni_persona")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El dni de la persona es requerida")
    .isLength({ min: 8, max: 8 })
    .withMessage("EL dni debe tener una longitud exacta de 8 digitos")
    .custom(async (dni_persona) => {
      try {
        const usuario = await PersonaModel.count({ dni_persona });
        if (usuario > 0) {
          return Promise.reject(
            "El dni ingresado ya se encuentra registrado en la bd",
          );
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  check("fecha_nac_persona")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La fecha nacimiento de la persona es requerida")
    .custom(async (fecha_nacimiento_persona) => {
      if (!validarFecha(fecha_nacimiento_persona)) {
        return Promise.reject(
          "La fecha de nacimiento ingresada tiene un formato invalido",
        );
      }
    }),
  check("correo_persona")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El correo de la persona es requerida")
    .isEmail()
    .withMessage("El correo enviado tiene un formato invalido")
    .custom(async (correo_persona) => {
      try {
        const usuario = await PersonaModel.count({ correo_persona });
        if (usuario > 0) {
          return Promise.reject(
            "El correo ingresado ya se encuentra registrado en la bd",
          );
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  check("telefono_persona")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El telefono de la persona es requerida")
    .isLength({ min: 10, max: 10 })
    .isNumeric()
    .withMessage(
      "El telefono de la persona debe tener una longitud exacta de 10 numeros",
    )
    .custom(async (telefono_persona) => {
      try {
        const usuario = await PersonaModel.count({ telefono_persona });
        if (usuario > 0) {
          return Promise.reject(
            "El telefono ingresado ya se encuentra registrado en la bd",
          );
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }),

  check("direccion_persona")
    .isObject({ strict: true })
    .withMessage("La direccion de la persona es requerida")
    .custom(async (direccion_persona) => {
      try {
        // eslint-disable-next-line no-prototype-builtins
        if (!direccion_persona.hasOwnProperty("manzana")) {
          return Promise.reject(
            "Se debe enviar los datos de la manzana",
          );
        }

        // eslint-disable-next-line no-prototype-builtins
        if (!direccion_persona.hasOwnProperty("casa")) {
          return Promise.reject("Se debe enviar los datos de la casa");
        }

        // eslint-disable-next-line no-prototype-builtins
        if (!direccion_persona.hasOwnProperty("sector")) {
          return Promise.reject("Se debe enviar los datos del sector");
        }

        // eslint-disable-next-line no-prototype-builtins
        if (!direccion_persona.hasOwnProperty("lote")) {
          return Promise.reject("Se debe enviar los datos del lote");
        }

        // eslint-disable-next-line no-prototype-builtins
        if (!direccion_persona.hasOwnProperty("parcela")) {
          return Promise.reject(
            "Se debe enviar los datos de la parcela",
          );
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  check("roles")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El rol de la persona es requerida")
    .custom(async ({ descripcion_rol }) => {
      try {
        const opcionesPersonas = PersonaModel.schema.path("roles.descripcion_rol").enumValues;
        // console.log(descripcion_rol);
        if (!opcionesPersonas.includes(descripcion_rol)) {
          return Promise.reject(
            "El rol enviado no coincide los permitidos por el sistema",
          );
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  check("documentaciones")
    .isObject({ strict: true })
    .withMessage("La direccion de la persona es requerida")
    .custom(async ({ tipo_documento, url_documento }) => {
      try {
        if (url_documento.length === 0) {
          return Promise.reject(
            "Se debe enviar una url perteneciente al documento enviado",
          );
        }

        const opcionesDocumentos = PersonaModel.schema.path("documentaciones.0.tipo_documento").enumValues;
        // console.log(opcionesDocumentos);
        if (!opcionesDocumentos.includes(tipo_documento)) {
          return Promise.reject(
            "El tipo de documento enviado no coincide con los permitidos por el sistema",
          );
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }),

  check("inasistencias")
    .isObject({ strict: true })
    .withMessage("La la inasistencia de la persona es requerida")
    .custom(async ({ fecha }) => {
      try {
        if (!validarFecha(fecha)) {
          return Promise.reject(
            "Se debe enviar una fecha de inasistencia valida",
          );
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  check("nombre_usuario")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El nombre de usuario de la persona es requerida")
    .custom(async (nombre_usuario) => {
      try {
        const usuarioRegistrado = await PersonaModel.count({ nombre_usuario });

        if (usuarioRegistrado > 0) {
          return Promise.reject(
            "Ya existe un usuario registrado en el sistema!",
          );
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  check("password_usuario")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La contraseña es requerida")
    .isLength({ min: 4, max: 20 })
    .withMessage("La contraseña debe tener un minimo de 4 caracteres y maximo de 20"),

  verificarCampos,
];
