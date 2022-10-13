import {
  BORRAR_AVISO_EXITOSO,
  BORRAR_AVISO_FALLIDO,
  BORRAR_AVISO_REQUEST,
  EDITAR_AVISO_EXITOSO,
  EDITAR_AVISO_FALLIDO,
  EDITAR_AVISO_REQUEST,
  GET_AVISOS_EXITOSO,
  GET_AVISOS_FALLIDO,
  GET_AVISOS_REQUEST,
  // GET_AVISO_BY_ID_EXITOSO,
  // GET_AVISO_BY_ID_FALLIDO,
  // GET_AVISO_BY_ID_REQUEST,
  GUARDAR_AVISO_EXITOSO,
  GUARDAR_AVISO_FALLIDO,
  GUARDAR_AVISO_REQUEST,
  LIMPIAR_MENSAJES_AVISOS,
} from '../../types';

const initialState = {
  dataAvisos: [],
  erroresAvisos: [],
  loadingAvisos: false,
  mensajeAvisos: '',
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  // console.log(payload)
  switch (type) {
    case GET_AVISOS_REQUEST:
      return {
        ...state,
        loadingAvisos: true,
      };
    case GET_AVISOS_EXITOSO:
      return {
        ...state,
        loadingAvisos: false,
        dataAvisos: payload,
      };
    case GET_AVISOS_FALLIDO:
      return {
        ...state,
        loadingAvisos: false,
        erroresAvisos: payload,
      };
    case GUARDAR_AVISO_REQUEST:
      return {
        ...state,
        loadingAvisos: true,
        erroresAvisos: [],
      };

    case GUARDAR_AVISO_EXITOSO:
      return {
        ...state,
        loadingAvisos: false,
        mensajeAvisos: 'Aviso agregado correctamente',
        erroresAvisos: [],
      };
    case GUARDAR_AVISO_FALLIDO:
      return {
        ...state,
        loadingAvisos: false,
        erroresAvisos: payload,
      };

    case EDITAR_AVISO_REQUEST:
      return {
        ...state,
        loadingAvisos: true,
        erroresAvisos: [],
      };

    case EDITAR_AVISO_EXITOSO:
      return {
        ...state,
        loadingAvisos: false,
        mensajeAvisos: 'Aviso editado correctamente',
        erroresAvisos: [],
      };
    case EDITAR_AVISO_FALLIDO:
      return {
        ...state,
        loadingAvisos: false,
        erroresAvisos: payload,
      };
    case BORRAR_AVISO_REQUEST:
      return {
        ...state,
        loadingAvisos: true,
      };

    case BORRAR_AVISO_EXITOSO:
      return {
        ...state,
        loadingAvisos: false,
        mensajeAvisos: 'Aviso borrado correctamente',
        dataAvisos: [],
      };
    case BORRAR_AVISO_FALLIDO:
      return {
        ...state,
        loadingAvisos: false,
        erroresAvisos: payload,
        dataAvisos: [],
      };
    case LIMPIAR_MENSAJES_AVISOS:
      return {
        ...state,
        mensajeAvisos: '',
        erroresAvisos: '',
      };
    default:
      return state;
  }
}
