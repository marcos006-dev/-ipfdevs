import { Router } from "express";
import {
  deleteAviso,
  getAviso, getAvisos, postAviso, putAviso,
} from "../controllers/avisos.controller.js";
import {
  deleteAvisoMidd,
  getAvisoMidd, getAvisosMidd, postAvisoMidd, putAvisoMidd,
} from "../middlewares/avisos.middlewares.js";
import { verificarRoles } from "../middlewares/verificarRoles.middlewares.js";
import verificarToken from "../middlewares/verificarToken.js";

const router = Router();

router.get("/avisos", verificarToken, verificarRoles, getAvisosMidd, getAvisos);
router.get("/avisos/:id", verificarToken, verificarRoles, getAvisoMidd, getAviso);
router.post("/avisos", verificarToken, verificarRoles, postAvisoMidd, postAviso);
router.put("/avisos/:id", verificarToken, verificarRoles, putAvisoMidd, putAviso);
router.delete("/avisos/:id", verificarToken, verificarRoles, deleteAvisoMidd, deleteAviso);

export default router;
