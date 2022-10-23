import { Router } from "express";
import {
  deleteNotasDocente, getMateriasDocente, getNotasDocente, getNotasMateriasDocente, putNotasDocente,
} from "../controllers/docentes.controller.js";
import { getNotasMateriasDocenteMidd, putNotasDocenteMidd } from "../middlewares/docentes.middlewares.js";
import { verificarRoles } from "../middlewares/verificarRoles.middlewares.js";
import verificarToken from "../middlewares/verificarToken.js";

const router = Router();

router.get("/materias-docentes", verificarToken, verificarRoles, getMateriasDocente);
router.get("/notas-docentes", verificarToken, verificarRoles, getNotasDocente);
router.get("/notas-materias-docentes/:id", verificarToken, verificarRoles, getNotasMateriasDocenteMidd, getNotasMateriasDocente);
router.put("/editar-notas", verificarToken, verificarRoles, putNotasDocenteMidd, putNotasDocente); router.delete("/eliminar-notas/:id", verificarToken, verificarRoles, deleteNotasDocente);

export default router;
