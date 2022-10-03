/* eslint no-underscore-dangle: 0 */

import supertest from "supertest";
import mongoose from "mongoose";
import { crearUsuario } from "../helpers/tests/crearUsuarios.js";
import { getTokenTest } from "../helpers/tests/getToken.js";
import {
  testActivar,
  testDelete, testGet, testPost, testPut,
} from "../helpers/tests/tests.js";
import { vaciarColecciones } from "../helpers/tests/vaciarColecciones.js";
import { app, server } from "../index.js";
import { crearMaterias } from "../helpers/tests/crearMaterias.js";

const SERVER = supertest(app);
const URL = "/api/alumnos";

const _idUsuario = mongoose.Types.ObjectId();
const _idMateria = mongoose.Types.ObjectId();
const HEADERS = getTokenTest({ _id: _idUsuario, nombre_persona: "Marcos", apellido_persona: "Franco" });

// 1 - Consultar su inasistencia
// 2 - Consultar sus notas
// 3 - Avisos
// 4 - Cargar sus documentaciones

beforeAll(async () => {
  try {
    await vaciarColecciones();
    await crearUsuario(_idUsuario);
    await crearMaterias(_idMateria);
  } catch (error) {
    console.log(error);
  }
});
describe(`GET ${URL}`, () => {
  testGet(URL, "Debe retornar un error al no enviar el token", 401, SERVER, {});

  testGet(URL, "Debe retornar un 401 si el alumno no posee los permisos necesarios", 401, SERVER, {
    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOnsiX2lkIjoiNjMzNWUyOWU4MTM2OGJlNDg5MDcwMjljIiwibm9tYnJlX3BlcnNvbmEiOiJNYXJjb3MiLCJhcGVsbGlkb19wZXJzb25hIjoiRnJhbmNvIn0sImlhdCI6MTY2NDQ3NTgwNn0.m0eqZXVuQ8RKLim9zaAs_3QqQ-rlZcx-LaX-1JcFn4Y",
  });

  testGet(URL, "Debe retornar un json con los registros de alumnos", 200, SERVER, HEADERS, true);

  testGet(URL, "Debe retornar un status-code 200", 200, SERVER, HEADERS, true);
});

// const usuarioConUrlDocumentoVacio = { ...administrativoRegistrar };
// usuarioConUrlDocumentoVacio.documentaciones = {
//   url_documento: "",
//   tipo_documento: "Analiticoo",
// };
// testPost(URL, "Debe retornar un 400 si se envia un objeto con la url de documento vacio", usuarioConUrlDocumentoVacio, 400, SERVER, HEADERS);

// const usuarioConInasistenciaVacia = { ...administrativoRegistrar };
// usuarioConInasistenciaVacia.inasistencias = "";
// testPost(URL, "Debe retornar un 400 si se envia un objeto vacio como inasistencia", usuarioConInasistenciaVacia, 400, SERVER, HEADERS);

// const usuarioConInasistenciaIncorrecta = { ...administrativoRegistrar };
// usuarioConInasistenciaIncorrecta.inasistencias = { fecha: "2022/19/01" };
// testPost(URL, "Debe retornar un 400 si se envia una fecha invalida como inasistencia", usuarioConInasistenciaIncorrecta, 400, SERVER, HEADERS);

afterAll(async () => {
  server.close();
});
