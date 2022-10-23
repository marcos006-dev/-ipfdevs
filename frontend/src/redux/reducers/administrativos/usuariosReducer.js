import {
  ACTIVAR_USUARIO_EXITOSO,
  ACTIVAR_USUARIO_FALLIDO,
  ACTIVAR_USUARIO_REQUEST,
  DESACTIVAR_USUARIO_EXITOSO,
  DESACTIVAR_USUARIO_FALLIDO,
  DESACTIVAR_USUARIO_REQUEST,
  EDITAR_USUARIO_EXITOSO,
  EDITAR_USUARIO_FALLIDO,
  EDITAR_USUARIO_REQUEST,
  GET_USUARIOS_EXITOSO,
  GET_USUARIOS_FALLIDO,
  GET_USUARIOS_REQUEST,
  GUARDAR_USUARIO_EXITOSO,
  GUARDAR_USUARIO_FALLIDO,
  GUARDAR_USUARIO_REQUEST,
  LIMPIAR_MENSAJES_USUARIOS,
} from '../../types';

const initialState = {
  dataUsuarios: [],
  erroresUsuarios: [],
  loadingUsuarios: false,
  mensajeUsuarios: '',
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
      };
    case GET_USUARIOS_FALLIDO:
      return {
        ...state,
        loadingUsuarios: false,
        erroresUsuarios: payload,
      };

    case GUARDAR_USUARIO_REQUEST:
      return {
        ...state,
        loadingUsuarios: true,
        erroresUsuarios: [],
      };

    case GUARDAR_USUARIO_EXITOSO:
      return {
        ...state,
        loadingUsuarios: false,
        mensajeUsuarios: 'Usuario agregado correctamente',
        erroresUsuarios: [],
      };
    case GUARDAR_USUARIO_FALLIDO:
      return {
        ...state,
        loadingUsuarios: false,
        erroresUsuarios: payload,
      };

    case EDITAR_USUARIO_REQUEST:
      return {
        ...state,
        loadingUsuarios: true,
        erroresUsuarios: [],
      };

    case EDITAR_USUARIO_EXITOSO:
      return {
        ...state,
        loadingUsuarios: false,
        mensajeUsuarios: 'Usuario editado correctamente',
        erroresUsuarios: [],
      };
    case EDITAR_USUARIO_FALLIDO:
      return {
        ...state,
        loadingUsuarios: false,
        erroresUsuarios: payload,
      };

    case DESACTIVAR_USUARIO_REQUEST:
      return {
        ...state,
        loadingUsuarios: true,
      };

    case DESACTIVAR_USUARIO_EXITOSO:
      return {
        ...state,
        loadingUsuarios: false,
        mensajeUsuarios: 'Usuario desactivado correctamente',
      };
    case DESACTIVAR_USUARIO_FALLIDO:
      return {
        ...state,
        loadingUsuarios: false,
        erroresUsuarios: payload,
      };
    case ACTIVAR_USUARIO_REQUEST:
      return {
        ...state,
        loadingUsuarios: true,
      };

    case ACTIVAR_USUARIO_EXITOSO:
      return {
        ...state,
        loadingUsuarios: false,
        mensajeUsuarios: 'Usuario activado correctamente',
      };
    case ACTIVAR_USUARIO_FALLIDO:
      return {
        ...state,
        loadingUsuarios: false,
        erroresUsuarios: payload,
      };
    case LIMPIAR_MENSAJES_USUARIOS:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
