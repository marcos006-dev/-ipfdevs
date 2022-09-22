import { Router } from "express";
import { registrarUsuarios } from "../controllers/registrarPersonas.controller.js";
import { postUsuariosMidd } from "../middlewares/registrarPersonas.middlewares.js";
import verificarToken from "../middlewares/verificarToken.js";

const router = Router();

router.post("/usuarios", verificarToken, postUsuariosMidd, registrarUsuarios);

export default router;
