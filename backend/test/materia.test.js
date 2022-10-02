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
const URL = "/api/materias";

// eslint-disable-next-line no-underscore-dangle
const _idUsuario = mongoose.Types.ObjectId();
// eslint-disable-next-line no-underscore-dangle
const _idMateria = mongoose.Types.ObjectId();

const HEADERS = getTokenTest({ _id: _idUsuario, nombre_persona: "Marcos", apellido_persona: "Franco" });

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

  testGet(URL, "Debe retornar un 401 si el administrativo no posee los permisos necesarios", 401, SERVER, {
    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOnsiX2lkIjoiNjMzNWUyOWU4MTM2OGJlNDg5MDcwMjljIiwibm9tYnJlX3BlcnNvbmEiOiJNYXJjb3MiLCJhcGVsbGlkb19wZXJzb25hIjoiRnJhbmNvIn0sImlhdCI6MTY2NDQ3NTgwNn0.m0eqZXVuQ8RKLim9zaAs_3QqQ-rlZcx-LaX-1JcFn4Y",
  });

  testGet(URL, "Debe retornar un json con los registros de materias", 200, SERVER, HEADERS);

  testGet(URL, "Debe retornar un status-code 200", 200, SERVER, HEADERS);
});

describe(`GET ${URL}/:id`, () => {
  testGet(`${URL}/${_idMateria}`, "Debe retornar un error al no enviar el token", 401, SERVER, {});

  testGet(`${URL}/6335ccec8c88484ac3dc5cd7`, "Si no existe debe retornar un json con un mensaje de id no existe en la bd", 400, SERVER, HEADERS);

  testGet(`${URL}/${_idMateria}`, "Debe retornar un json con el registro encontrado", 200, SERVER, HEADERS);

  testGet(`${URL}/${_idMateria}`, "Debe retornar un status-code 200", 200, SERVER, HEADERS);
});

describe(`POST MATERIA ${URL}`, () => {
  const materiaCrear = {
    descripcion_materia: "Redes y seguridad informatica",
    nombre_carrera: "Tecnico en Programación",
    horarios: [{
      dia_semana: "miercoles",
      horario_semana: "09:40 a 10:00",
    },
    {
      dia_semana: "jueves",
      horario_semana: "10:40 a 11:20",
    },
    ],
    anio_lectivo: [{
      descripcion_anio: "2022",
    }],
  };

  testPost(URL, "Debe retornar un error al no enviar el token", materiaCrear, 401, SERVER);

  const materiaConDescripcionCorto = { ...materiaCrear };
  materiaConDescripcionCorto.descripcion_materia = "len";
  testPost(URL, "Debe retornar un 400 si la descripcion de la materia es menor a 3 caracteres", materiaConDescripcionCorto, 400, SERVER, HEADERS);

  const materiaConDescripcionRepetida = { ...materiaCrear };
  materiaConDescripcionRepetida.descripcion_materia = "Programacion IV";
  testPost(URL, "Debe retornar un 400 si se envia una descripcion de materia ya guardado en la base de datos", materiaConDescripcionRepetida, 400, SERVER, HEADERS);

  const materiaConNombreCarreraVacia = { ...materiaCrear };
  materiaConNombreCarreraVacia.nombre_carrera = "";
  testPost(URL, "Debe retornar un 400 si no se envia un nombre de carrera", materiaConNombreCarreraVacia, 400, SERVER, HEADERS);

  const materiaConNombreCarreraInexistente = { ...materiaCrear };
  materiaConNombreCarreraInexistente.nombre_carrera = "Redes y telecomunicacione";
  testPost(URL, "Debe retornar un 400 si se envia un nombre de carrera que no existe en la bd", materiaConNombreCarreraInexistente, 400, SERVER, HEADERS);

  const materiaConHorarioVacio = { ...materiaCrear };
  materiaConHorarioVacio.horarios = [];
  testPost(URL, "Debe retornar un 400 si no se envia un horario", materiaConHorarioVacio, 400, SERVER, HEADERS);

  const materiaSinDiaSemana = { ...materiaCrear };
  materiaSinDiaSemana.horarios = [{
    horario_semana: "09:40 a 10:00",
  },
  {
    dia_semana: "jueves",
    horario_semana: "10:40 a 11:20",
  },
  ];

  testPost(URL, "Debe retornar un 400 si se envia un horario sin el atributo de dia semana", materiaSinDiaSemana, 400, SERVER, HEADERS);

  const materiaConDiaSemanaInexistente = { ...materiaCrear };
  materiaConDiaSemanaInexistente.horarios = [{
    dia_semana: "juevess",
    horario_semana: "09:40 a 10:00",
  },
  {
    dia_semana: "jueves",
    horario_semana: "10:40 a 11:20",
  },
  ];

  testPost(URL, "Debe retornar un 400 si se envia un dia semana que no esta en el modelo de materias", materiaConDiaSemanaInexistente, 400, SERVER, HEADERS);

  const materiaSinHorarioSemana = { ...materiaCrear };
  materiaSinHorarioSemana.horarios = [{
    dia_semana: "viernes",
  },
  {
    dia_semana: "jueves",
    horario_semana: "10:40 a 11:20",
  },
  ];
  testPost(URL, "Debe retornar un 400 si se envia un horario sin el atributo de horario semana", materiaSinHorarioSemana, 400, SERVER, HEADERS);

  const materiaConHorarioSemanaInexistente = { ...materiaCrear };
  materiaConHorarioSemanaInexistente.horarios = [{
    dia_semana: "jueves",
    horario_semana: "09:40 a 10:01",
  },
  {
    dia_semana: "jueves",
    horario_semana: "10:40 a 11:20",
  },
  ];

  testPost(URL, "Debe retornar un 400 si se envia un horario semana que no esta en el modelo de materias", materiaConHorarioSemanaInexistente, 400, SERVER, HEADERS);

  const materiaSinAnioLectivo = { ...materiaCrear };
  materiaSinAnioLectivo.anio_lectivo = [
    {},
  ];
  testPost(URL, "Debe retornar un 400 si se envia un horario sin el atributo de anio lectivo", materiaSinAnioLectivo, 400, SERVER, HEADERS);

  testPost(URL, "Debe retornar un status code 200 si se crea la materia de forma exitosa", materiaCrear, 200, SERVER, HEADERS);
});

