import { Router } from "express";
import { getAvisoAlumno, getInasistenciaAlumno, getNotaAlumno } from "../controllers/alumnos.controllers.js";
import { getAvisoAlumnoMidd, getInasistenciaAlumnoMidd, getNotaAlumnoMidd } from "../middlewares/alumnos.middlewares.js";
import { verificarRoles } from "../middlewares/verificarRoles.middlewares.js";
import verificarToken from "../middlewares/verificarToken.js";

const router = Router();

router.get("/inasistencias-alumnos/:id", verificarToken, verificarRoles, getInasistenciaAlumnoMidd, getInasistenciaAlumno);

router.get("/notas-alumnos/:id", verificarToken, verificarRoles, getNotaAlumnoMidd, getNotaAlumno);
router.get("/avisos-alumnos/:id", verificarToken, verificarRoles, getAvisoAlumno);
// router.get("/alumnos/:id", verificarToken, verificarRoles, getAdministrativoMidd, getAdministrativo);
// router.post("/administrativos", verificarToken, verificarRoles, postAdministrativoMidd, postAdministrativo);
// router.put("/administrativos/:id", verificarToken, verificarRoles, putAdministrativoMidd, putAdministrativo);
// router.patch("/administrativos/:id", verificarToken, verificarRoles, activarAdministrativoMidd, activarAdministrativo);
// router.delete("/administrativos/:id", verificarToken, verificarRoles, deleteAdministrativoMidd, deleteAdministrativo);

export default router;
