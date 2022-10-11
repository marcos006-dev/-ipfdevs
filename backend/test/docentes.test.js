/* eslint no-underscore-dangle: 0 */

import supertest from "supertest";
import mongoose from "mongoose";
// import { crearUsuario } from "../helpers/tests/crearUsuarios.js";
import { getTokenTest } from "../helpers/tests/getToken.js";
import {
  testDelete, testGet, testPost, testPut,
} from "../helpers/tests/tests.js";
import { vaciarColecciones } from "../helpers/tests/vaciarColecciones.js";
import { app, server } from "../index.js";
import { crearMaterias } from "../helpers/tests/crearMaterias.js";
// import { crearNotas } from "../helpers/tests/crearNotas.js";
// import { crearAvisos } from "../helpers/tests/crearAvisos.js";
import { PersonaModel } from "../models/Persona.model.js";
import { MateriaModel } from "../models/Materia.model.js";
import { crearNotas } from "../helpers/tests/crearNotas.js";
// import { AvisoModel } from "../models/Aviso.model.js";

const SERVER = supertest(app);
const URL = "/api";

const _idUsuario = mongoose.Types.ObjectId();
const _idAlumno = mongoose.Types.ObjectId();
const _idMateria1 = mongoose.Types.ObjectId();
const _idMateria2 = mongoose.Types.ObjectId();
const _idMateria3 = mongoose.Types.ObjectId();
const _idNota = mongoose.Types.ObjectId();
// const _idAviso1 = mongoose.Types.ObjectId();
// const _idAviso2 = mongoose.Types.ObjectId();

const HEADERS = getTokenTest({ _id: _idUsuario, nombre_persona: "Marcos", apellido_persona: "Franco" });

beforeAll(async () => {
  try {
    await vaciarColecciones();
    // await crearUsuario(_idUsuario);
    await crearMaterias(_idMateria1);
    await MateriaModel.create({
      _id: _idMateria2,
      descripcion_materia: "Programacion IVi",
      nombre_carrera: "Tecnico en Programación",
      horarios: [{
        dia_semana: "lunes",
        horario_semana: "09:40 a 10:00",
      },
      {
        dia_semana: "martes",
        horario_semana: "10:40 a 11:20",
      },

      ],
      anio_lectivo: [{
        descripcion_anio: "2022",
      }],
    });

    await MateriaModel.create({
      _id: _idMateria3,
      descripcion_materia: "Programacion IVidasd",
      nombre_carrera: "Tecnico en Programación",
      horarios: [{
        dia_semana: "lunes",
        horario_semana: "09:40 a 10:00",
      },
      {
        dia_semana: "martes",
        horario_semana: "10:40 a 11:20",
      },

      ],
      anio_lectivo: [{
        descripcion_anio: "2022",
      }],
    });

    await PersonaModel.create({
      _id: _idUsuario,
      nombre_persona: "Marcos",
      apellido_persona: "Franco",
      dni_persona: "12345678",
      cuil_persona: "12345678901",
      fecha_nac_persona: "2022/09/01",
      sexo_persona: "Masculino",
      correo_persona: "correo1@gmail.com",
      telefono_persona: "3704652811",
      direccion_persona: {
        manzana: "mz 66 casa 13",
        casa: "Schema.Types.String",
        sector: "Schema.Types.String",
        lote: "Schema.Types.String",
        parcela: "Schema.Types.String",
      },
      documentaciones: [{
        url_documento: "https://algunlado.com",
        tipo_documento: "domicilio",
      }],
      inasistencias: [{
        fecha: "2022/09/20",
      }],
      _materia: [
        _idMateria1,
        _idMateria2,
        // _idMateria3,
      ],
      nombre_usuario: "marcos",
      password_usuario: "$2a$10$EpEgugumkVGnWpgpVw9bjeCpGbC1GhJTAhW0WG9qX/xFMFVKJvPA6",
      roles: {
        descripcion_rol: "docente",
        acceso_endpoint: ["administrativos", "materias", "notas", "avisos", "alumnos", "inasistencias-alumnos", "notas-alumnos", "avisos-alumnos", "tipos-docum-alumnos", "horarios-alumnos", "materias-docentes", "cargar-notas", "editar-notas", "eliminar-notas", "materias-carrera", "carreras"],
      },
    });

    await PersonaModel.create({
      _id: _idAlumno,
      nombre_persona: "Carlos",
      apellido_persona: "Franco",
      dni_persona: "12345671",
      cuil_persona: "12345678961",
      fecha_nac_persona: "2022/09/01",
      sexo_persona: "Masculino",
      correo_persona: "correo13@gmail.com",
      telefono_persona: "3704652816",
      direccion_persona: {
        manzana: "mz 66 casa 13",
        casa: "Schema.Types.String",
        sector: "Schema.Types.String",
        lote: "Schema.Types.String",
        parcela: "Schema.Types.String",
      },
      documentaciones: [{
        url_documento: "https://algunlado.com",
        tipo_documento: "domicilio",
      }],
      inasistencias: [{
        fecha: "2022/09/20",
      }],
      _materia: [
        _idMateria1,
        _idMateria2,
        // _idMateria3,
      ],
      nombre_usuario: "marcoss",
      password_usuario: "$2a$10$EpEgugumkVGnWpgpVw9bjeCpGbC1GhJTAhW0WG9qX/xFMFVKJvPA6",
      roles: {
        descripcion_rol: "alumno",
        acceso_endpoint: ["administrativos", "materias", "notas", "avisos", "alumnos", "inasistencias-alumnos", "notas-alumnos", "avisos-alumnos", "tipos-docum-alumnos", "horarios-alumnos", "materias-docentes", "cargar-notas", "editar-notas", "eliminar-notas", "materias-carrera", "carreras"],
      },
    });

    // await crearMaterias(_idMateria2);
    // await crearMaterias(_idMateria3);
    await crearNotas(_idNota, _idMateria1, _idUsuario);
    //   await crearAvisos(_idAviso1, _idUsuario, _idMateria1);
    //   await crearAvisos(_idAviso2, _idUsuario, _idMateria1);

    //   await AvisoModel.create({
    //     descripcion_aviso: "Aviso general",
    //     tipo_aviso: "general",
    //     _persona: _idUsuario,
    //     _materia: _idMateria3,
    //   });
  } catch (error) {
    console.log(error);
  }
});

