import {
  GET_HORARIOS_ALUMNO_EXITOSO,
  GET_HORARIOS_ALUMNO_FALLIDO,
  GET_HORARIOS_ALUMNO_REQUEST,
  LIMPIAR_MENSAJES_HORARIOS_ALUMNO,
} from '../../types';

const initialState = {
  dataHorariosAlumno: [],
  erroresHorariosAlumno: [],
  loadingHorariosAlumno: false,
  mensajeHorariosAlumno: '',
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_HORARIOS_ALUMNO_REQUEST:
      return {
        ...state,
        loadingHorariosAlumno: true,
      };
    case GET_HORARIOS_ALUMNO_EXITOSO:
      return {
        ...state,
        loadingHorariosAlumno: false,
        dataHorariosAlumno: payload,
      };
    case GET_HORARIOS_ALUMNO_FALLIDO:
      return {
        ...state,
        loadingHorariosAlumno: false,
        erroresHorariosAlumno: payload,
      };
    case LIMPIAR_MENSAJES_HORARIOS_ALUMNO:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
