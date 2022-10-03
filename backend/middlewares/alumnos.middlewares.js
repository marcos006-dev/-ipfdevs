import { check, param } from "express-validator";
import { Types } from "mongoose";
import { validarFecha } from "../helpers/validarFechas.js";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { PersonaModel } from "../models/Persona.model.js";

export const getAlumnosMidd = [verificarCampos];
