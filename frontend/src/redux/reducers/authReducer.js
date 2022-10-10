import {
  CARGAR_DATOS_USUARIO_EXITOSO,
  CARGAR_DATOS_USUARIO_FALLIDO,
  CARGAR_DATOS_USUARIO_REQUEST,
  CERRAR_SESION,
  INICIO_SESION_EXITOSO,
  INICIO_SESION_FALLIDO,
  INICIO_SESION_REQUEST,
} from '../types';

const initialState = {
  token: localStorage.getItem('token'),
  loading: false,
  user: {},
  error: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case INICIO_SESION_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case INICIO_SESION_EXITOSO:
      localStorage.setItem('token', payload.token);
      // localStorage.setItem('user', JSON.stringify(payload.user));
      return {
        ...state,
        loading: false,
        token: payload.token,
        error: [],
        user: payload.user,
      };
    case INICIO_SESION_FALLIDO:
      localStorage.removeItem('token');
      // localStorage.removeItem('user');
      return {
        ...state,
        loading: false,
        token: null,
        user: {},
        error: payload,
      };
    case CARGAR_DATOS_USUARIO_REQUEST:
      return {
        ...state,
        user: {},
      };

    case CARGAR_DATOS_USUARIO_EXITOSO:
      return {
        ...state,
        user: payload.userData,
      };
    case CARGAR_DATOS_USUARIO_FALLIDO:
      return {
        ...state,
        user: {},
      };
    case CERRAR_SESION:
      localStorage.removeItem('token');
      // localStorage.removeItem('user');
      return {
        ...state,
        loading: false,
        token: null,
        user: {},
        error: [],
      };
    default:
      return state;
  }
}
