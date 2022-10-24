import { BASE_URL } from "../../../utils/getBaseUrl";
import { getHeadersFetch } from "../../../utils/getHeadersFetch";
import { GET_ASISTENCIAS_ALUMNOS_EXITOSO, GET_ASISTENCIAS_ALUMNOS_FALLIDO, GET_ASISTENCIAS_ALUMNOS_REQUEST } from "../../types";

export const getAsistenciaAlumnoRequest = () => {
  return {
    type: GET_ASISTENCIAS_ALUMNOS_REQUEST,
  };
};

export const getAsistenciaAlumnoExito = (dataAsistenciasAlumnos) => {
  return {
    type: GET_ASISTENCIAS_ALUMNOS_EXITOSO,
    payload: dataAsistenciasAlumnos,
  };
};

export const getAsistenciaAlumnoFallido = (error) => {
  return {
    type: GET_ASISTENCIAS_ALUMNOS_FALLIDO,
    payload: error,
  };
};

export const getDataAsistenciasAlumnos = (carreraFechaInasistencia) => {
  return async (dispatch) => {
    try {
      dispatch(getAsistenciaAlumnoRequest());

      const response = await fetch(
        `${BASE_URL}/inasistencias/${JSON.stringify(
          carreraFechaInasistencia
        )}`,
        {
          headers: getHeadersFetch(),
        }
      );

      const dataAsistenciasAlumno = await response.json();
      if (response.status !== 200) {
        return dispatch(
          getAsistenciaAlumnoFallido(dataAsistenciasAlumno.errors)
        );
      }
      dispatch(getAsistenciaAlumnoExito(dataAsistenciasAlumno));
    } catch (error) {
      console.log(error);
      dispatch(getAsistenciaAlumnoFallido(error));
    }
  };
};
