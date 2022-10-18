import {
  GET_HORARIOS_DOCENTE_EXITOSO,
  GET_HORARIOS_DOCENTE_FALLIDO,
  GET_HORARIOS_DOCENTE_REQUEST,
  LIMPIAR_MENSAJES_HORARIOS_DOCENTE,
} from '../../types';

const initialState = {
  dataHorariosDocente: [],
  erroresHorariosDocente: [],
  loadingHorariosDocente: false,
  mensajeHorariosDocente: '',
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_HORARIOS_DOCENTE_REQUEST:
      return {
        ...state,
        loadingHorariosDocente: true,
      };
    case GET_HORARIOS_DOCENTE_EXITOSO:
      return {
        ...state,
        loadingHorariosDocente: false,
        dataHorariosDocente: payload,
      };
    case GET_HORARIOS_DOCENTE_FALLIDO:
      return {
        ...state,
        loadingHorariosDocente: false,
        erroresHorariosDocente: payload,
      };
    case LIMPIAR_MENSAJES_HORARIOS_DOCENTE:
      return {
        ...state,
        erroresHorariosDocente: '',
        mensajeHorariosDocente: '',
      };
    default:
      return state;
  }
}
