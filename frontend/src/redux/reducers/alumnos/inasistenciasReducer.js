import {
  GET_INASISTENCIAS_EXITOSO,
  GET_INASISTENCIAS_FALLIDO,
  GET_INASISTENCIAS_REQUEST,
  LIMPIAR_MENSAJES_INASISTENCIAS,
} from '../../types';

const initialState = {
  dataInasistencias: [],
  erroresInasistencias: [],
  loadingInasistencias: false,
  mensajeInasistencias: '',
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_INASISTENCIAS_REQUEST:
      return {
        ...state,
        loadingInasistencias: true,
      };
    case GET_INASISTENCIAS_EXITOSO:
      return {
        ...state,
        loadingInasistencias: false,
        dataInasistencias: payload,
      };
    case GET_INASISTENCIAS_FALLIDO:
      return {
        ...state,
        loadingInasistencias: false,
        erroresInasistencias: payload,
      };
    case LIMPIAR_MENSAJES_INASISTENCIAS:
      return {
        ...state,
        erroresInasistencias: '',
        mensajeInasistencias: '',
      };
    default:
      return state;
  }
}
