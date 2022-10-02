import { check, param } from "express-validator";
import { Types } from "mongoose";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { MateriaModel } from "../models/Materia.model.js";
import { NotaModel } from "../models/Nota.model.js";
import { PersonaModel } from "../models/Persona.model.js";

export const getNotasMidd = [verificarCampos];

export const getNotaMidd = [
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

          const nota = await NotaModel.countDocuments({ _id: idNota });
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

export const postNotaMidd = [
  check("_materia")
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
      async (idMateria) => {
        // console.log(idMateria);
        try {
          if (!Types.ObjectId.isValid(idMateria)) return;

          const materia = await MateriaModel.countDocuments({ _id: idMateria });
          // console.log(materia);
          if (materia === 0) {
            return Promise.reject(
              "El id enviado no pertenece a ningun registro en la bd",
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    ),
  check("_persona")
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
      async (idPersona) => {
        // console.log(idPersona);
        try {
          if (!Types.ObjectId.isValid(idPersona)) return;

          const persona = await PersonaModel.findOne({ _id: idPersona });

          if (!persona) {
            return Promise.reject(
              "El id enviado no pertenece a ningun registro en la bd",
            );
          }
          if (persona.roles.descripcion_rol !== "alumno") {
            return Promise.reject(
              "El id enviado no pertenece a ningun alumno en la bd",
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    ),
  check("descripcion_nota")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La nota es requerida")
    .isInt({ min: 1, max: 10 })
    .withMessage("La nota debe estar comprendida entre 1 y 10"),
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
        return Promise.reject(error);
      }
    }),
  verificarCampos,
];

export const putNotaMidd = [
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
      async (idNota) => {
        try {
          if (!Types.ObjectId.isValid(idNota)) return;

          const nota = await NotaModel.countDocuments({ _id: idNota });
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
  check("_materia")
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
      async (idMateria) => {
        // console.log(idMateria);
        try {
          if (!Types.ObjectId.isValid(idMateria)) return;

          const materia = await MateriaModel.countDocuments({ _id: idMateria });
          // console.log(materia);
          if (materia === 0) {
            return Promise.reject(
              "El id enviado no pertenece a ningun registro en la bd",
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    ),
  check("_persona")
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
      async (idPersona) => {
        // console.log(idPersona);
        try {
          if (!Types.ObjectId.isValid(idPersona)) return;

          const persona = await PersonaModel.findOne({ _id: idPersona });

          if (!persona) {
            return Promise.reject(
              "El id enviado no pertenece a ningun registro en la bd",
            );
          }
          if (persona.roles.descripcion_rol !== "alumno") {
            return Promise.reject(
              "El id enviado no pertenece a ningun alumno en la bd",
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    ),
  check("descripcion_nota")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La nota es requerida")
    .isInt({ min: 1, max: 10 })
    .withMessage("La nota debe estar comprendida entre 1 y 10"),
  check("tipo_nota")
    .custom(async (tipo_nota, { req }) => {
      try {
        const idNota = req.params.id;

        const opcionesNotas = NotaModel.schema.path("tipo_nota").enumValues;

        // console.log(opcionesNotas);

        if (!opcionesNotas.includes(tipo_nota)) {
          return Promise.reject(
            "El tipo de nota enviado no coincide los permitidos por el sistema",
          );
        }

        const nota = await NotaModel.countDocuments({ tipo_nota, _id: { $ne: idNota } });

        // console.log(nota);

        if (nota > 0) {
          return Promise.reject(
            "La nota ingresada ya posee un registro duplicado en la bd",
          );
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }),

  verificarCampos,
];

export const deleteNotaMidd = [

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

          const nota = await NotaModel.countDocuments({ _id: idNota });
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
