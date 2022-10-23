import {
  ACTIVAR_MATERIA_EXITOSO,
  ACTIVAR_MATERIA_FALLIDO,
  ACTIVAR_MATERIA_REQUEST,
  DESACTIVAR_MATERIA_EXITOSO,
  DESACTIVAR_MATERIA_FALLIDO,
  DESACTIVAR_MATERIA_REQUEST,
  EDITAR_MATERIA_EXITOSO,
  EDITAR_MATERIA_FALLIDO,
  EDITAR_MATERIA_REQUEST,
  FETCH_MATERIAS_EXITOSO,
  FETCH_MATERIAS_FALLIDO,
  FETCH_MATERIAS_REQUEST,
  GUARDAR_MATERIA_EXITOSO,
  GUARDAR_MATERIA_FALLIDO,
  GUARDAR_MATERIA_REQUEST,
  LIMPIAR_MENSAJES_MATERIAS,
} from '../../types';

const initialState = {
  dataMaterias: [],
  erroresMaterias: [],
  loadingMaterias: false,
  mensajesMaterias: '',
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_MATERIAS_REQUEST:
      return {
        ...state,
        loadingMaterias: true,
        erroresMaterias: [],
      };

    case FETCH_MATERIAS_EXITOSO:
      return {
        ...state,
        loadingMaterias: false,
        dataMaterias: payload,
        erroresMaterias: [],
      };
    case FETCH_MATERIAS_FALLIDO:
      return {
        ...state,
        loadingMaterias: false,
        dataMaterias: [],
        erroresMaterias: payload,
      };

    case GUARDAR_MATERIA_REQUEST:
      return {
        ...state,
        loadingMaterias: true,
        erroresMaterias: [],
      };

    case GUARDAR_MATERIA_EXITOSO:
      return {
        ...state,
        loadingMaterias: false,
        erroresMaterias: [],
        mensajesMaterias: 'Materia guardada correctamente',
      };
    case GUARDAR_MATERIA_FALLIDO:
      return {
        ...state,
        loadingMaterias: false,
        erroresMaterias: payload,
      };
    case EDITAR_MATERIA_REQUEST:
      return {
        ...state,
        loadingMaterias: true,
        erroresMaterias: [],
      };

    case EDITAR_MATERIA_EXITOSO:
      return {
        ...state,
        loadingMaterias: false,
        erroresMaterias: [],
        mensajesMaterias: 'Materia editada correctamente',
      };
    case EDITAR_MATERIA_FALLIDO:
      return {
        ...state,
        loadingMaterias: false,
        erroresMaterias: payload,
      };
    case ACTIVAR_MATERIA_REQUEST:
      return {
        ...state,
        loadingMaterias: true,
      };

    case ACTIVAR_MATERIA_EXITOSO:
      return {
        ...state,
        loadingMaterias: false,
        mensajesMaterias: 'Materia activada correctamente',
      };
    case ACTIVAR_MATERIA_FALLIDO:
      return {
        ...state,
        loadingMaterias: false,
        erroresMaterias: payload,
      };

    case DESACTIVAR_MATERIA_REQUEST:
      return {
        ...state,
        loadingMaterias: true,
      };

    case DESACTIVAR_MATERIA_EXITOSO:
      return {
        ...state,
        loadingMaterias: false,
        mensajesMaterias: 'Materia desactivada correctamente',
      };
    case DESACTIVAR_MATERIA_FALLIDO:
      return {
        ...state,
        loadingMaterias: false,
        erroresMaterias: [],
      };
    case LIMPIAR_MENSAJES_MATERIAS:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
