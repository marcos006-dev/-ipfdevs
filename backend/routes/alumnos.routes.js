import { Router } from "express";
import { getAlumnos } from "../controllers/alumnos.middlewares.js";
import { getAlumnosMidd } from "../middlewares/alumnos.middlewares.js";
import { verificarRoles } from "../middlewares/verificarRoles.middlewares.js";
import verificarToken from "../middlewares/verificarToken.js";

const router = Router();

router.get("/alumnos", verificarToken, verificarRoles, getAlumnosMidd, getAlumnos);
// router.get("/alumnos/:id", verificarToken, verificarRoles, getAdministrativoMidd, getAdministrativo);
// router.post("/administrativos", verificarToken, verificarRoles, postAdministrativoMidd, postAdministrativo);
// router.put("/administrativos/:id", verificarToken, verificarRoles, putAdministrativoMidd, putAdministrativo);
// router.patch("/administrativos/:id", verificarToken, verificarRoles, activarAdministrativoMidd, activarAdministrativo);
// router.delete("/administrativos/:id", verificarToken, verificarRoles, deleteAdministrativoMidd, deleteAdministrativo);

export default router;
