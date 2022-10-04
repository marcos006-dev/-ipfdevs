/* eslint no-underscore-dangle: 0 */

import supertest from "supertest";
import mongoose from "mongoose";
import { crearUsuario } from "../helpers/tests/crearUsuarios.js";
import { getTokenTest } from "../helpers/tests/getToken.js";
import {
  testDelete, testGet, testPost, testPut,
} from "../helpers/tests/tests.js";
import { vaciarColecciones } from "../helpers/tests/vaciarColecciones.js";
import { app, server } from "../index.js";
import { crearAvisos } from "../helpers/tests/crearAvisos.js";
import { crearMaterias } from "../helpers/tests/crearMaterias.js";

const SERVER = supertest(app);
const URL = "/api/avisos";

const _idUsuario = mongoose.Types.ObjectId();
const _idAviso = mongoose.Types.ObjectId();
const _idMateria = mongoose.Types.ObjectId();

const HEADERS = getTokenTest({ _id: _idUsuario, nombre_persona: "Marcos", apellido_persona: "Franco" });

beforeAll(async () => {
  try {
    await vaciarColecciones();
    await crearUsuario(_idUsuario);
    await crearMaterias(_idMateria);
    await crearAvisos(_idAviso, _idUsuario, _idMateria);
  } catch (error) {
    console.log(error);
  }
});

describe(`GET ${URL}`, () => {
  testGet(URL, "Debe retornar un error al no enviar el token", 401, SERVER, {});

  testGet(URL, "Debe retornar un 401 si el administrativo o docente no posee los permisos necesarios", 401, SERVER, {
    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOnsiX2lkIjoiNjMzNWUyOWU4MTM2OGJlNDg5MDcwMjljIiwibm9tYnJlX3BlcnNvbmEiOiJNYXJjb3MiLCJhcGVsbGlkb19wZXJzb25hIjoiRnJhbmNvIn0sImlhdCI6MTY2NDQ3NTgwNn0.m0eqZXVuQ8RKLim9zaAs_3QqQ-rlZcx-LaX-1JcFn4Y",
  });

  testGet(URL, "Debe retornar un json con los registros de avisos", 200, SERVER, HEADERS);

  testGet(URL, "Debe retornar un status-code 200", 200, SERVER, HEADERS);
});

describe(`GET ${URL}/:id`, () => {
  testGet(`${URL}/${_idAviso}`, "Debe retornar un error al no enviar el token", 401, SERVER, {});

  testGet(`${URL}/6335ccec8c88484ac3dc5cd7`, "Si no existe debe retornar un json con un mensaje de id no existe en la bd", 400, SERVER, HEADERS);

  testGet(`${URL}/${_idAviso}`, "Debe retornar un json con el registro encontrado", 200, SERVER, HEADERS);
});

describe(`POST AVISO ${URL}`, () => {
  const avisoCrear = {
    descripcion_aviso: "Nuevo aviso",
    _materia: _idMateria,
  };

  testPost(URL, "Debe retornar un error al no enviar el token", avisoCrear, 401, SERVER, {});

  const avisoConDescripcionInvalido = { ...avisoCrear };
  avisoConDescripcionInvalido.descripcion_aviso = "";
  testPost(URL, "Debe retornar un 400 si se envia un aviso con descripcion invalida", avisoConDescripcionInvalido, 400, SERVER, HEADERS);

  testPost(URL, "Debe retornar un status code 200 si se crea el aviso de forma exitosa", avisoCrear, 200, SERVER, HEADERS);
});

describe(`PUT AVISO ${URL}`, () => {
  const avisoEditar = {
    descripcion_aviso: "Actualizado aviso",
    // _materia: _idMateria,
  };

  testPut(`${URL}/${_idAviso}`, "Debe retornar un error al no enviar el token", avisoEditar, 401, SERVER, {});

  testPut(`${URL}/${_idAviso}56sa`, "Debe retornar un error al no enviar un id de mongo valido", avisoEditar, 400, SERVER, HEADERS);

  testPut(`${URL}/6335c1c5cd6b7182c6dd7b8b`, "Debe retornar un error al enviar un id que no esta asociado a ningun registro en la bd", avisoEditar, 400, SERVER, HEADERS);

  const avisoConDescripcionInvalido = { ...avisoEditar };
  avisoConDescripcionInvalido.descripcion_aviso = "";

  testPut(`${URL}/${_idAviso}`, "Debe retornar un 400 si se envia un aviso con descripcion invalida", avisoConDescripcionInvalido, 400, SERVER, HEADERS);

  testPut(`${URL}/${_idAviso}`, "Debe retornar un 200 si se actualiza correctamente el registro de aviso", avisoEditar, 200, SERVER, HEADERS);
});

describe(`DELETE ${URL}/:id`, () => {
  testDelete(`${URL}/6335ccec8c88484ac3dc5cd7`, "Debe retornar un error al no enviar el token", 401, SERVER, {});

  testDelete(`${URL}/56335ccec8c88484ac3dc5cd7`, "Eliminar una nota con un id inexistente", 400, SERVER, HEADERS);

  testDelete(`${URL}/${_idAviso}`, "Debe retornar un status-code 200 al borrar un aviso", 200, SERVER, HEADERS);
});

afterAll(async () => {
  server.close();
});
