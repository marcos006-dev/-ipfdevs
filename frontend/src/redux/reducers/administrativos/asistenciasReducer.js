import { GET_ASISTENCIAS_ALUMNOS_EXITOSO, GET_ASISTENCIAS_ALUMNOS_FALLIDO, GET_ASISTENCIAS_ALUMNOS_REQUEST, LIMPIAR_ASISTENCIAS_ALUMNOS, PUT_ASISTENCIAS_ALUMNOS_EXITOSO, PUT_ASISTENCIAS_ALUMNOS_FALLIDO, PUT_ASISTENCIAS_ALUMNOS_REQUEST } from "../../types";

const initialState = {
  dataAsistenciasAlumno: [],
  erroresAsistenciasAlumno: [],
  loadingAsistenciasAlumno: false,
  mensajeAsistenciasAlumno: '',
}

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ASISTENCIAS_ALUMNOS_REQUEST:
      return {
        ...state,
        loadingAsistenciasAlumno: true,
      };
    case GET_ASISTENCIAS_ALUMNOS_EXITOSO:
      return {
        ...state,
        loadingAsistenciasAlumno: false,
        dataAsistenciasAlumno: payload,
      };
    case GET_ASISTENCIAS_ALUMNOS_FALLIDO:
      return {
        ...state,
        loadingAsistenciasAlumno: false,
        erroresAsistenciasAlumno: payload,
      };
    case PUT_ASISTENCIAS_ALUMNOS_REQUEST:
      return {
        ...state,
        loadingAsistenciasAlumno: true,
        erroresAsistenciasAlumno: [],
      };

    case PUT_ASISTENCIAS_ALUMNOS_EXITOSO:
      return {
        ...state,
        loadingAsistenciasAlumno: false,
        erroresAsistenciasAlumno: [],
        mensajeAsistenciasAlumno: 'Asistencia realizada correctamente',
      };
    case PUT_ASISTENCIAS_ALUMNOS_FALLIDO:
      return {
        ...state,
        loadingAsistenciasAlumno: false,
        erroresAsistenciasAlumno: payload,
      };
    case LIMPIAR_ASISTENCIAS_ALUMNOS:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}