import { Router } from "express";
import {
  deleteNotasDocente, getMateriasDocente, getNotasDocente, getNotasMateriasDocente, postNotasDocente, putNotasDocente,
} from "../controllers/docentes.controller.js";
import {
  deleteNotasDocenteMidd, getNotasMateriasDocenteMidd, postNotasDocenteMidd, putNotasDocenteMidd,
} from "../middlewares/docentes.middlewares.js";
import { verificarRoles } from "../middlewares/verificarRoles.middlewares.js";
import verificarToken from "../middlewares/verificarToken.js";

const router = Router();

router.get("/materias-docentes", verificarToken, verificarRoles, getMateriasDocente);
router.get("/notas-docentes", verificarToken, verificarRoles, getNotasDocente);
router.get("/notas-materias-docentes/:id", verificarToken, verificarRoles, getNotasMateriasDocenteMidd, getNotasMateriasDocente);

router.post("/cargar-notas", verificarToken, verificarRoles, postNotasDocenteMidd, postNotasDocente);

router.put("/editar-notas/:id", verificarToken, verificarRoles, putNotasDocenteMidd, putNotasDocente);

router.delete("/eliminar-notas/:id", verificarToken, verificarRoles, deleteNotasDocenteMidd, deleteNotasDocente);

// router.get("/avisos-alumnos/:id", verificarToken, verificarRoles, getAvisoAlumnoMidd, getAvisoAlumno);

// router.get("/tipos-docum-alumnos/:id", verificarToken, verificarRoles, getTiposDocumAlumnoMidd, getTiposDocumAlumno);

// router.put("/tipos-docum-alumnos/:id", verificarToken, verificarRoles, putTiposDocumAlumnoMidd, putTiposDocumAlumno);

// router.get("/horarios-alumnos/:id", verificarToken, verificarRoles, getHorariosAlumnoMidd, getHorariosAlumno);

export default router;
