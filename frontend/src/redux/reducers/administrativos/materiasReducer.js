import {
  FETCH_MATERIAS_EXITOSO,
  FETCH_MATERIAS_FALLIDO,
  FETCH_MATERIAS_REQUEST,
  GUARDAR_MATERIA_EXITOSO,
  GUARDAR_MATERIA_FALLIDO,
  GUARDAR_MATERIA_REQUEST,
} from '../../types';

const initialState = {
  dataMaterias: [],
  erroresMaterias: [],
  loadingMaterias: false,
  enviandoDatosMaterias: false,
  guardadoExistoso: false,
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
        enviandoDatosMaterias: true,
        erroresMaterias: [],
      };

    case GUARDAR_MATERIA_EXITOSO:
      return {
        ...state,
        enviandoDatosMaterias: false,
        guardadoExistoso: true,
        erroresMaterias: [],
      };
    case GUARDAR_MATERIA_FALLIDO:
      return {
        ...state,
        enviandoDatosMaterias: false,
        guardadoExistoso: false,
        erroresMaterias: payload,
      };
    default:
      return state;
  }
}
