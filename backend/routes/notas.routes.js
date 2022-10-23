import { Router } from "express";
import { putNota } from "../controllers/notas.controller.js";
import { putNotaMidd } from "../middlewares/notas.middlewares.js";
import { verificarRoles } from "../middlewares/verificarRoles.middlewares.js";
import verificarToken from "../middlewares/verificarToken.js";

const router = Router();

// router.get("/notas", verificarToken, verificarRoles, getNotasMidd, getNotas);
// router.get("/notas/:id", verificarToken, verificarRoles, getNotaMidd, getNota);
// router.post("/notas", verificarToken, verificarRoles, postNotaMidd, postNota);
router.put("/notas/:id", verificarToken, verificarRoles, putNotaMidd, putNota);
// router.patch("/materias/:id", verificarToken, verificarRoles, activarMateriaMidd, activarMateria);
// router.delete("/notas/:id", verificarToken, verificarRoles, deleteNotaMidd, deleteNota);

export default router;
