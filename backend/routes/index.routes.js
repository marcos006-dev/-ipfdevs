import rutasAuth from "./auth.routes.js";
import rutasAdministrativos from "./administrativos.routes.js";
import rutasMaterias from "./materias.routes.js";

export const rutas = () => [
  rutasAuth,
  rutasAdministrativos,
  rutasMaterias,
];
