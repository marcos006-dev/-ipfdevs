import {
  GET_NOTAS_DOCENTE_EXITOSO,
  GET_NOTAS_DOCENTE_FALLIDO,
  GET_NOTAS_DOCENTE_REQUEST,
  LIMPIAR_MENSAJES_NOTAS_DOCENTE,
} from '../../types';

const initialState = {
  dataNotasDocente: [],
  erroresNotasDocente: [],
  loadingNotasDocente: false,
  mensajeNotasDocente: '',
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_NOTAS_DOCENTE_REQUEST:
      return {
        ...state,
        loadingNotasDocente: true,
      };
    case GET_NOTAS_DOCENTE_EXITOSO:
      return {
        ...state,
        loadingNotasDocente: false,
        dataNotasDocente: payload,
      };
    case GET_NOTAS_DOCENTE_FALLIDO:
      return {
        ...state,
        loadingNotasDocente: false,
        erroresNotasDocente: payload,
      };
    case LIMPIAR_MENSAJES_NOTAS_DOCENTE:
      return {
        ...state,
        erroresNotasDocente: '',
        mensajeNotasDocente: '',
      };
    default:
      return state;
  }
}
