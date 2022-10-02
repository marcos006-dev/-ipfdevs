import rutasAuth from "./auth.routes.js";
import rutasAdministrativos from "./administrativos.routes.js";
import rutasMaterias from "./materias.routes.js";
import rutasNotas from "./notas.routes.js";
import rutasAvisos from "./avisos.routes";

export const rutas = () => [
  rutasAuth,
  rutasAdministrativos,
  rutasMaterias,
  rutasNotas,
  rutasAvisos,
];
