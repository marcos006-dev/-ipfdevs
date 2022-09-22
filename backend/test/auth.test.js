import supertest from "supertest";
import { crearUsuario } from "../helpers/tests/crearUsuarios.js";
import { testPost } from "../helpers/tests/tests.js";
import { vaciarColecciones } from "../helpers/tests/vaciarColecciones.js";
import { app, server } from "../index.js";

const SERVER = supertest(app);
const URL = "/api";

beforeAll(async () => {
  try {
    await vaciarColecciones();
    await crearUsuario();
  } catch (error) {
    console.log(error);
  }
});

describe(`POST AUTENTIFICAR ${URL}`, () => {
  testPost(`${URL}/login`, "Debe retornar un 401 si no se envia el nombre de usuario", {
    nombre_usuario: "",
    password_usuario: "123456",
  }, 400, SERVER, {});

  testPost(`${URL}/login`, "Debe retornar un 401 si no se envia la contraseña", {
    nombre_usuario: "marcos",
    password_usuario: "",
  }, 400, SERVER, {});

  testPost(`${URL}/login`, "Debe retornar un status code 200 si se envia las credenciales correctamente", {
    nombre_usuario: "marcos",
    password_usuario: "123456",
  }, 200, SERVER, {}, true);
});

afterAll(async () => {
  server.close();
});
