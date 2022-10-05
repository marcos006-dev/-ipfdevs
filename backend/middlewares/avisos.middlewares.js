import { check, param } from "express-validator";
import { Types } from "mongoose";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { AvisoModel } from "../models/Aviso.model.js";
import { MateriaModel } from "../models/Materia.model.js";
import { PersonaModel } from "../models/Persona.model.js";

export const getAvisosMidd = [verificarCampos];

export const getAvisoMidd = [
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
    .custom(
      async (idAviso) => {
        // console.log(idAviso);
        try {
          if (!Types.ObjectId.isValid(idAviso)) return;

          const nota = await AvisoModel.countDocuments({ _id: idAviso });
          //   console.log(nota);
          if (nota === 0) {
            return Promise.reject(
              "El id enviado no pertenece a ningun registro en la bd",
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    ),
  verificarCampos,
];
export const postAvisoMidd = [

  check("descripcion_aviso")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La descripcion es requerida")
    .isLength({ min: 10 })
    .withMessage("El aviso debe ser mayor a 10 caracteres"),
  check("_materia")
    .custom(async (idMateria, { req }) => {
      try {
        // console.log("arrays de ids materiass", idMateria);
        const isArray = (idMateria instanceof Array);

        // eslint-disable-next-line no-underscore-dangle
        const id = req.decoded._id;

        // obtener rol usuario

        const { roles } = await PersonaModel.findById(id).select("roles");

        // console.log(roles);
        // si es docente se debe solicitar que se envie la materia

        if (roles.descripcion_rol === "docente") {
          if (!isArray) {
            return Promise.reject(
              "Se deben enviar ids validos de materias",
            );
          }

          if (!Types.ObjectId.isValid(idMateria)) {
            return Promise.reject(
              "El id enviado no es un id valido de mongo",
            );
          }

          // y la materia debe existir en la db

          // console.log(`ID Materia: ${idMateria}`);
          const materia = await MateriaModel.countDocuments({ _id: idMateria });
          // console.log(materia);
          if (materia === 0) {
            return Promise.reject(
              "El id enviado no pertenece a ningun registro de materia en la bd",
            );
          }
        } else if (!isArray) {
          return Promise.reject(
            "Se deben enviar un array vacio",
          );
        }
      } catch (error) {
        return Promise.reject(
          "Se deben enviar un array con ids validos de materias",
        );
      }
      // return true;
    }),
  verificarCampos,
];

export const putAvisoMidd = [

  param("id")
    .custom((id) => {
      if (!Types.ObjectId.isValid(id)) {
        return Promise.reject(
          "El id enviado no es un id valido de mongo",
        );
      }
      return true;
    })
    .custom(
      async (idAviso) => {
        try {
          if (!Types.ObjectId.isValid(idAviso)) return;

          const aviso = await AvisoModel.countDocuments({ _id: idAviso });
          if (aviso === 0) {
            return Promise.reject(
              "El id enviado no pertenece a ningun registro en la bd",
            );
          }
        } catch (error) {
          return Promise.reject(
            "Se deben enviar un array con ids validos de materias",
          );
        }
      },
    ),
  check("descripcion_aviso")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La descripcion es requerida")
    .isLength({ min: 10 })
    .withMessage("El aviso debe ser mayor a 10 caracteres"),
  check("_materia")
    .custom(async (idMateria, { req }) => {
      try {
        // console.log("arrays de ids materiass", idMateria);
        const isArray = (idMateria instanceof Array);

        // eslint-disable-next-line no-underscore-dangle
        const id = req.decoded._id;

        // obtener rol usuario

        const { roles } = await PersonaModel.findById(id).select("roles");

        console.log(roles);
        // si es docente se debe solicitar que se envie la materia

        if (roles.descripcion_rol === "docente") {
          if (!isArray) {
            return Promise.reject(
              "Se deben enviar ids validos de materias",
            );
          }

          if (!Types.ObjectId.isValid(idMateria)) {
            return Promise.reject(
              "El id enviado no es un id valido de mongo",
            );
          }

          // y la materia debe existir en la db

          // console.log(`ID Materia: ${idMateria}`);
          const materia = await MateriaModel.countDocuments({ _id: idMateria });
          // console.log(materia);
          if (materia === 0) {
            return Promise.reject(
              "El id enviado no pertenece a ningun registro de materia en la bd",
            );
          }
        } else if (!isArray) {
          return Promise.reject(
            "Se deben enviar un array vacio",
          );
        }
      } catch (error) {
        return Promise.reject(
          "Se deben enviar un array con ids validos de materias",
        );
      }
    }),
  verificarCampos,
];
export const deleteAvisoMidd = [

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
    .custom(
      async (idNota) => {
        // console.log(idNota);
        try {
          if (!Types.ObjectId.isValid(idNota)) return;

          const nota = await AvisoModel.countDocuments({ _id: idNota });
          // console.log(nota);
          if (nota === 0) {
            return Promise.reject(
              "El id enviado no pertenece a ningun registro en la bd",
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    ),
  verificarCampos,
];
