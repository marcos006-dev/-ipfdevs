import { check } from "express-validator";
import { verificarCampos } from "../helpers/verificarCampos.js";

export const postAuthLoginMidd = [
  check("nombre_usuario")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El nombre de usuario es requerido"),
  check("password_usuario")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La contraseña es requerida"),
  verificarCampos,
];
// export const getDataUserMidd = [
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
//         // console.log(idPersona);
//         try {
//           if (!Types.ObjectId.isValid(idPersona)) return;

//           const alumno = await PersonaModel.countDocuments({ _id: idPersona });
//           // console.log(alumno);
//           if (alumno === 0) {
//             return Promise.reject(
//               "El id enviado no pertenece a ningun registro en la bd",
//             );
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       },
//     ),
//   verificarCampos,
// ];
