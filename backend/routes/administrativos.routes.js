import { Router } from "express";
import { actualizarAdministrativos, registrarAdministrativos } from "../controllers/administrativos.controller.js";
import { postAdministrativoMidd, putAdministrativoMidd } from "../middlewares/administrativos.middlewares.js";
import verificarToken from "../middlewares/verificarToken.js";

const router = Router();

router.post("/administrativos", verificarToken, postAdministrativoMidd, registrarAdministrativos);
router.put("/administrativos/:id", verificarToken, putAdministrativoMidd, actualizarAdministrativos);

export default router;
