import {
  GET_NOTAS_ALUMNO_EXITOSO,
  GET_NOTAS_ALUMNO_FALLIDO,
  GET_NOTAS_ALUMNO_REQUEST,
  LIMPIAR_MENSAJES_NOTAS_ALUMNO,
} from '../../types';

const initialState = {
  dataNotasAlumno: [],
  erroresNotasAlumno: [],
  loadingNotasAlumno: false,
  mensajeNotasAlumno: '',
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_NOTAS_ALUMNO_REQUEST:
      return {
        ...state,
        loadingNotasAlumno: true,
      };
    case GET_NOTAS_ALUMNO_EXITOSO:
      return {
        ...state,
        loadingNotasAlumno: false,
        dataNotasAlumno: payload,
      };
    case GET_NOTAS_ALUMNO_FALLIDO:
      return {
        ...state,
        loadingNotasAlumno: false,
        erroresNotasAlumno: payload,
      };
    case LIMPIAR_MENSAJES_NOTAS_ALUMNO:
      return {
        ...state,
        erroresNotasAlumno: '',
        mensajeNotasAlumno: '',
      };
    default:
      return state;
  }
}
