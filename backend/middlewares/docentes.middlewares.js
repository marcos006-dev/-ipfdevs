/* eslint no-underscore-dangle: 0 */

import { check, param } from "express-validator";
import { Types } from "mongoose";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { MateriaModel } from "../models/Materia.model.js";
import { NotaModel } from "../models/Nota.model.js";
import { PersonaModel } from "../models/Persona.model.js";

export const getMateriasDocenteMidd = [
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
      async (idPersona) => {
        try {
          if (!Types.ObjectId.isValid(idPersona)) return;

          const alumno = await PersonaModel.find({ _id: idPersona });
          //   console.log(alumno);
          if (alumno.length === 0) {
            return Promise.reject(
              "El id enviado no pertenece a ningun registro en la bd",
            );
          }

          if (!alumno[0]?.activo) {
            return Promise.reject(
              "El id enviado no esta activo",
            );
          }

          if (!alumno[0]?._materia.length === 0) {
            return Promise.reject(
              "El id enviado no posee materias a su cargo",
            );
          }
        } catch (error) {
        //   console.log(error);
        }
      },
    ),
  verificarCampos,
];

export const postNotasDocenteMidd = [

  check("_materia")
    .custom(async (_materia, { req }) => {
      try {
        if (!Types.ObjectId.isValid(_materia)) {
          return Promise.reject(
            "El id enviado no es un id valido de mongo",
          );
        }

        const materia = await MateriaModel.countDocuments({ _id: _materia });
        // console.log(materia);
        if (materia === 0) {
          return Promise.reject(
            "El id enviado no pertenece a ningun registro en la bd",
          );
        }

        const idAlumno = req.body._persona;
        const notaRepetida = await NotaModel.countDocuments({ _materia, _persona: idAlumno });
        if (notaRepetida > 0) {
          return Promise.reject(
            "Ya hay una nota guardada",
          );
        }
      } catch (error) {
        // console.log(error);
        return Promise.reject(
          "Se deben enviar un id valido de mongo",
        );
      }
    }),
  check("_persona")
    .custom(async (_persona) => {
      try {
        if (!Types.ObjectId.isValid(_persona)) {
          return Promise.reject(
            "El id enviado no es un id valido de mongo",
          );
        }

        const persona = await PersonaModel.findOne({ _id: _persona });
        if (persona.length === 0) {
          return Promise.reject(
            "El id enviado no pertenece a ningun registro en la bd",
          );
        }
        if (persona.roles.descripcion_rol !== "alumno") {
          return Promise.reject(
            "El id enviado no pertenece a ningun registro de alumno en la bd",
          );
        }
      } catch (error) {
        // console.log(error);
        return Promise.reject(
          "Se deben enviar un id valido de mongo",
        );
      }
    }),
  check("tipo_nota")
    .custom(async (tipo_nota) => {
      try {
        const opcionesNotas = NotaModel.schema.path("tipo_nota").enumValues;
        // console.log(opcionesNotas);
        if (!opcionesNotas.includes(tipo_nota)) {
          return Promise.reject(
            "El tipo de nota enviado no coincide los permitidos por el sistema",
          );
        }
      } catch (error) {
        // console.log(error);
        return Promise.reject(
          "Se deben enviar un id valido de mongo",
        );
      }
    }),
  check("descripcion_nota")
    .isInt({ min: 1, max: 10 })
    .withMessage("La descripcion de la nota debe de estar entre los numeros de 1 y 10"),
  verificarCampos,
];

export const putNotasDocenteMidd = [
  param("id")
    .custom(async (id) => {
    // console.log(id);
      if (!Types.ObjectId.isValid(id)) {
        return Promise.reject(
          "El id enviado no es un id valido de mongo",
        );
      }

      try {
        if (!Types.ObjectId.isValid(id)) return;

        const nota = await NotaModel.findOne({ _id: id });
        // console.log(nota);
        if (nota?.length === 0) {
          return Promise.reject(
            "El id enviado no pertenece a ningun registro en la bd",
          );
        }

        if (nota?.estado_nota !== "en revision") {
          return Promise.reject(
            "No se puede editar la nota porque ya esta publicada",
          );
        }
      } catch (error) {
        // console.log(error);
      }
    }),
  check("_materia")
    .custom(async (_materia, { req }) => {
      try {
        if (!Types.ObjectId.isValid(_materia)) {
          return Promise.reject(
            "El id enviado no es un id valido de mongo",
          );
        }

        const materia = await MateriaModel.countDocuments({ _id: _materia });
        // console.log(materia);
        if (materia === 0) {
          return Promise.reject(
            "El id enviado no pertenece a ningun registro en la bd",
          );
        }

        const idAlumno = req.body._persona;
        const { id } = req.params;

        const notaRepetida = await NotaModel.countDocuments({ _materia, _persona: idAlumno, _id: { $ne: id } });
        if (notaRepetida > 0) {
          return Promise.reject(
            "Ya hay una nota guardada",
          );
        }
      } catch (error) {
        // console.log(error);
        return Promise.reject(
          "Se deben enviar un id valido de mongo",
        );
      }
    }),
  check("_persona")
    .custom(async (_persona) => {
      try {
        if (!Types.ObjectId.isValid(_persona)) {
          return Promise.reject(
            "El id enviado no es un id valido de mongo",
          );
        }

        const persona = await PersonaModel.findOne({ _id: _persona });
        if (persona.length === 0) {
          return Promise.reject(
            "El id enviado no pertenece a ningun registro en la bd",
          );
        }
        if (persona.roles.descripcion_rol !== "alumno") {
          return Promise.reject(
            "El id enviado no pertenece a ningun registro de alumno en la bd",
          );
        }
      } catch (error) {
        // console.log(error);
        return Promise.reject(
          "Se deben enviar un id valido de mongo",
        );
      }
    }),
  check("tipo_nota")
    .custom(async (tipo_nota) => {
      try {
        const opcionesNotas = NotaModel.schema.path("tipo_nota").enumValues;
        // console.log(opcionesNotas);
        if (!opcionesNotas.includes(tipo_nota)) {
          return Promise.reject(
            "El tipo de nota enviado no coincide los permitidos por el sistema",
          );
        }
      } catch (error) {
        // console.log(error);
        return Promise.reject(
          "Se deben enviar un id valido de mongo",
        );
      }
    }),
  check("descripcion_nota")
    .isInt({ min: 1, max: 10 })
    .withMessage("La descripcion de la nota debe de estar entre los numeros de 1 y 10"),
  verificarCampos,
];

export const deleteNotasDocenteMidd = [
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
      async (idPersona) => {
        try {
          if (!Types.ObjectId.isValid(idPersona)) return;

          const nota = await NotaModel.findOne({ _id: idPersona });
          //   console.log(nota);
          if (nota.length === 0) {
            return Promise.reject(
              "El id enviado no pertenece a ningun registro en la bd",
            );
          }
          //   console.log(nota?.estado_nota);
          if (nota?.estado_nota === "publicado") {
            return Promise.reject(
              "No se puede borrar la nota porque ya esta publicado",
            );
          }
        } catch (error) {
          //   console.log(error);
        }
      },
    ),
  verificarCampos,
];
