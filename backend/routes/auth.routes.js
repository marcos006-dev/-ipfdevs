import { Router } from "express";
import { getDataUser, loguearse } from "../controllers/auth.controller.js";
import { postAuthLoginMidd } from "../middlewares/auth.middlewares.js";
import verificarToken from "../middlewares/verificarToken.js";

const router = Router();

router.post("/login", postAuthLoginMidd, loguearse);
router.get("/user", verificarToken, getDataUser);

export default router;
