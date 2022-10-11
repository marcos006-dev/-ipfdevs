import { Router } from "express";
import {
  activarMateria,
  deleteMateria,
  getMateria, getMaterias, postMateria, putMateria,
  getMateriasCarrera,
  getCarreras,
} from "../controllers/materias.controller.js";
import {
  activarMateriaMidd,
  deleteMateriaMidd,
  getMateriaMidd, getMateriasMidd, postMateriaMidd, putMateriaMidd,
  getMateriasCarrerasMidd,
  getCarrerasMidd,
} from "../middlewares/materias.middlewares.js";

import { verificarRoles } from "../middlewares/verificarRoles.middlewares.js";
import verificarToken from "../middlewares/verificarToken.js";

const router = Router();

router.get("/materias", verificarToken, verificarRoles, getMateriasMidd, getMaterias);
router.get("/carreras", verificarToken, verificarRoles, getCarrerasMidd, getCarreras);
router.get("/materias-carrera/:carrera", verificarToken, verificarRoles, getMateriasCarrerasMidd, getMateriasCarrera);
router.get("/materias/:id", verificarToken, verificarRoles, getMateriaMidd, getMateria);
router.post("/materias", verificarToken, verificarRoles, postMateriaMidd, postMateria);
router.put("/materias/:id", verificarToken, verificarRoles, putMateriaMidd, putMateria);
router.patch("/materias/:id", verificarToken, verificarRoles, activarMateriaMidd, activarMateria);
router.delete("/materias/:id", verificarToken, verificarRoles, deleteMateriaMidd, deleteMateria);

export default router;
