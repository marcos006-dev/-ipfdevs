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
const URL = "/api/administrativos";

const _idUsuario = mongoose.Types.ObjectId();
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

  testGet(URL, "Debe retornar un json con los registros de administrativos", 200, SERVER, HEADERS);

  testGet(URL, "Debe retornar un status-code 200", 200, SERVER, HEADERS);
});

describe(`GET ${URL}/:id`, () => {
  testGet(`${URL}/${_idUsuario}`, "Debe retornar un error al no enviar el token", 401, SERVER, {});

  testGet(`${URL}/${_idUsuario}`, "Debe retornar un json con el registro encontrado", 200, SERVER, HEADERS);

  testGet(`${URL}/${_idUsuario}`, "Debe retornar un status-code 200", 200, SERVER, HEADERS);

  testGet(`${URL}/6335ccec8c88484ac3dc5cd7`, "Si no existe debe retornar un json con un mensaje de id no existe en la bd", 400, SERVER, HEADERS);
});

describe(`POST ADMINISTRATIVO ${URL}`, () => {
  // console.log(usuario);

  const administrativoRegistrar = {
    nombre_persona: "Marcos",
    apellido_persona: "Franco",
    dni_persona: "12345671",
    cuil_persona: "12345678902",
    fecha_nac_persona: "2022/09/01",
    sexo_persona: "Masculino",
    correo_persona: "correo2@gmail.com",
    telefono_persona: "3704652812",
    direccion_persona: {
      manzana: "66",
      casa: "13",
      sector: "-",
      lote: "-",
      parcela: "-",
    },
    documentaciones: {
      url_documento: "https://algunlado.com",
      tipo_documento: "domicilio",
    },
    inasistencias: {
      fecha: "2022/09/20",
    },
    _materia: [],
    nombre_usuario: "marcosDAS",
    password_usuario: "asdbf",
    roles: {
      descripcion_rol: "administrativo",
      acceso_endpoint: ["administrativos"],
    },
  };

  testPost(URL, "Debe retornar un error al no enviar el token", administrativoRegistrar, 401, SERVER);

  const usuarioSinNombre = { ...administrativoRegistrar };
  usuarioSinNombre.nombre_persona = "";
  testPost(URL, "Debe retornar un 400 si no se envia el nombre de la persona", usuarioSinNombre, 400, SERVER, HEADERS);

  const usuarioSinApellido = { ...administrativoRegistrar };
  usuarioSinApellido.apellido_persona = "";
  testPost(URL, "Debe retornar un 400 si no se envia el apellido de la persona", usuarioSinApellido, 400, SERVER, HEADERS);

  const usuarioSinDni = { ...administrativoRegistrar };
  usuarioSinDni.dni_persona = "";
  testPost(URL, "Debe retornar un 400 si no se envia el dni de la persona", usuarioSinDni, 400, SERVER, HEADERS);

  const usuarioConDniLargo = { ...administrativoRegistrar };
  usuarioConDniLargo.dni_persona = "123456789";
  testPost(URL, "Debe retornar un 400 si el dni de la persona con una longitud superior a 8 digitos", usuarioConDniLargo, 400, SERVER, HEADERS);

  const usuarioConDniCorto = { ...administrativoRegistrar };
  usuarioConDniCorto.dni_persona = "1234569";
  testPost(URL, "Debe retornar un 400 si el dni de la persona con una longitud menor a 8 digitos", usuarioConDniCorto, 400, SERVER, HEADERS);

  const usuarioConDniRepetido = { ...administrativoRegistrar };
  usuarioConDniRepetido.dni_persona = "12345678";
  testPost(URL, "Debe retornar un 400 si se envia un dni ya guardado en la base de datos", usuarioConDniRepetido, 400, SERVER, HEADERS);

  const usuarioSinFechaNac = { ...administrativoRegistrar };
  usuarioSinFechaNac.fecha_nac_persona = "";
  testPost(URL, "Debe retornar un 400 si no se envia la fecha de nacimiento de la persona", usuarioSinFechaNac, 400, SERVER, HEADERS);

  const usuarioConFechaNacInvalida = { ...administrativoRegistrar };
  usuarioConFechaNacInvalida.fecha_nac_persona = "09/09/2022";
  testPost(URL, "Debe retornar un 400 si no se envia la fecha de nacimiento de la persona con un formato equivocado", usuarioConFechaNacInvalida, 400, SERVER, HEADERS);

  const usuarioSinCorreo = { ...administrativoRegistrar };
  usuarioSinCorreo.correo_persona = "";
  testPost(URL, "Debe retornar un 400 si no se envia el correo de la persona", usuarioSinCorreo, 400, SERVER, HEADERS);

  const usuarioConCorreoInvalido = { ...administrativoRegistrar };
  usuarioConCorreoInvalido.correo_persona = "dasdsasdagmail.com";
  testPost(URL, "Debe retornar un 400 si se envia un correo invalido", usuarioConCorreoInvalido, 400, SERVER, HEADERS);

  const usuarioConCorreoYaRegistrado = { ...administrativoRegistrar };
  usuarioConCorreoYaRegistrado.correo_persona = "correo1@gmail.com";
  testPost(URL, "Debe retornar un 400 si se envia un correo ya registrado", usuarioConCorreoYaRegistrado, 400, SERVER, HEADERS);

  const usuarioSinTelefono = { ...administrativoRegistrar };
  usuarioSinTelefono.telefono_persona = "";
  testPost(URL, "Debe retornar un 400 si no se envia un numero de telefono", usuarioSinTelefono, 400, SERVER, HEADERS);

  const usuarioConTelefonoIncompleto = { ...administrativoRegistrar };
  usuarioConTelefonoIncompleto.telefono_persona = "370491122";
  testPost(URL, "Debe retornar un 400 si no se envia un numero de telefono completo", usuarioConTelefonoIncompleto, 400, SERVER, HEADERS);

  const usuarioConLetrasTelefono = { ...administrativoRegistrar };
  usuarioConLetrasTelefono.telefono_persona = "aaaaaaaaa";
  testPost(URL, "Debe retornar un 400 si se envia un numero de telefono con letras", usuarioConLetrasTelefono, 400, SERVER, HEADERS);

  const usuarioConTelefonoYaGuardado = { ...administrativoRegistrar };
  usuarioConTelefonoYaGuardado.telefono_persona = "3704652811";
  testPost(URL, "Debe retornar un 400 si se envia un numero de telefono ya guardado en la base de datos", usuarioConTelefonoYaGuardado, 400, SERVER, HEADERS);

  const usuarioSinDireccion = { ...administrativoRegistrar };
  usuarioSinDireccion.direccion_persona = "";
  testPost(URL, "Debe retornar un 400 si no se envia un objeto con los datos de direccion", usuarioSinDireccion, 400, SERVER, HEADERS);

  const usuarioAdministrativo = { ...administrativoRegistrar };
  usuarioAdministrativo._materia = [{ _idMateria }];
  testPost(URL, "Debe retornar un 400 si se envian materias al cargar un nuevo administrativo", usuarioAdministrativo, 400, SERVER, HEADERS);

  const usuarioAlumno = { ...administrativoRegistrar };
  usuarioAlumno._materia = [];
  usuarioAlumno.roles = {
    descripcion_rol: "alumno",
    acceso_endpoint: ["alumnos"],
  };
  testPost(URL, "Debe retornar un 400 si no se envian materias al cargar un nuevo alumno", usuarioAlumno, 400, SERVER, HEADERS);

  const usuarioSinUserName = { ...administrativoRegistrar };
  usuarioSinUserName.nombre_usuario = "";
  testPost(URL, "Debe retornar un 400 si no se envia un nombre de usuario", usuarioSinUserName, 400, SERVER, HEADERS);

  const usuarioConUserNameRegistrado = { ...administrativoRegistrar };
  usuarioConUserNameRegistrado.nombre_usuario = "marcos";
  testPost(URL, "Debe retornar un 400 si se envia un nombre de usuario ya registrado", usuarioConUserNameRegistrado, 400, SERVER, HEADERS);

  const usuarioSinPassword = { ...administrativoRegistrar };
  usuarioSinPassword.password_usuario = "";
  testPost(URL, "Debe retornar un 400 si no se envia una contraseña", usuarioSinPassword, 400, SERVER, HEADERS);

  const usuarioConPasswordCorto = { ...administrativoRegistrar };
  usuarioConPasswordCorto.password_usuario = "123";
  testPost(URL, "Debe retornar un 400 si se envia una contraseña menor a 4 caracteres", usuarioConPasswordCorto, 400, SERVER, HEADERS);

  const usuarioConRolPersonaVacia = { ...administrativoRegistrar };
  usuarioConRolPersonaVacia.roles = "";
  testPost(URL, "Debe retornar un 400 si no se envia un rol de persona", usuarioConRolPersonaVacia, 400, SERVER, HEADERS);

  const usuarioConRolPersonaInexistente = { ...administrativoRegistrar };
  usuarioConRolPersonaInexistente.roles = { descripcion_rol: "alumne" };
  testPost(URL, "Debe retornar un 400 si se envia un rol de persona que no existe en la bd", usuarioConRolPersonaInexistente, 400, SERVER, HEADERS);

  testPost(URL, "Debe retornar un status code 200 si el usuario se registra de forma exitosa", administrativoRegistrar, 200, SERVER, HEADERS);
});

