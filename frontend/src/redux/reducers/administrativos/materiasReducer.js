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
} from '../../types';

const initialState = {
  dataMaterias: [],
  erroresMaterias: [],
  loadingMaterias: false,
  enviandoDatosMaterias: false,
  guardadoExistosoMateria: false,
  erroresGuardadoMateria: [],
  editandoDatosMaterias: false,
  editadoExistosoMateria: false,
  erroresEditarMateria: [],
  activandoDatosMateria: false,
  activadoExistosoMateria: false,
  erroresActivarMateria: [],
  desactivandoDatosMateria: false,
  desactivadoExistosoMateria: false,
  erroresDesactivarMateria: [],
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
      console.log(payload);
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
        erroresGuardadoMateria: [],
      };

    case GUARDAR_MATERIA_EXITOSO:
      return {
        ...state,
        enviandoDatosMaterias: false,
        guardadoExistosoMateria: true,
        erroresGuardadoMateria: [],
      };
    case GUARDAR_MATERIA_FALLIDO:
      return {
        ...state,
        enviandoDatosMaterias: false,
        guardadoExistosoMateria: false,
        erroresGuardadoMateria: payload,
      };
    case EDITAR_MATERIA_REQUEST:
      return {
        ...state,
        editandoDatosMaterias: true,
        erroresEditarMateria: [],
      };

    case EDITAR_MATERIA_EXITOSO:
      return {
        ...state,
        editandoDatosMaterias: false,
        editadoExistosoMateria: true,
        erroresEditarMateria: [],
      };
    case EDITAR_MATERIA_FALLIDO:
      return {
        ...state,
        editandoDatosMaterias: false,
        editadoExistosoMateria: false,
        erroresEditarMateria: payload,
      };
    case ACTIVAR_MATERIA_REQUEST:
      return {
        ...state,
        activandoDatosMateria: true,
      };

    case ACTIVAR_MATERIA_EXITOSO:
      return {
        ...state,
        activandoDatosMateria: false,
        activadoExistosoMateria: true,
      };
    case ACTIVAR_MATERIA_FALLIDO:
      return {
        ...state,
        activandoDatosMateria: false,
        activadoExistosoMateria: false,
        erroresActivarMateria: payload,
      };

    case DESACTIVAR_MATERIA_REQUEST:
      return {
        ...state,
        desactivandoDatosMateria: true,
      };

    case DESACTIVAR_MATERIA_EXITOSO:
      return {
        ...state,
        desactivandoDatosMateria: false,
        desactivadoExistosoMateria: true,
      };
    case DESACTIVAR_MATERIA_FALLIDO:
      return {
        ...state,
        desactivandoDatosMateria: false,
        desactivadoExistosoMateria: false,
        erroresDesactivarMateria: [],
      };
    default:
      return state;
  }
}
