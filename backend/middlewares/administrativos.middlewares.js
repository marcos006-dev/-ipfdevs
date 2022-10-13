import { check, param } from "express-validator";
import { Types } from "mongoose";
import { validarFecha } from "../helpers/validarFechas.js";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { MateriaModel } from "../models/Materia.model.js";
import { PersonaModel } from "../models/Persona.model.js";

export const getAdministrativosMidd = [verificarCampos];

export const getAdministrativoMidd = [
  param("id")
    .custom((id) => {
      // console.log(id);
      if (!Types.ObjectId.isValid(id)) {
        return Promise.reject(
          "El id enviado no es un id valido de mongo",
        );
      }
      return true;
    })
    .custom(async (idAdministrativo) => {
      // console.log(idAdministrativo);
      try {
        if (!Types.ObjectId.isValid(idAdministrativo)) return;

        const administrativo = await PersonaModel.countDocuments({
          _id: idAdministrativo,
        });
        // console.log(administrativo);
        if (administrativo === 0) {
          return Promise.reject(
            "El id enviado no pertenece a ningun registro en la bd",
          );
        }
      } catch (error) {
        console.log(error);
      }
    }),
  verificarCampos,
];

export const postAdministrativoMidd = [
  check("nombre_persona")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El nombre del administrativo es requerido"),
  check("apellido_persona")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El apellido del administrativo es requerido"),
  check("dni_persona")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El dni del administrativo es requerido")
    .isLength({ min: 8, max: 8 })
    .withMessage("EL dni debe tener una longitud exacta de 8 digitos")
    .custom(async (dni_persona) => {
      try {
        const administrativo = await PersonaModel.countDocuments({
          dni_persona,
        });
        if (administrativo > 0) {
          return Promise.reject(
            "El dni ingresado ya se encuentra registrado en la bd",
          );
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  check("cuil_persona")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El cuil del administrativo es requerido")
    .isLength({ min: 11, max: 11 })
    .withMessage("EL dni debe tener una longitud exacta de 8 digitos")
    .custom(async (cuil_persona) => {
      try {
        const administrativo = await PersonaModel.countDocuments({
          cuil_persona,
        });
        if (administrativo > 0) {
          return Promise.reject(
            "El cuil ingresado ya se encuentra registrado en la bd",
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
    .withMessage("La fecha nacimiento del administrativo es requerido"),
  // .custom(async (fecha_nacimiento_persona) => {
  //   if (!validarFecha(fecha_nacimiento_persona)) {
  //     return Promise.reject(
  //       "La fecha de nacimiento ingresada tiene un formato invalido",
  //     );
  //   }
  // }),
  check("correo_persona")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El correo del administrativo es requerido")
    .isEmail()
    .withMessage("El correo enviado tiene un formato invalido")
    .custom(async (correo_persona) => {
      try {
        const administrativo = await PersonaModel.countDocuments({
          correo_persona,
        });
        if (administrativo > 0) {
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
    .withMessage("El telefono del administrativo es requerido")
    .isLength({ min: 10, max: 10 })
    .isNumeric()
    .withMessage(
      "El telefono del administrativo debe tener una longitud exacta de 10 numeros",
    )
    .custom(async (telefono_persona) => {
      try {
        const administrativo = await PersonaModel.countDocuments({
          telefono_persona,
        });
        if (administrativo > 0) {
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
    .withMessage("La direccion del administrativo es requerida")
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
    .withMessage("El rol del administrativo es requerido")
    .custom(async (descripcion_rol) => {
      try {
        const opcionesPersonas = PersonaModel.schema.path(
          "roles.descripcion_rol",
        ).enumValues;
        if (!opcionesPersonas.includes(descripcion_rol)) {
          return Promise.reject(
            "El rol enviado no coincide los permitidos por el sistema",
          );
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  // check("documentaciones")
  //   .isObject({ strict: true })
  //   .withMessage("La direccion de la persona es requerida")
  //   .custom(async ({ tipo_documento, url_documento }) => {
  //     try {
  //       if (url_documento.length === 0) {
  //         return Promise.reject(
  //           "Se debe enviar una url perteneciente al documento enviado",
  //         );
  //       }

  //       const opcionesDocumentos = PersonaModel.schema.path("documentaciones.0.tipo_documento").enumValues;
  //       // console.log(opcionesDocumentos);
  //       if (!opcionesDocumentos.includes(tipo_documento)) {
  //         return Promise.reject(
  //           "El tipo de documento enviado no coincide con los permitidos por el sistema",
  //         );
  //       }
  //     } catch (error) {
  //       return Promise.reject(error);
  //     }
  //   }),

  // check("inasistencias")
  //   .isObject({ strict: true })
  //   .withMessage("La la inasistencia de la persona es requerida")
  //   .custom(async ({ fecha }) => {
  //     try {
  //       if (!validarFecha(fecha)) {
  //         return Promise.reject(
  //           "Se debe enviar una fecha de inasistencia valida",
  //         );
  //       }
  //     } catch (error) {
  //       return Promise.reject(error);
  //     }
  //   }),
  check("_materia").custom((_materia, { req }) => {
    try {
      const descripcion_rol = req.body.roles;

      if (_materia.length > 0 && descripcion_rol === "administrativo") {
        return Promise.reject(
          "No se pueden cargar materias a un administrativo",
        );
      }

      if (_materia.length === 0 && descripcion_rol !== "administrativo") {
        return Promise.reject("Se deben enviar materias");
      }

      _materia.forEach(async (idMateria) => {
        // validar si es un id valido de mongo
        if (!Types.ObjectId.isValid(idMateria)) {
          return Promise.reject("El id enviado no es un id valido de mongo");
        }

        // verificar si existe el id en la db
        const resultMaterias = await MateriaModel.countDocuments({
          _id: idMateria,
        });

        if (resultMaterias === 0) {
          return Promise.reject(
            "El id de materia enviado no coincide con los registros del sistema",
          );
        }
      });
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
    return true;
  }),
  check("nombre_usuario")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El nombre de usuario para el administrativo es requerido")
    .custom(async (nombre_usuario) => {
      try {
        const administrativoRegistrado = await PersonaModel.countDocuments({ nombre_usuario });

        if (administrativoRegistrado > 0) {
          return Promise.reject(
            "Ya existe un usuario registrado en el sistema!",
          );
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  // check("password_usuario")
  //   .exists()
  //   .not()
  //   .isEmpty()
  //   .withMessage("La contraseña es requerida")
  //   .isLength({ min: 4, max: 20 })
  //   .withMessage("La contraseña debe tener un minimo de 4 caracteres y maximo de 20"),
  verificarCampos,
];

export const putAdministrativoMidd = [
  param("id")
    .custom(async (id) => {
      console.log(id);
      try {
        // console.log(id);
        if (!Types.ObjectId.isValid(id)) {
          return Promise.reject(
            "El id enviado no es un id valido de mongo",
          );
        }

        const administrativo = await PersonaModel.countDocuments({
          _id: id,
        });
        // console.log(administrativo);
        if (administrativo === 0) {
          return Promise.reject(
            "El id enviado no pertenece a ningun registro en la bd",
          );
        }
        // return true;
      } catch (error) {
        console.log(error);
      }
    }),
  check("nombre_persona")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El nombre del administrativo es requerido"),
  check("apellido_persona")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El apellido del administrativo es requerido"),
  check("dni_persona")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El dni del administrativo es requerid0")
    .isLength({ min: 8, max: 8 })
    .withMessage("EL dni debe tener una longitud exacta de 8 digitos")
    .custom(async (dni_persona, { req }) => {
      try {
        const idAdministrativo = req.params.id;

        if (!Types.ObjectId.isValid(idAdministrativo)) return;
        // console.log(idAdministrativo);
        const administrativo = await PersonaModel.countDocuments({
          dni_persona,
          _id: { $ne: idAdministrativo },
        });
        // console.log(administrativo);
        if (administrativo > 0) {
          return Promise.reject(
            "El dni ingresado ya se encuentra registrado en la bd",
          );
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  check("cuil_persona")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El cuil del administrativo es requerid0")
    .isLength({ min: 11, max: 11 })
    .withMessage("EL dni debe tener una longitud exacta de 8 digitos")
    .custom(async (cuil_persona, { req }) => {
      try {
        const idAdministrativo = req.params.id;

        if (!Types.ObjectId.isValid(idAdministrativo)) return;
        // console.log(idAdministrativo);
        const administrativo = await PersonaModel.countDocuments({
          cuil_persona,
          _id: { $ne: idAdministrativo },
        });
        // console.log(administrativo);
        if (administrativo > 0) {
          return Promise.reject(
            "El cuil ingresado ya se encuentra registrado en la bd",
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
    .withMessage("La fecha nacimiento del administrativo es requerido"),
  // .custom(async (fecha_nacimiento_persona) => {
  //   if (!validarFecha(fecha_nacimiento_persona)) {
  //     return Promise.reject(
  //       "La fecha de nacimiento ingresada tiene un formato invalido",
  //     );
  //   }
  // }),
  check("correo_persona")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El correo del administrativo es requerido")
    .isEmail()
    .withMessage("El correo enviado tiene un formato invalido")
    .custom(async (correo_persona, { req }) => {
      try {
        const idAdministrativo = req.params.id;

        if (!Types.ObjectId.isValid(idAdministrativo)) return;

        const administrativo = await PersonaModel.countDocuments({
          correo_persona,
          _id: { $ne: idAdministrativo },
        });

        // console.log(administrativo);

        if (administrativo > 0) {
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
    .withMessage("El telefono del administrativo es requerida")
    .isLength({ min: 10, max: 10 })
    .isNumeric()
    .withMessage(
      "El telefono del administrativo debe tener una longitud exacta de 10 numeros",
    )
    .custom(async (telefono_persona, { req }) => {
      try {
        const idAdministrativo = req.params.id;

        if (!Types.ObjectId.isValid(idAdministrativo)) return;

        const usuario = await PersonaModel.countDocuments({
          telefono_persona,
          _id: { $ne: idAdministrativo },
        });
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
    .custom(async (descripcion_rol) => {
      try {
        const opcionesPersonas = PersonaModel.schema.path(
          "roles.descripcion_rol",
        ).enumValues;
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
  check("_materia").custom(async (_materia, { req }) => {
    try {
      const isArray = _materia instanceof Array;
      if (!isArray) {
        return Promise.reject("Se debe mandar al menos un array vacio");
      }

      const descripcion_rol = req.body.roles;

      if (_materia.length > 0 && descripcion_rol === "administrativo") {
        return Promise.reject(
          "No se pueden cargar materias a un administrativo",
        );
      }

      if (_materia.length === 0 && descripcion_rol !== "administrativo") {
        return Promise.reject("Se deben enviar materias");
      }

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < _materia.length; i++) {
        if (!Types.ObjectId.isValid(_materia[i])) {
          return Promise.reject(
            "El id enviado no es un id valido de mongo",
          );
        }

        // verificar si existe el id en la db
        /* eslint-disable no-await-in-loop */
        const resultMaterias = await MateriaModel.countDocuments({
          _id: _materia[i],
        });

        if (resultMaterias === 0) {
          return Promise.reject(
            "El id de materia enviado no coincide con los registros del sistema",
          );
        }
      }
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }),
  check("nombre_usuario")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El nombre de usuario de la persona es requerida")
    .custom(async (nombre_usuario, { req }) => {
      const idAdministrativo = req.params.id;

      if (!Types.ObjectId.isValid(idAdministrativo)) return;

      // console.log(idAdministrativo);
      try {
        const administrativoRegistrado = await PersonaModel.countDocuments({
          nombre_usuario,
          _id: { $ne: idAdministrativo },
        });
        // console.log(administrativoRegistrado);
        if (administrativoRegistrado > 0) {
          return Promise.reject(
            "Ya existe un usuario registrado en el sistema!",
          );
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  // check("password_usuario")
  //   .exists()
  //   .not()
  //   .isEmpty()
  //   .withMessage("La contraseña es requerida")
  //   .isLength({ min: 4, max: 20 })
  //   .withMessage("La contraseña debe tener un minimo de 4 caracteres y maximo de 20"),
  verificarCampos,
];

export const deleteAdministrativoMidd = [
  param("id")
    .custom((id) => {
      try {
        // console.log(id);
        if (!Types.ObjectId.isValid(id)) {
          return Promise.reject("El id enviado no es un id valido de mongo");
        }
        return true;
      } catch (error) {
        console.log(error);
      }
    })
    .custom(async (idAdministrativo) => {
      // console.log(idAdministrativo);
      try {
        if (!Types.ObjectId.isValid(idAdministrativo)) return;

        const administrativo = await PersonaModel.countDocuments({
          _id: idAdministrativo,
        });
        // console.log(administrativo);
        if (administrativo === 0) {
          return Promise.reject(
            "El id enviado no pertenece a ningun registro en la bd",
          );
        }
      } catch (error) {
        console.log(error);
      }
    }),
  verificarCampos,
];

export const activarAdministrativoMidd = [
  param("id")
    .custom((id) => {
      // console.log(id);
      if (!Types.ObjectId.isValid(id)) {
        return Promise.reject(
          "El id enviado no es un id valido de mongo",
        );
      }
      return true;
    })
    .custom(async (idAdministrativo) => {
      // console.log(idAdministrativo);
      try {
        if (!Types.ObjectId.isValid(idAdministrativo)) return;

        const administrativo = await PersonaModel.countDocuments({
          _id: idAdministrativo,
        });
        // console.log(administrativo);
        if (administrativo === 0) {
          return Promise.reject(
            "El id enviado no pertenece a ningun registro en la bd",
          );
        }
      } catch (error) {
        console.log(error);
      }
    }),
  verificarCampos,
];
