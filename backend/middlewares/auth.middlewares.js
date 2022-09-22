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
