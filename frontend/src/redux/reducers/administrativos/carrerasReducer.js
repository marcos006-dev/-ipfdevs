import {
  GET_CARRERAS_EXITOSO,
  GET_CARRERAS_FALLIDO,
  GET_CARRERAS_REQUEST,
  LIMPIAR_MENSAJES_CARRERAS,
} from '../../types';

const initialState = {
  dataCarreras: [],
  erroresCarreras: [],
  loadingCarreras: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
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
      };
    case GET_CARRERAS_FALLIDO:
      return {
        ...state,
        loadingCarreras: false,
        erroresCarreras: payload,
      };
    case LIMPIAR_MENSAJES_CARRERAS:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}