describe(`PUT MATERIA ${URL}`, () => {
  const materiaEditar = {
    descripcion_materia: "Redes y seguridad informaticaaa",
    nombre_carrera: "Tecnico en Programación",
    horarios: [{
      dia_semana: "miercoles",
      horario_semana: "09:40 a 10:00",
    },
    {
      dia_semana: "jueves",
      horario_semana: "10:40 a 11:20",
    },
    ],
    anio_lectivo: [{
      descripcion_anio: "2022",
    }],
  };

  testPut(`${URL}/${_idMateria}`, "Debe retornar un error al no enviar el token", materiaEditar, 401, SERVER, {});

  testPut(`${URL}/${_idMateria}56sa`, "Debe retornar un error al no enviar un id de mongo valido", materiaEditar, 400, SERVER, HEADERS);

  testPut(`${URL}/6335c1c5cd6b7182c6dd7b8b`, "Debe retornar un error al enviar un id que no esta asociado a ningun registro en la bd", materiaEditar, 400, SERVER, HEADERS);

  const materiaConDescripcionCorto = { ...materiaEditar };
  materiaConDescripcionCorto.descripcion_materia = "len";
  testPut(`${URL}/${_idMateria}`, "Debe retornar un 400 si la descripcion de la materia es menor a 3 caracteres", materiaConDescripcionCorto, 400, SERVER, HEADERS);

  const materiaConDescripcionRepetida = { ...materiaEditar };
  materiaConDescripcionRepetida.descripcion_materia = "Redes y seguridad informatica";
  testPut(`${URL}/${_idMateria}`, "Debe retornar un 400 si se envia una descripcion de materia ya guardado en la base de datos", materiaConDescripcionRepetida, 400, SERVER, HEADERS);

  const materiaConNombreCarreraVacia = { ...materiaEditar };
  materiaConNombreCarreraVacia.nombre_carrera = "";
  testPut(`${URL}/${_idMateria}`, "Debe retornar un 400 si no se envia un nombre de carrera", materiaConNombreCarreraVacia, 400, SERVER, HEADERS);

  const materiaConNombreCarreraInexistente = { ...materiaEditar };
  materiaConNombreCarreraInexistente.nombre_carrera = "Redes y telecomunicacione";
  testPut(`${URL}/${_idMateria}`, "Debe retornar un 400 si se envia un nombre de carrera que no existe en la bd", materiaConNombreCarreraInexistente, 400, SERVER, HEADERS);

  const materiaConHorarioVacio = { ...materiaEditar };
  materiaConHorarioVacio.horarios = [];
  testPut(`${URL}/${_idMateria}`, "Debe retornar un 400 si no se envia un horario", materiaConHorarioVacio, 400, SERVER, HEADERS);

  const materiaSinDiaSemana = { ...materiaEditar };
  materiaSinDiaSemana.horarios = [{
    horario_semana: "09:40 a 10:00",
  },
  {
    dia_semana: "jueves",
    horario_semana: "10:40 a 11:20",
  },
  ];

  testPut(`${URL}/${_idMateria}`, "Debe retornar un 400 si se envia un horario sin el atributo de dia semana", materiaSinDiaSemana, 400, SERVER, HEADERS);

  const materiaConDiaSemanaInexistente = { ...materiaEditar };
  materiaConDiaSemanaInexistente.horarios = [{
    dia_semana: "juevess",
    horario_semana: "09:40 a 10:00",
  },
  {
    dia_semana: "jueves",
    horario_semana: "10:40 a 11:20",
  },
  ];

  testPut(`${URL}/${_idMateria}`, "Debe retornar un 400 si se envia un dia semana que no esta en el modelo de materias", materiaConDiaSemanaInexistente, 400, SERVER, HEADERS);

  const materiaSinHorarioSemana = { ...materiaEditar };
  materiaSinHorarioSemana.horarios = [{
    dia_semana: "viernes",
  },
  {
    dia_semana: "jueves",
    horario_semana: "10:40 a 11:20",
  },
  ];
  testPut(`${URL}/${_idMateria}`, "Debe retornar un 400 si se envia un horario sin el atributo de horario semana", materiaSinHorarioSemana, 400, SERVER, HEADERS);

  const materiaConHorarioSemanaInexistente = { ...materiaEditar };
  materiaConHorarioSemanaInexistente.horarios = [{
    dia_semana: "jueves",
    horario_semana: "09:40 a 10:01",
  },
  {
    dia_semana: "jueves",
    horario_semana: "10:40 a 11:20",
  },
  ];

  testPut(`${URL}/${_idMateria}`, "Debe retornar un 400 si se envia un horario semana que no esta en el modelo de materias", materiaConHorarioSemanaInexistente, 400, SERVER, HEADERS);

  const materiaSinAnioLectivo = { ...materiaEditar };
  materiaSinAnioLectivo.anio_lectivo = [
    {},
  ];
  testPut(`${URL}/${_idMateria}`, "Debe retornar un 400 si se envia un horario sin el atributo de anio lectivo", materiaSinAnioLectivo, 400, SERVER, HEADERS);

  testPut(`${URL}/${_idMateria}`, "Debe retornar un 200 si se actualiza correctamente el registro", materiaEditar, 200, SERVER, HEADERS);
});

describe(`DELETE ${URL}/:id`, () => {
  testDelete(`${URL}/6335ccec8c88484ac3dc5cd7`, "Debe retornar un error al no enviar el token", 401, SERVER, {});

  testDelete(`${URL}/56335ccec8c88484ac3dc5cd7`, "Eliminar una materia con un id inexistente", 400, SERVER, HEADERS);

  testDelete(`${URL}/${_idMateria}`, "Debe retornar un status-code 200 al desactivar una materia", 200, SERVER, HEADERS);
});

describe(`ACTIVAR ${URL}/:id`, () => {
  testActivar(`${URL}/6335ccec8c88484ac3dc5cd7`, "Debe retornar un error al no enviar el token", 401, SERVER, {});

  testActivar(`${URL}/56335ccec8c88484ac3dc5cd7`, "Activar una materia con un id inexistente", 400, SERVER, HEADERS);

  testActivar(`${URL}/${_idMateria}`, "Debe retornar un status-code 200 al activar un materia", 200, SERVER, HEADERS);
});

afterAll(async () => {
  server.close();
});