// OBTENER LAS MATERIAS A CARGO

describe.skip(`GET NOTAS ${URL}/materias-docentes/${_idUsuario}`, () => {
  testGet(`${URL}/materias-docentes/${_idUsuario}`, "Debe retornar un error al no enviar el token", 401, SERVER, {});

  testGet(`${URL}/materias-docentes/${_idUsuario}`, "Debe retornar un 401 si el docente no posee los permisos necesarios", 401, SERVER, {
    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOnsiX2lkIjoiNjMzNWUyOWU4MTM2OGJlNDg5MDcwMjljIiwibm9tYnJlX3BlcnNvbmEiOiJNYXJjb3MiLCJhcGVsbGlkb19wZXJzb25hIjoiRnJhbmNvIn0sImlhdCI6MTY2NDQ3NTgwNn0.m0eqZXVuQ8RKLim9zaAs_3QqQ-rlZcx-LaX-1JcFn4Y",
  });

  testGet(`${URL}/materias-docentes/${_idUsuario}`, "Debe retornar un json con los registros de materias asociadas a un docente", 200, SERVER, HEADERS);

  testGet(`${URL}/materias-docentes/${_idUsuario}`, "Debe retornar un status-code 200", 200, SERVER, HEADERS);
});

// CREAR NOTAS
// EDITAR NOTAS
// ELIMINAR NOTAS
describe.skip(`POST NOTAS ${URL}/cargar-notas`, () => {
  const notaCrear = {
    _materia: _idMateria1,
    _persona: _idAlumno,
    descripcion_nota: 7,
    tipo_nota: "primer parcial",
  };

  testPost(`${URL}/cargar-notas`, "Debe retornar un error al no enviar el token", notaCrear, 401, SERVER, {});

  const notaConIdMateriaInvalido = { ...notaCrear };
  notaConIdMateriaInvalido._materia = "";
  testPost(`${URL}/cargar-notas`, "Debe retornar un 400 si se envia un id con materia invalida", notaConIdMateriaInvalido, 400, SERVER, HEADERS);

  const notaConIdPersonaInvalido = { ...notaCrear };
  notaConIdPersonaInvalido._persona = "";
  testPost(`${URL}/cargar-notas`, "Debe retornar un 400 si se envia un aviso con id persona invalida", notaConIdPersonaInvalido, 400, SERVER, HEADERS);

  const notaConDescripcionNotaInvalida = { ...notaCrear };
  notaConDescripcionNotaInvalida.descripcion_nota = "";
  testPost(`${URL}/cargar-notas`, "Debe retornar un 400 si se envia una nota con una descripcion invalida", notaConDescripcionNotaInvalida, 400, SERVER, HEADERS);

  const notaConTipoNotaInvalida = { ...notaCrear };
  notaConTipoNotaInvalida.tipo_nota = "";
  testPost(`${URL}/cargar-notas`, "Debe retornar un 400 si se envia una nota con un tipo de nota invalida", notaConTipoNotaInvalida, 400, SERVER, HEADERS);

  testPost(`${URL}/cargar-notas`, "Debe retornar un status code 200 si se crea la nota del alumno de forma exitosa", notaCrear, 200, SERVER, HEADERS);
});

