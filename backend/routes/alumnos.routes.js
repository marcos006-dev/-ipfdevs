import { Router } from "express";
import {
  getAvisoAlumno, getHorariosAlumno, getInasistenciaAlumno, getNotaAlumno, getTiposDocumAlumno, putTiposDocumAlumno,
} from "../controllers/alumnos.controllers.js";
import {
  getTiposDocumAlumnoMidd, putTiposDocumAlumnoMidd,
} from "../middlewares/alumnos.middlewares.js";
import { verificarRoles } from "../middlewares/verificarRoles.middlewares.js";
import verificarToken from "../middlewares/verificarToken.js";

const router = Router();

router.get("/inasistencias-alumnos", verificarToken, verificarRoles, getInasistenciaAlumno);

router.get("/notas-alumnos", verificarToken, verificarRoles, getNotaAlumno);

router.get("/avisos-alumnos", verificarToken, verificarRoles, getAvisoAlumno);

router.get("/tipos-docum-alumnos/:id", verificarToken, verificarRoles, getTiposDocumAlumnoMidd, getTiposDocumAlumno);

router.put("/tipos-docum-alumnos/:id", verificarToken, verificarRoles, putTiposDocumAlumnoMidd, putTiposDocumAlumno);

router.get("/horarios-alumnos", verificarToken, verificarRoles, getHorariosAlumno);
// router.get("/alumnos/:id", verificarToken, verificarRoles, getAdministrativoMidd, getAdministrativo);
// router.post("/administrativos", verificarToken, verificarRoles, postAdministrativoMidd, postAdministrativo);
// router.put("/administrativos/:id", verificarToken, verificarRoles, putAdministrativoMidd, putAdministrativo);
// router.patch("/administrativos/:id", verificarToken, verificarRoles, activarAdministrativoMidd, activarAdministrativo);
// router.delete("/administrativos/:id", verificarToken, verificarRoles, deleteAdministrativoMidd, deleteAdministrativo);

export default router;
