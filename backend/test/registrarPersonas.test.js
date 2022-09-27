import supertest from "supertest";
import { crearUsuario } from "../helpers/tests/crearUsuarios.js";
import { getTokenTest } from "../helpers/tests/getToken.js";
import { testPost } from "../helpers/tests/tests.js";
import { vaciarColecciones } from "../helpers/tests/vaciarColecciones.js";
import { app, server } from "../index.js";

const SERVER = supertest(app);
const URL = "/api/usuarios";

const HEADERS = getTokenTest();

afterAll(async () => {
  try {
    await vaciarColecciones();
    await crearUsuario();
  } catch (error) {
    console.log(error);
  }
});

describe(`POST REGISTRAR ${URL}`, () => {
  const administrativoRegistrar = {
    nombre_persona: "Marcos",
    apellido_persona: "Franco",
    dni_persona: "12345679",
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
      tipo_documento: "Domicilio",
    },
    inasistencias: {
      fecha: "2022/09/20",
    },
    nombre_usuario: "marcosDAS",
    password_usuario: "asdbf",
    roles: {
      descripcion_rol: "administrativo",
      acceso_endpoint: ["notas", "post"],
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

  // const usuarioSinDocumentacion = { ...administrativoRegistrar };
  // usuarioSinDocumentacion.documentaciones = "";
  // testPost(URL, "Debe retornar un 400 si no se envia un objeto con los datos de documentaciones", usuarioSinDocumentacion, 400, SERVER, HEADERS);

  // const usuarioConTipoDocumentacionInexistente = { ...administrativoRegistrar };
  // usuarioConTipoDocumentacionInexistente.documentaciones = {
  //   url_documento: "https://dadas",
  //   tipo_documento: "Analiticoo",
  // };
  // testPost(URL, "Debe retornar un 400 si se envia un objeto con el tipo de documento incorrecto", usuarioConTipoDocumentacionInexistente, 400, SERVER, HEADERS);

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

afterAll(async () => {
  server.close();
});