describe.skip(`PUT NOTAS ${URL}/editar-notas`, () => {
  const editarNota = {
    _materia: _idMateria2,
    _persona: _idAlumno,
    descripcion_nota: 9,
    tipo_nota: "primer parcial",
  };

  testPut(`${URL}/editar-notas/${_idNota}`, "Debe retornar un error al no enviar el token", editarNota, 401, SERVER, {});

  testPut(`${URL}/editar-notas/6335c1c5cd6b7182c6dd7b8b`, "Debe retornar un error al enviar un id que no esta asociado a ningun registro en la bd", editarNota, 400, SERVER, HEADERS);

  const notaConIdMateriaInvalido = { ...editarNota };
  notaConIdMateriaInvalido._materia = "";
  testPut(`${URL}/editar-notas/${_idNota}`, "Debe retornar un 400 si se envia un id con materia invalida", notaConIdMateriaInvalido, 400, SERVER, HEADERS);

  const avisoConIdPersonaInvalido = { ...editarNota };
  avisoConIdPersonaInvalido._persona = "";
  testPut(`${URL}/editar-notas/${_idNota}`, "Debe retornar un 400 si se envia un aviso con id persona invalida", avisoConIdPersonaInvalido, 400, SERVER, HEADERS);

  const avisoConDescripcionNotaInvalida = { ...editarNota };
  avisoConDescripcionNotaInvalida.descripcion_nota = "";
  testPut(`${URL}/editar-notas/${_idNota}`, "Debe retornar un 400 si se envia una nota con una descripcion invalida", avisoConDescripcionNotaInvalida, 400, SERVER, HEADERS);

  const notaConTipoNotaInvalida = { ...editarNota };
  notaConTipoNotaInvalida.tipo_nota = "";
  testPut(`${URL}/editar-notas/${_idNota}`, "Debe retornar un 400 si se envia una nota con un tipo de nota invalida", notaConTipoNotaInvalida, 400, SERVER, HEADERS);

  const notaDuplicada = { ...editarNota };
  notaDuplicada.tipo_nota = {
    _materia: _idMateria1,
    _persona: _idAlumno,
  };
  testPut(`${URL}/editar-notas/${_idNota}`, "Debe retornar un 400 si se envia una nota con un tipo de nota invalida", notaDuplicada, 400, SERVER, HEADERS);

  testPut(`${URL}/editar-notas/${_idNota}`, "Debe retornar un 200 si se actualiza correctamente la nota del alumno", editarNota, 200, SERVER, HEADERS);
});

describe(`DELETE ${URL}/eliminar-notas/${_idNota}`, () => {
  testDelete(`${URL}/eliminar-notas/6335ccec8c88484ac3dc5cd7`, "Debe retornar un error al no enviar el token", 401, SERVER, {});

  testDelete(`${URL}/eliminar-notas/56335ccec8c88484ac3dc5cd7`, "Eliminar una nota con un id inexistente", 400, SERVER, HEADERS);

  //   testDelete(`${URL}/eliminar-notas/${_idNota}`, "Debe retornar un status-code 400 al tratar de borrar una nota con estado publicado", 400, SERVER, HEADERS, true);

  testDelete(`${URL}/eliminar-notas/${_idNota}`, "Debe retornar un status-code 200 al borrar una nota", 200, SERVER, HEADERS);
});

afterAll(async () => {
  server.close();
});
