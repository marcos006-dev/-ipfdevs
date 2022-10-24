import { GET_ASISTENCIAS_ALUMNOS_EXITOSO, GET_ASISTENCIAS_ALUMNOS_FALLIDO, GET_ASISTENCIAS_ALUMNOS_REQUEST, LIMPIAR_ASISTENCIAS_ALUMNOS } from "../../types";

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
    // case GET_NOTAS_MATERIAS_DOCENTE_REQUEST:
    //   return {
    //     ...state,
    //     loadingAsistenciasAlumno: true,
    //   };
    // case GET_NOTAS_MATERIAS_DOCENTE_EXITOSO:
    //   return {
    //     ...state,
    //     loadingAsistenciasAlumno: false,
    //     dataNotasMateriasDocente: payload,
    //   };
    // case GET_NOTAS_MATERIAS_DOCENTE_FALLIDO:
    //   return {
    //     ...state,
    //     loadingAsistenciasAlumno: false,
    //     erroresAsistenciasAlumno: payload,
    //   };

    // case EDITAR_NOTAS_DOCENTE_REQUEST:
    //   return {
    //     ...state,
    //     loadingAsistenciasAlumno: true,
    //     erroresAsistenciasAlumno: [],
    //   };

    // case EDITAR_NOTAS_DOCENTE_EXITOSO:
    //   return {
    //     ...state,
    //     loadingAsistenciasAlumno: false,
    //     erroresAsistenciasAlumno: [],
    //     mensajeAsistenciasAlumno: 'Cambios realizados correctamente',
    //   };
    // case EDITAR_NOTAS_DOCENTE_FALLIDO:
    //   return {
    //     ...state,
    //     loadingAsistenciasAlumno: false,
    //     erroresAsistenciasAlumno: payload,
    //   };
    case LIMPIAR_ASISTENCIAS_ALUMNOS:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}