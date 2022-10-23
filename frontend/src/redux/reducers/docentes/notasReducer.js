import {
  EDITAR_NOTAS_DOCENTE_EXITOSO,
  EDITAR_NOTAS_DOCENTE_FALLIDO,
  EDITAR_NOTAS_DOCENTE_REQUEST,
  ELIMINAR_NOTAS_DOCENTE_EXITOSO,
  ELIMINAR_NOTAS_DOCENTE_FALLIDO,
  ELIMINAR_NOTAS_DOCENTE_REQUEST,
  GET_NOTAS_DOCENTE_EXITOSO,
  GET_NOTAS_DOCENTE_FALLIDO,
  GET_NOTAS_DOCENTE_REQUEST,
  GET_NOTAS_MATERIAS_DOCENTE_EXITOSO,
  GET_NOTAS_MATERIAS_DOCENTE_FALLIDO,
  GET_NOTAS_MATERIAS_DOCENTE_REQUEST,
  LIMPIAR_MENSAJES_NOTAS_DOCENTE,
} from '../../types';

const initialState = {
  dataNotasDocente: [],
  erroresNotasDocente: [],
  loadingNotasDocente: false,
  dataNotasMateriasDocente: [],
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
    case GET_NOTAS_MATERIAS_DOCENTE_REQUEST:
      return {
        ...state,
        loadingNotasDocente: true,
      };
    case GET_NOTAS_MATERIAS_DOCENTE_EXITOSO:
      return {
        ...state,
        loadingNotasDocente: false,
        dataNotasMateriasDocente: payload,
      };
    case GET_NOTAS_MATERIAS_DOCENTE_FALLIDO:
      return {
        ...state,
        loadingNotasDocente: false,
        erroresNotasDocente: payload,
      };

    case EDITAR_NOTAS_DOCENTE_REQUEST:
      return {
        ...state,
        loadingNotasDocente: true,
        erroresNotasDocente: [],
      };

    case EDITAR_NOTAS_DOCENTE_EXITOSO:
      return {
        ...state,
        loadingNotasDocente: false,
        erroresNotasDocente: [],
        mensajeNotasDocente: 'Cambios realizados correctamente',
      };
    case EDITAR_NOTAS_DOCENTE_FALLIDO:
      return {
        ...state,
        loadingNotasDocente: false,
        erroresNotasDocente: payload,
      };
    case ELIMINAR_NOTAS_DOCENTE_REQUEST:
      return {
        ...state,
        loadingNotasDocente: true,
      };

    case ELIMINAR_NOTAS_DOCENTE_EXITOSO:
      return {
        ...state,
        loadingNotasDocente: false,
        mensajeNotasDocente: 'Notas borradas correctamente',
        dataNotasDocente: [],
      };
    case ELIMINAR_NOTAS_DOCENTE_FALLIDO:
      return {
        ...state,
        loadingNotasDocente: false,
        erroresNotasDocente: payload,
      };
    case LIMPIAR_MENSAJES_NOTAS_DOCENTE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
