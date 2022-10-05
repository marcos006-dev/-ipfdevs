/* eslint no-underscore-dangle: 0 */

import supertest from "supertest";
import mongoose from "mongoose";
// import { crearUsuario } from "../helpers/tests/crearUsuarios.js";
import { getTokenTest } from "../helpers/tests/getToken.js";
import {
  testActivar,
  testDelete, testGet, testPost, testPut,
} from "../helpers/tests/tests.js";
import { vaciarColecciones } from "../helpers/tests/vaciarColecciones.js";
import { app, server } from "../index.js";
import { crearMaterias } from "../helpers/tests/crearMaterias.js";
import { crearNotas } from "../helpers/tests/crearNotas.js";
import { crearAvisos } from "../helpers/tests/crearAvisos.js";
import { PersonaModel } from "../models/Persona.model.js";
import { MateriaModel } from "../models/Materia.model.js";
import { AvisoModel } from "../models/Aviso.model.js";

const SERVER = supertest(app);
const URL = "/api";

const _idUsuario = mongoose.Types.ObjectId();
const _idMateria1 = mongoose.Types.ObjectId();
const _idMateria2 = mongoose.Types.ObjectId();
const _idMateria3 = mongoose.Types.ObjectId();
const _idNota = mongoose.Types.ObjectId();
const _idAviso1 = mongoose.Types.ObjectId();
const _idAviso2 = mongoose.Types.ObjectId();

const HEADERS = getTokenTest({ _id: _idUsuario, nombre_persona: "Marcos", apellido_persona: "Franco" });

// 1 - Consultar su inasistencia
// 2 - Consultar sus notas
// 3 - Avisos
// 4 - Cargar sus documentaciones
// 5 - Consultar sus horarios

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
        tipo_documento: "Domicilio",
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
        descripcion_rol: "alumno",
        acceso_endpoint: ["administrativos", "materias", "notas", "avisos", "alumnos", "inasistencias-alumnos", "notas-alumnos", "avisos-alumnos"],
      },
    });

    // await crearMaterias(_idMateria2);
    // await crearMaterias(_idMateria3);
    await crearNotas(_idNota, _idMateria1, _idUsuario);
    await crearAvisos(_idAviso1, _idUsuario, _idMateria1);
    await crearAvisos(_idAviso2, _idUsuario, _idMateria1);

    await AvisoModel.create({
      descripcion_aviso: "Aviso general",
      tipo_aviso: "general",
      _persona: _idUsuario,
      _materia: _idMateria3,
    });
  } catch (error) {
    console.log(error);
  }
});
describe.skip(`GET INASISTENCIAS ${URL}/inasistencias-alumnos/${_idUsuario}`, () => {
  testGet(`${URL}/inasistencias-alumnos/${_idUsuario}`, "Debe retornar un error al no enviar el token", 401, SERVER, {});

  testGet(`${URL}/inasistencias-alumnos/${_idUsuario}`, "Debe retornar un 401 si el alumno no posee los permisos necesarios", 401, SERVER, {
    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOnsiX2lkIjoiNjMzNWUyOWU4MTM2OGJlNDg5MDcwMjljIiwibm9tYnJlX3BlcnNvbmEiOiJNYXJjb3MiLCJhcGVsbGlkb19wZXJzb25hIjoiRnJhbmNvIn0sImlhdCI6MTY2NDQ3NTgwNn0.m0eqZXVuQ8RKLim9zaAs_3QqQ-rlZcx-LaX-1JcFn4Y",
  });

  testGet(`${URL}/inasistencias-alumnos/${_idUsuario}`, "Debe retornar un json con los registros de inasistencias de alumnos", 200, SERVER, HEADERS);

  testGet(`${URL}/inasistencias-alumnos/${_idUsuario}`, "Debe retornar un status-code 200", 200, SERVER, HEADERS);
});

describe.skip(`GET NOTAS ${URL}/notas-alumnos/${_idUsuario}`, () => {
  testGet(`${URL}/notas-alumnos/${_idUsuario}`, "Debe retornar un error al no enviar el token", 401, SERVER, {});

  testGet(`${URL}/notas-alumnos/${_idUsuario}`, "Debe retornar un 401 si el alumno no posee los permisos necesarios", 401, SERVER, {
    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOnsiX2lkIjoiNjMzNWUyOWU4MTM2OGJlNDg5MDcwMjljIiwibm9tYnJlX3BlcnNvbmEiOiJNYXJjb3MiLCJhcGVsbGlkb19wZXJzb25hIjoiRnJhbmNvIn0sImlhdCI6MTY2NDQ3NTgwNn0.m0eqZXVuQ8RKLim9zaAs_3QqQ-rlZcx-LaX-1JcFn4Y",
  });

  testGet(`${URL}/notas-alumnos/${_idUsuario}`, "Debe retornar un json con los registros de notas de un alumno", 200, SERVER, HEADERS);

  testGet(`${URL}/notas-alumnos/${_idUsuario}`, "Debe retornar un status-code 200", 200, SERVER, HEADERS);
});

describe(`GET AVISOS ${URL}/avisos-alumnos/${_idUsuario}`, () => {
  testGet(`${URL}/avisos-alumnos/${_idUsuario}`, "Debe retornar un error al no enviar el token", 401, SERVER, {});

  testGet(`${URL}/avisos-alumnos/${_idUsuario}`, "Debe retornar un 401 si el alumno no posee los permisos necesarios", 401, SERVER, {
    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOnsiX2lkIjoiNjMzNWUyOWU4MTM2OGJlNDg5MDcwMjljIiwibm9tYnJlX3BlcnNvbmEiOiJNYXJjb3MiLCJhcGVsbGlkb19wZXJzb25hIjoiRnJhbmNvIn0sImlhdCI6MTY2NDQ3NTgwNn0.m0eqZXVuQ8RKLim9zaAs_3QqQ-rlZcx-LaX-1JcFn4Y",
  });

  testGet(`${URL}/avisos-alumnos/${_idUsuario}`, "Debe retornar un json con los registros de avisos para los alumnos", 200, SERVER, HEADERS, true);

  testGet(`${URL}/avisos-alumnos/${_idUsuario}`, "Debe retornar un status-code 200", 200, SERVER, HEADERS, true);
});

// describe(`GET NOTAS ${URL}/notas-alumnos/${_idUsuario}`, () => {
//   testGet(`${URL}/notas-alumnos/${_idUsuario}`, "Debe retornar un error al no enviar el token", 401, SERVER, {});

//   testGet(`${URL}/notas-alumnos/${_idUsuario}`, "Debe retornar un 401 si el alumno no posee los permisos necesarios", 401, SERVER, {
//     authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOnsiX2lkIjoiNjMzNWUyOWU4MTM2OGJlNDg5MDcwMjljIiwibm9tYnJlX3BlcnNvbmEiOiJNYXJjb3MiLCJhcGVsbGlkb19wZXJzb25hIjoiRnJhbmNvIn0sImlhdCI6MTY2NDQ3NTgwNn0.m0eqZXVuQ8RKLim9zaAs_3QqQ-rlZcx-LaX-1JcFn4Y",
//   });

//   testGet(`${URL}/notas-alumnos/${_idUsuario}`, "Debe retornar un json con los registros de alumnos", 200, SERVER, HEADERS, true);

//   testGet(`${URL}/notas-alumnos/${_idUsuario}`, "Debe retornar un status-code 200", 200, SERVER, HEADERS, true);
// });

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