describe(`PUT ADMINISTRATIVO ${URL}`, () => {
  const administrativoEditar = {
    nombre_persona: "Marcoss",
    apellido_persona: "Francoo",
    dni_persona: "12345679",
    cuil_persona: "12345678908",
    fecha_nac_persona: "2022/09/01",
    sexo_persona: "Masculino",
    correo_persona: "correo24@gmail.com",
    telefono_persona: "3704652810",
    direccion_persona: {
      manzana: "66",
      casa: "13",
      sector: "-",
      lote: "-",
      parcela: "-",
    },
    documentaciones: {
      url_documento: "https://algunlado.com",
      tipo_documento: "domicilio",
    },
    inasistencias: {
      fecha: "2022/09/20",
    },
    _materia: [],
    nombre_usuario: "marcosDASs",
    password_usuario: "asdbf",
    roles: {
      descripcion_rol: "administrativo",
      acceso_endpoint: ["administrativos", "materias"],
    },
  };

  testPut(`${URL}/${_idUsuario}`, "Debe retornar un error al no enviar el token", administrativoEditar, 401, SERVER, {});

  testPut(`${URL}/${_idUsuario}56sa`, "Debe retornar un error al no enviar un id de mongo valido", administrativoEditar, 400, SERVER, HEADERS);

  testPut(`${URL}/6335c1c5cd6b7182c6dd7b8b`, "Debe retornar un error al enviar un id que no esta asociado a ningun registro en la bd", administrativoEditar, 400, SERVER, HEADERS);

  const usuarioSinNombre = { ...administrativoEditar };
  usuarioSinNombre.nombre_persona = "";
  testPut(`${URL}/${_idUsuario}`, "Debe retornar un 400 si no se envia el nombre de la persona", usuarioSinNombre, 400, SERVER, HEADERS);

  const usuarioSinApellido = { ...administrativoEditar };
  usuarioSinApellido.apellido_persona = "";
  testPut(`${URL}/${_idUsuario}`, "Debe retornar un 400 si no se envia el apellido de la persona", usuarioSinApellido, 400, SERVER, HEADERS);

  const usuarioSinDni = { ...administrativoEditar };
  usuarioSinDni.dni_persona = "";
  testPut(`${URL}/${_idUsuario}`, "Debe retornar un 400 si no se envia el dni de la persona", usuarioSinDni, 400, SERVER, HEADERS);

  const usuarioConDniLargo = { ...administrativoEditar };
  usuarioConDniLargo.dni_persona = "123456789";
  testPut(`${URL}/${_idUsuario}`, "Debe retornar un 400 si el dni de la persona con una longitud superior a 8 digitos", usuarioConDniLargo, 400, SERVER, HEADERS);

  const usuarioConDniCorto = { ...administrativoEditar };
  usuarioConDniCorto.dni_persona = "1234569";
  testPut(`${URL}/${_idUsuario}`, "Debe retornar un 400 si el dni de la persona con una longitud menor a 8 digitos", usuarioConDniCorto, 400, SERVER, HEADERS);

  const usuarioConDniRepetido = { ...administrativoEditar };
  usuarioConDniRepetido.dni_persona = "12345671";
  testPut(`${URL}/${_idUsuario}`, "Debe retornar un 400 si se envia un dni ya guardado en la base de datos", usuarioConDniRepetido, 400, SERVER, HEADERS);

  const usuarioSinFechaNac = { ...administrativoEditar };
  usuarioSinFechaNac.fecha_nac_persona = "";
  testPut(`${URL}/${_idUsuario}`, "Debe retornar un 400 si no se envia la fecha de nacimiento de la persona", usuarioSinFechaNac, 400, SERVER, HEADERS);

  const usuarioConFechaNacInvalida = { ...administrativoEditar };
  usuarioConFechaNacInvalida.fecha_nac_persona = "09/09/2022";
  testPut(`${URL}/${_idUsuario}`, "Debe retornar un 400 si no se envia la fecha de nacimiento de la persona con un formato equivocado", usuarioConFechaNacInvalida, 400, SERVER, HEADERS);

  const usuarioSinCorreo = { ...administrativoEditar };
  usuarioSinCorreo.correo_persona = "";
  testPut(`${URL}/${_idUsuario}`, "Debe retornar un 400 si no se envia el correo de la persona", usuarioSinCorreo, 400, SERVER, HEADERS);

  const usuarioConCorreoInvalido = { ...administrativoEditar };
  usuarioConCorreoInvalido.correo_persona = "dasdsasdagmail.com";
  testPut(`${URL}/${_idUsuario}`, "Debe retornar un 400 si se envia un correo invalido", usuarioConCorreoInvalido, 400, SERVER, HEADERS);

  const usuarioConCorreoYaRegistrado = { ...administrativoEditar };
  usuarioConCorreoYaRegistrado.correo_persona = "correo2@gmail.com";
  testPut(`${URL}/${_idUsuario}`, "Debe retornar un 400 si se envia un correo ya registrado", usuarioConCorreoYaRegistrado, 400, SERVER, HEADERS);

  const usuarioSinTelefono = { ...administrativoEditar };
  usuarioSinTelefono.telefono_persona = "";
  testPut(`${URL}/${_idUsuario}`, "Debe retornar un 400 si no se envia un numero de telefono", usuarioSinTelefono, 400, SERVER, HEADERS);

  const usuarioConTelefonoIncompleto = { ...administrativoEditar };
  usuarioConTelefonoIncompleto.telefono_persona = "370491122";
  testPut(`${URL}/${_idUsuario}`, "Debe retornar un 400 si no se envia un numero de telefono completo", usuarioConTelefonoIncompleto, 400, SERVER, HEADERS);

  const usuarioConLetrasTelefono = { ...administrativoEditar };
  usuarioConLetrasTelefono.telefono_persona = "aaaaaaaaa";
  testPut(`${URL}/${_idUsuario}`, "Debe retornar un 400 si se envia un numero de telefono con letras", usuarioConLetrasTelefono, 400, SERVER, HEADERS);

  const usuarioConTelefonoYaGuardado = { ...administrativoEditar };
  usuarioConTelefonoYaGuardado.telefono_persona = "3704652812";
  testPut(`${URL}/${_idUsuario}`, "Debe retornar un 400 si se envia un numero de telefono ya guardado en la base de datos", usuarioConTelefonoYaGuardado, 400, SERVER, HEADERS);

  const usuarioSinDireccion = { ...administrativoEditar };
  usuarioSinDireccion.direccion_persona = "";
  testPut(`${URL}/${_idUsuario}`, "Debe retornar un 400 si no se envia un objeto con los datos de direccion", usuarioSinDireccion, 400, SERVER, HEADERS);

  const usuarioAdministrativo = { ...administrativoEditar };
  usuarioAdministrativo._materia = [{ _idMateria }];
  testPost(URL, "Debe retornar un 400 si se envian materias al cargar un nuevo administrativo", usuarioAdministrativo, 400, SERVER, HEADERS);

  const usuarioAlumno = { ...administrativoEditar };
  usuarioAlumno._materia = [];
  usuarioAlumno.roles = {
    descripcion_rol: "alumno",
    acceso_endpoint: ["alumnos"],
  };
  testPost(URL, "Debe retornar un 400 si no se envian materias al cargar un nuevo alumno", usuarioAlumno, 400, SERVER, HEADERS);

  const usuarioSinUserName = { ...administrativoEditar };
  usuarioSinUserName.nombre_usuario = "";
  testPut(`${URL}/${_idUsuario}`, "Debe retornar un 400 si no se envia un nombre de usuario", usuarioSinUserName, 400, SERVER, HEADERS);

  const usuarioConUserNameRegistrado = { ...administrativoEditar };
  usuarioConUserNameRegistrado.nombre_usuario = "marcosDAS";
  testPut(`${URL}/${_idUsuario}`, "Debe retornar un 400 si se envia un nombre de usuario ya registrado", usuarioConUserNameRegistrado, 400, SERVER, HEADERS);

  const usuarioSinPassword = { ...administrativoEditar };
  usuarioSinPassword.password_usuario = "";
  testPut(`${URL}/${_idUsuario}`, "Debe retornar un 400 si no se envia una contraseña", usuarioSinPassword, 400, SERVER, HEADERS);

  const usuarioConPasswordCorto = { ...administrativoEditar };
  usuarioConPasswordCorto.password_usuario = "123";
  testPut(`${URL}/${_idUsuario}`, "Debe retornar un 400 si se envia una contraseña menor a 4 caracteres", usuarioConPasswordCorto, 400, SERVER, HEADERS);

  const usuarioConRolPersonaVacia = { ...administrativoEditar };
  usuarioConRolPersonaVacia.roles = "";
  testPut(`${URL}/${_idUsuario}`, "Debe retornar un 400 si no se envia un rol de persona", usuarioConRolPersonaVacia, 400, SERVER, HEADERS);

  const usuarioConRolPersonaInexistente = { ...administrativoEditar };
  usuarioConRolPersonaInexistente.roles = { descripcion_rol: "administrative" };
  testPut(`${URL}/${_idUsuario}`, "Debe retornar un 400 si se envia un rol de persona que no existe en la bd", usuarioConRolPersonaInexistente, 400, SERVER, HEADERS);

  testPut(`${URL}/${_idUsuario}`, "Debe retornar un 200 si se actualiza correctamente el registro", administrativoEditar, 200, SERVER, HEADERS);
});

describe(`DELETE ${URL}/:id`, () => {
  testDelete(`${URL}/6335ccec8c88484ac3dc5cd7`, "Debe retornar un error al no enviar el token", 401, SERVER, {});

  testDelete(`${URL}/56335ccec8c88484ac3dc5cd7`, "Eliminar un administrativo con un id inexistente", 400, SERVER, HEADERS);

  testDelete(`${URL}/${_idUsuario}`, "Debe retornar un status-code 200 al desactivar un administrativo", 200, SERVER, HEADERS);
});

describe(`ACTIVAR ${URL}/:id`, () => {
  testActivar(`${URL}/6335ccec8c88484ac3dc5cd7`, "Debe retornar un error al no enviar el token", 401, SERVER, {});

  testActivar(`${URL}/56335ccec8c88484ac3dc5cd7`, "Activar un administrativo con un id inexistente", 400, SERVER, HEADERS);

  testActivar(`${URL}/${_idUsuario}`, "Debe retornar un status-code 200 al activar un administrativo", 200, SERVER, HEADERS);
});

// CARGAR INASISTENCIAS

// EDITAR INASISTENCIAS

// OBTENER CARRERAS

afterAll(async () => {
  server.close();
});
