import rutasAuth from "./auth.routes.js";
import rutasAdministrativos from "./administrativos.routes.js";
import rutasMaterias from "./materias.routes.js";
import rutasNotas from "./notas.routes.js";
import rutasAvisos from "./avisos.routes.js";
import rutasAlumnos from "./alumnos.routes.js";

export const rutas = () => [
  rutasAuth,
  rutasAdministrativos,
  rutasMaterias,
  rutasNotas,
  rutasAvisos,
  rutasAlumnos,
];
