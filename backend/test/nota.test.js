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
import { crearNotas } from "../helpers/tests/crearNotas.js";
import { crearMaterias } from "../helpers/tests/crearMaterias.js";

const SERVER = supertest(app);
const URL = "/api/notas";

const _idUsuario = mongoose.Types.ObjectId();
const _idMateria = mongoose.Types.ObjectId();
const _idNota = mongoose.Types.ObjectId();

const HEADERS = getTokenTest({ _id: _idUsuario, nombre_persona: "Marcos", apellido_persona: "Franco" });
beforeAll(async () => {
  try {
    await vaciarColecciones();
    await crearUsuario(_idUsuario);
    await crearMaterias(_idMateria);
    await crearNotas(_idNota, _idMateria, _idUsuario);
  } catch (error) {
    console.log(error);
  }
});

describe(`GET ${URL}`, () => {
  testGet(URL, "Debe retornar un error al no enviar el token", 401, SERVER, {});

  testGet(URL, "Debe retornar un 401 si el administrativo o docente no posee los permisos necesarios", 401, SERVER, {
    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOnsiX2lkIjoiNjMzNWUyOWU4MTM2OGJlNDg5MDcwMjljIiwibm9tYnJlX3BlcnNvbmEiOiJNYXJjb3MiLCJhcGVsbGlkb19wZXJzb25hIjoiRnJhbmNvIn0sImlhdCI6MTY2NDQ3NTgwNn0.m0eqZXVuQ8RKLim9zaAs_3QqQ-rlZcx-LaX-1JcFn4Y",
  });

  testGet(URL, "Debe retornar un json con los registros de notas", 200, SERVER, HEADERS);

  testGet(URL, "Debe retornar un status-code 200", 200, SERVER, HEADERS);
});

describe(`GET ${URL}/:id`, () => {
  testGet(`${URL}/${_idNota}`, "Debe retornar un error al no enviar el token", 401, SERVER, {});

  testGet(`${URL}/6335ccec8c88484ac3dc5cd7`, "Si no existe debe retornar un json con un mensaje de id no existe en la bd", 400, SERVER, HEADERS);

  testGet(`${URL}/${_idNota}`, "Debe retornar un json con el registro encontrado", 200, SERVER, HEADERS);

  testGet(`${URL}/${_idNota}`, "Debe retornar un status-code 200", 200, SERVER, HEADERS);
});

describe(`POST NOTA ${URL}`, () => {
  const notaCrear = {
    _materia: _idMateria,
    _persona: _idUsuario,
    descripcion_nota: 9,
    tipo_nota: "segundo parcial",
    // descripcion_materia: "Programacion IV",
    // estado_nota: "publicado",
  };

  testPost(URL, "Debe retornar un error al no enviar el token", notaCrear, 401, SERVER);

  const notaConIdMateriaInexistente = { ...notaCrear };
  notaConIdMateriaInexistente._materia = "";
  testPost(URL, "Debe retornar un 400 si el id de la materia no existe en la db", notaConIdMateriaInexistente, 400, SERVER, HEADERS);

  const notaConIdEstudianteInexistente = { ...notaCrear };
  notaConIdEstudianteInexistente._persona = "6339b9e1132289aeb750b3f6";
  testPost(URL, "Debe retornar un 400 si el id de la materia no existe en la db", notaConIdEstudianteInexistente, 400, SERVER, HEADERS);

  const notaConDescripcionInvalido = { ...notaCrear };
  notaConDescripcionInvalido.descripcion_nota = "";
  testPost(URL, "Debe retornar un 400 si se envia una nota invalida", notaConDescripcionInvalido, 400, SERVER, HEADERS);

  const notaTipoNotaInvalida = { ...notaCrear };
  notaTipoNotaInvalida.tipo_nota = "";
  testPost(URL, "Debe retornar un 400 si se envia un tipo de nota invalida", notaTipoNotaInvalida, 400, SERVER, HEADERS);

  testPost(URL, "Debe retornar un status code 200 si se crea la nota de forma exitosa", notaCrear, 200, SERVER, HEADERS);
});

describe(`PUT NOTA ${URL}`, () => {
  const notaEditar = {
    _materia: _idMateria,
    _persona: _idUsuario,
    descripcion_nota: 9,
    tipo_nota: "primer parcial",
    // descripcion_materia: "Programacion IV",
    // estado_nota: "publicado",
  };

  testPut(`${URL}/${_idNota}`, "Debe retornar un error al no enviar el token", notaEditar, 401, SERVER, {});

  testPut(`${URL}/${_idNota}56sa`, "Debe retornar un error al no enviar un id de mongo valido", notaEditar, 400, SERVER, HEADERS);

  testPut(`${URL}/6335c1c5cd6b7182c6dd7b8b`, "Debe retornar un error al enviar un id que no esta asociado a ningun registro en la bd", notaEditar, 400, SERVER, HEADERS);

  const notaConIdMateriaInexistente = { ...notaEditar };
  notaConIdMateriaInexistente._materia = "";
  testPost(URL, "Debe retornar un 400 si el id de la materia no existe en la db", notaConIdMateriaInexistente, 400, SERVER, HEADERS);

  const notaConIdEstudianteInexistente = { ...notaEditar };
  notaConIdEstudianteInexistente._persona = "6339b9e1132289aeb750b3f6";
  testPost(URL, "Debe retornar un 400 si el id de la materia no existe en la db", notaConIdEstudianteInexistente, 400, SERVER, HEADERS);

  const notaConDescripcionInvalido = { ...notaEditar };
  notaConDescripcionInvalido.descripcion_nota = "";
  testPost(URL, "Debe retornar un 400 si se envia una nota invalida", notaConDescripcionInvalido, 400, SERVER, HEADERS);

  const notaTipoNotaInvalida = { ...notaEditar };
  notaTipoNotaInvalida.tipo_nota = "";
  testPost(URL, "Debe retornar un 400 si se envia un tipo de nota invalida", notaTipoNotaInvalida, 400, SERVER, HEADERS);

  testPut(`${URL}/${_idNota}`, "Debe retornar un 200 si se actualiza correctamente el registro de nota", notaEditar, 200, SERVER, HEADERS);
});

describe(`DELETE ${URL}/:id`, () => {
  testDelete(`${URL}/6335ccec8c88484ac3dc5cd7`, "Debe retornar un error al no enviar el token", 401, SERVER, {});

  testDelete(`${URL}/56335ccec8c88484ac3dc5cd7`, "Eliminar una nota con un id inexistente", 400, SERVER, HEADERS);

  testDelete(`${URL}/${_idNota}`, "Debe retornar un status-code 200 al borrar una nota", 200, SERVER, HEADERS);
});

afterAll(async () => {
  server.close();
});
