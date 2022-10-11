import { check, param } from "express-validator";
import { Types } from "mongoose";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { MateriaModel } from "../models/Materia.model.js";

export const getMateriasMidd = [verificarCampos];
export const getCarrerasMidd = [verificarCampos];
export const getMateriasCarrerasMidd = [
  param("carrera")
    .custom((carrera) => {
      // console.log(id);
      const carreras = MateriaModel.schema.path("nombre_carrera").enumValues;
      if (!carreras.includes(carrera)) {
        return Promise.reject(
          "La carrera enviada no existe en la bd",
        );
      }
      return true;
    }),
  verificarCampos,
];
export const getMateriaMidd = [
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
      async (idMateria) => {
        // console.log(idMateria);
        try {
          if (!Types.ObjectId.isValid(idMateria)) return;

          const materia = await MateriaModel.countDocuments({ _id: idMateria });
          //   console.log(materia);
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
  verificarCampos,
];

export const postMateriaMidd = [
  check("descripcion_materia")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La descripcion de la materia es requerida")
    .isLength({ min: 4 })
    .withMessage("La descripcion de la materia debe ser mayor a 4 caracteres")
    .custom(async (descripcion_materia) => {
      try {
        const materia = await MateriaModel.countDocuments({ descripcion_materia });
        // console.log(materia);
        if (materia > 0) {
          return Promise.reject(
            "La descripcion de la materia ingresada ya se encuentra registrado en la bd",
          );
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  check("nombre_carrera")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El nombre de carrera es requerido")
    .custom(async (nombre_carrera) => {
      try {
        const opcionesCarreras = MateriaModel.schema.path("nombre_carrera").enumValues;
        if (!opcionesCarreras.includes(nombre_carrera)) {
          return Promise.reject(
            "El nombre de carrera enviado no coincide con los permitidos por el sistema",
          );
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }),

  check("horarios")
    .custom(async (horarios) => {
      if (horarios.length === 0) {
        return Promise.reject(
          "Se deben enviar los horarios",
        );
      }
    })
    .custom(async (horarios) => {
      try {
        horarios.forEach((horario) => {
          if (!Object.prototype.hasOwnProperty.call(horario, "dia_semana")) {
            throw new Error("Se debe enviar los datos del dia de la semana");
          }

          if (!Object.prototype.hasOwnProperty.call(horario, "horario_semana")) {
            throw new Error("Se debe enviar los datos del horario de la semana");
          }
        });

        horarios.forEach(({ dia_semana, horario_semana }) => {
          const opcionesDiaSemana = MateriaModel.schema.path("horarios.0.dia_semana").enumValues;

          if (!opcionesDiaSemana.includes(dia_semana)) {
            throw new Error("El dia semana enviado no se encuentra en el sistema");
          }

          const opcionesHorarios = MateriaModel.schema.path("horarios.0.horario_semana").enumValues;

          if (!opcionesHorarios.includes(horario_semana)) {
            throw new Error("El horario enviado no se encuentra en el sistema");
          }
        });
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  check("anio_lectivo")
    .custom(async (anio_lectivo) => {
      try {
        anio_lectivo.forEach((anio) => {
          if (!Object.prototype.hasOwnProperty.call(anio, "descripcion_anio")) {
            throw new Error("Se debe enviar un anio lectivo");
          }
        });
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  verificarCampos,
];

export const putMateriaMidd = [
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
      async (idMateria) => {
        try {
          if (!Types.ObjectId.isValid(idMateria)) return;

          const materia = await MateriaModel.countDocuments({ _id: idMateria });
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
  check("descripcion_materia")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La descripcion de la materia es requerida")
    .isLength({ min: 4 })
    .withMessage("La descripcion de la materia debe ser mayor a 4 caracteres")
    .custom(async (descripcion_materia, { req }) => {
      try {
        const idMateria = req.params.id;

        const materia = await MateriaModel.countDocuments({ descripcion_materia, _id: { $ne: idMateria } });

        if (materia > 0) {
          return Promise.reject(
            "La descripcion de la materia ingresada ya se encuentra registrado en la bd",
          );
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  check("nombre_carrera")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El nombre de carrera es requerido")
    .custom(async (nombre_carrera) => {
      try {
        const opcionesCarreras = MateriaModel.schema.path("nombre_carrera").enumValues;
        if (!opcionesCarreras.includes(nombre_carrera)) {
          return Promise.reject(
            "El nombre de carrera enviado no coincide con los permitidos por el sistema",
          );
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }),

  check("horarios")
    .custom(async (horarios) => {
      if (horarios.length === 0) {
        return Promise.reject(
          "Se deben enviar los horarios",
        );
      }
    })
    .custom(async (horarios) => {
      try {
        horarios.forEach((horario) => {
          if (!Object.prototype.hasOwnProperty.call(horario, "dia_semana")) {
            throw new Error("Se debe enviar los datos del dia de la semana");
          }

          if (!Object.prototype.hasOwnProperty.call(horario, "horario_semana")) {
            throw new Error("Se debe enviar los datos del horario de la semana");
          }
        });

        horarios.forEach(({ dia_semana, horario_semana }) => {
          const opcionesDiaSemana = MateriaModel.schema.path("horarios.0.dia_semana").enumValues;

          if (!opcionesDiaSemana.includes(dia_semana)) {
            throw new Error("El dia semana enviado no se encuentra en el sistema");
          }

          const opcionesHorarios = MateriaModel.schema.path("horarios.0.horario_semana").enumValues;

          if (!opcionesHorarios.includes(horario_semana)) {
            throw new Error("El horario enviado no se encuentra en el sistema");
          }
        });
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  check("anio_lectivo")
    .custom(async (anio_lectivo) => {
      try {
        anio_lectivo.forEach((anio) => {
          if (!Object.prototype.hasOwnProperty.call(anio, "descripcion_anio")) {
            throw new Error("Se debe enviar un anio lectivo");
          }
        });
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  verificarCampos,
];

export const deleteMateriaMidd = [

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
  verificarCampos,
];

export const activarMateriaMidd = [

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
  verificarCampos,
];
