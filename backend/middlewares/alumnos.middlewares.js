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

export const getTiposDocumAlumnoMidd = [
  param("id")
    .custom(async (id) => {
      if (!Types.ObjectId.isValid(id)) {
        return Promise.reject(
          "El id enviado no es un id valido de mongo",
        );
      }

      try {
        if (!Types.ObjectId.isValid(id)) return;

        const alumno = await PersonaModel.countDocuments({ _id: id });
        // console.log(alumno);
        if (alumno === 0) {
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

export const putTiposDocumAlumnoMidd = [
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

        const alumno = await PersonaModel.countDocuments({ _id: id });
        if (alumno === 0) {
          return Promise.reject(
            "El id enviado no pertenece a ningun registro en la bd",
          );
        }
      } catch (error) {
        console.log(error);
      }
    }),
  check("documentos")
    .custom(async (documentos) => {
      // console.log(documentos);
      try {
        // obtener enum values documentos
        const tiposDocumentos = await PersonaModel.schema.path("documentaciones.0.tipo_documento").enumValues;

        if (documentos.length !== tiposDocumentos.length) {
          return Promise.reject(
            "Se deben enviar la misma cantidad de tipos de documentos asignados",
          );
        }
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < documentos.length; i++) {
          if (!tiposDocumentos.includes(documentos[i].tipo_documento)) {
            return Promise.reject(
              `La propiedad ${documentos[i].tipo_documento} no esta permitido por el sistema`,
            );
          }
        }
      } catch (error) {
        return Promise.reject(
          "Se deben enviar un array con ids validos de materias",
        );
      }
    }),
  verificarCampos,
];

export const getHorariosAlumnoMidd = [
  param("id")
    .custom(async (id) => {
      if (!Types.ObjectId.isValid(id)) {
        return Promise.reject(
          "El id enviado no es un id valido de mongo",
        );
      }

      try {
        if (!Types.ObjectId.isValid(id)) return;

        const alumno = await PersonaModel.countDocuments({ _id: id });
        // console.log(alumno);
        if (alumno === 0) {
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
