import { check, param } from "express-validator";
import { Types } from "mongoose";
// import { validarFecha } from "../helpers/validarFechas.js";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { PersonaModel } from "../models/Persona.model.js";

export const getInasistenciaAlumnoMidd = [
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
      async (idPersona) => {
        // console.log(idPersona);
        try {
          if (!Types.ObjectId.isValid(idPersona)) return;

          const alumno = await PersonaModel.countDocuments({ _id: idPersona });
          // console.log(alumno);
          if (alumno === 0) {
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

export const getNotaAlumnoMidd = [
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
      async (idPersona) => {
        // console.log(idPersona);
        try {
          if (!Types.ObjectId.isValid(idPersona)) return;

          const alumno = await PersonaModel.countDocuments({ _id: idPersona });
          // console.log(alumno);
          if (alumno === 0) {
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

export const getAvisoAlumnoMidd = [
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
      async (idPersona) => {
        // console.log(idPersona);
        try {
          if (!Types.ObjectId.isValid(idPersona)) return;

          const alumno = await PersonaModel.countDocuments({ _id: idPersona });
          // console.log(alumno);
          if (alumno === 0) {
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
