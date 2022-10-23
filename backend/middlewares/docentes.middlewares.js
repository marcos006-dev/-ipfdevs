/* eslint no-underscore-dangle: 0 */

import { check, param } from "express-validator";
import { Types } from "mongoose";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { MateriaModel } from "../models/Materia.model.js";
import { NotaModel } from "../models/Nota.model.js";
import { PersonaModel } from "../models/Persona.model.js";

export const getNotasMateriasDocenteMidd = [
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

          // verificar que las notas no esten con el estado publicado
          if (!Object.prototype.hasOwnProperty.call(materiaTipoNotaParsed, "detalle")) {
            const resultNotas = await NotaModel.count({ _materia: materiaTipoNotaParsed._materia, tipo_nota: materiaTipoNotaParsed.tipo_nota, estado_nota: "publicado" });

            if (resultNotas > 0) {
              return Promise.reject(
                "Los parametros enviados coinciden con registros de notas ya publicadas",
              );
            }
          }
        } catch (error) {
        //   console.log(error);
        }
      },
    ),
  verificarCampos,
];

export const putNotasDocenteMidd = [
  check("dataMateriaPut")
    .custom(async (dataMateriaPut) => {
      try {
        // eslint-disable-next-line no-restricted-syntax
        for (const materiaItem of dataMateriaPut) {
          delete materiaItem.datosAlumno;

          if (!Types.ObjectId.isValid(materiaItem._persona)) {
            return Promise.reject(
              "El id enviado no es un id valido de mongo",
            );
          }

          // eslint-disable-next-line no-await-in-loop
          const persona = await PersonaModel.countDocuments({ _id: materiaItem._persona });
          // console.log(materia);
          if (persona === 0) {
            return Promise.reject(
              "El id enviado no pertenece a ningun registro en la bd",
            );
          }

          if (!Types.ObjectId.isValid(materiaItem._materia)) {
            return Promise.reject(
              "El id enviado no es un id valido de mongo",
            );
          }

          // eslint-disable-next-line no-await-in-loop
          const materia = await MateriaModel.countDocuments({ _id: materiaItem._materia });
          // console.log(materia);
          if (materia === 0) {
            return Promise.reject(
              "El id enviado no pertenece a ningun registro en la bd",
            );
          }

          if (materiaItem.descripcion_nota < 0) {
            return Promise.reject(
              "La nota enviada debe ser mayor o igual a 0",
            );
          }

          if (materiaItem.descripcion_nota > 10) {
            return Promise.reject(
              "La nota enviada debe ser menor o igual a 10",
            );
          }

          const opcionesNotas = NotaModel.schema.path("tipo_nota").enumValues;
          // console.log(opcionesNotas);
          if (!opcionesNotas.includes((materiaItem.tipo_nota))) {
            return Promise.reject(
              "El tipo de nota enviado no coincide los permitidos por el sistema",
            );
          }
        }
      } catch (error) {
        // console.log(error);
        return Promise.reject(
          "Se deben enviar un id valido de mongo",
        );
      }
    }),
  verificarCampos,
];

// export const deleteNotasDocenteMidd = [
//   param("id")
//     .custom((id) => {
//       if (!Types.ObjectId.isValid(id)) {
//         return Promise.reject(
//           "El id enviado no es un id valido de mongo",
//         );
//       }
//       return true;
//     })
//     .custom(
//       async (idPersona) => {
//         try {
//           if (!Types.ObjectId.isValid(idPersona)) return;

//           const nota = await NotaModel.findOne({ _id: idPersona });
//           //   console.log(nota);
//           if (nota.length === 0) {
//             return Promise.reject(
//               "El id enviado no pertenece a ningun registro en la bd",
//             );
//           }
//           //   console.log(nota?.estado_nota);
//           if (nota?.estado_nota === "publicado") {
//             return Promise.reject(
//               "No se puede borrar la nota porque ya esta publicado",
//             );
//           }
//         } catch (error) {
//           //   console.log(error);
//         }
//       },
//     ),
//   verificarCampos,
// ];
