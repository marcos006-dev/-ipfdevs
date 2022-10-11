import {
  GET_CARRERAS_EXITOSO,
  GET_CARRERAS_FALLIDO,
  GET_CARRERAS_REQUEST,
  GET_USUARIOS_EXITOSO,
  GET_USUARIOS_FALLIDO,
  GET_USUARIOS_REQUEST,
  GUARDAR_USUARIO_EXITOSO,
  GUARDAR_USUARIO_FALLIDO,
  GUARDAR_USUARIO_REQUEST,
} from '../../types';

const initialState = {
  dataUsuarios: [],
  erroresUsuarios: [],
  loadingUsuarios: false,
  dataCarreras: [],
  erroresCarreras: [],
  loadingCarreras: false,
  enviandoDatosUsuario: false,
  guardadoExistosoUsuario: false,
  erroresGuardadoUsuario: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USUARIOS_REQUEST:
      return {
        ...state,
        loadingUsuarios: true,
      };
    case GET_USUARIOS_EXITOSO:
      return {
        ...state,
        loadingUsuarios: false,
        dataUsuarios: payload,
        // erroresUsuarios: [],
      };
    case GET_USUARIOS_FALLIDO:
      return {
        ...state,
        loadingUsuarios: false,
        // dataUsuarios: [],
        erroresUsuarios: payload,
      };
    case GET_CARRERAS_REQUEST:
      return {
        ...state,
        loadingCarreras: true,
      };
    case GET_CARRERAS_EXITOSO:
      return {
        ...state,
        loadingCarreras: false,
        dataCarreras: payload,
        // erroresCarreras: [],
      };
    case GET_CARRERAS_FALLIDO:
      return {
        ...state,
        loadingCarreras: false,
        // dataCarreras: [],
        erroresCarreras: payload,
      };
    case GUARDAR_USUARIO_REQUEST:
      return {
        ...state,
        enviandoDatosUsuario: true,
        erroresGuardadoUsuario: [],
      };

    case GUARDAR_USUARIO_EXITOSO:
      return {
        ...state,
        enviandoDatosUsuario: false,
        guardadoExistosoUsuario: true,
        erroresGuardadoUsuario: [],
      };
    case GUARDAR_USUARIO_FALLIDO:
      return {
        ...state,
        enviandoDatosUsuario: false,
        guardadoExistosoUsuario: false,
        erroresGuardadoUsuario: payload,
      };
    default:
      return state;
  }
}
