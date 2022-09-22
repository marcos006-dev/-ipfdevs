import { Router } from "express";
import { loguearse } from "../controllers/auth.controller.js";
import { postAuthLoginMidd } from "../middlewares/auth.middlewares.js";

const router = Router();

router.post("/login", postAuthLoginMidd, loguearse);

export default router;
