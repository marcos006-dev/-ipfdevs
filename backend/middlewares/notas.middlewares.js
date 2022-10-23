/* eslint no-underscore-dangle: 0 */

import { param } from "express-validator";
import { Types } from "mongoose";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { MateriaModel } from "../models/Materia.model.js";
import { NotaModel } from "../models/Nota.model.js";

export const putNotaMidd = [
  param("id")
    .custom(
      async (materiaTipoNota) => {
        try {
          const materiaTipoNotaParsed = JSON.parse(materiaTipoNota);
          // verificar si es un objeto el parametro enviado
          if (typeof materiaTipoNotaParsed !== "object") {
            return Promise.reject(
              "No se a enviado un objeto por favor verifique",
            );
          }

          // verificar si existe la propiedad de materia

          if (!Object.prototype.hasOwnProperty.call(materiaTipoNotaParsed, "_materia")) {
            return Promise.reject(
              "No se a enviado la propiedad de _materia",
            );
          }

          // verificar si existe la propiedad de tipo nota

          if (!Object.prototype.hasOwnProperty.call(materiaTipoNotaParsed, "tipo_nota")) {
            return Promise.reject(
              "No se a enviado la propiedad de tipo_nota",
            );
          }

          // verificar si el valor enviado en _materia es un id valido de mongo y esta en la bd

          if (!Types.ObjectId.isValid(materiaTipoNotaParsed._materia)) {
            return Promise.reject(
              "El id enviado no es un id valido de mongo",
            );
          }

          const materia = await MateriaModel.countDocuments({ _id: materiaTipoNotaParsed._materia });
          // console.log(materia);
          if (materia === 0) {
            return Promise.reject(
              "El id enviado no pertenece a ningun registro en la bd",
            );
          }

          // verificar si existe el valor enviado en tipo_nota
          const opcionesNotas = NotaModel.schema.path("tipo_nota").enumValues;
          // console.log(opcionesNotas);
          if (!opcionesNotas.includes(materiaTipoNotaParsed.tipo_nota)) {
            return Promise.reject(
              "El tipo de nota enviado no coincide los permitidos por el sistema",
            );
          }

          // verificar si existe el valor enviado en estado_nota
          const opcionesEstadosNotas = NotaModel.schema.path("estado_nota").enumValues;
          // console.log(opcionesEstadosNotas);
          if (!opcionesEstadosNotas.includes(materiaTipoNotaParsed.estado_nota)) {
            return Promise.reject(
              "El estado de nota enviado no coincide los permitidos por el sistema",
            );
          }
        } catch (error) {
        //   console.log(error);
        }
      },
    ),
  verificarCampos,
];
