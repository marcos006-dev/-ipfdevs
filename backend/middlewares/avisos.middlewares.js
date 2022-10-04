import { check, param } from "express-validator";
import { Types } from "mongoose";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { AvisoModel } from "../models/Aviso.model.js";
import { MateriaModel } from "../models/Materia.model.js";

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

          const aviso = await MateriaModel.countDocuments({ _id: idAviso });
          if (aviso === 0) {
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
          console.log(error);
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
  // check("_materia")
  //   .custom((id) => {
  //     if (!Types.ObjectId.isValid(id)) {
  //       return Promise.reject(
  //         "El id enviado no es un id valido de mongo",
  //       );
  //     }
  //     return true;
  //   })
  //   .custom(
  //     async (idAviso) => {
  //       try {
  //         if (!Types.ObjectId.isValid(idAviso)) return;

  //         const aviso = await MateriaModel.countDocuments({ _id: idAviso });
  //         if (aviso === 0) {
  //           return Promise.reject(
  //             "El id enviado no pertenece a ningun registro en la bd",
  //           );
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     },
  //   ),
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
