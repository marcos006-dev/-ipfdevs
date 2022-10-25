import { BASE_URL } from '../../../utils/getBaseUrl';
import { getHeadersFetch } from '../../../utils/getHeadersFetch';
import {
  GET_ASISTENCIAS_ALUMNOS_EXITOSO,
  GET_ASISTENCIAS_ALUMNOS_FALLIDO,
  GET_ASISTENCIAS_ALUMNOS_REQUEST,
  LIMPIAR_ASISTENCIAS_ALUMNOS,
  PUT_ASISTENCIAS_ALUMNOS_EXITOSO,
  PUT_ASISTENCIAS_ALUMNOS_FALLIDO,
  PUT_ASISTENCIAS_ALUMNOS_REQUEST,
} from '../../types';

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
        `${BASE_URL}/inasistencias/${JSON.stringify(carreraFechaInasistencia)}`,
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

export const putAsistenciaAlumnoRequest = () => {
  return {
    type: PUT_ASISTENCIAS_ALUMNOS_REQUEST,
  };
};

export const putAsistenciaAlumnoExito = (dataAsistenciasAlumnos) => {
  return {
    type: PUT_ASISTENCIAS_ALUMNOS_EXITOSO,
    payload: dataAsistenciasAlumnos,
  };
};

export const putAsistenciaAlumnoFallido = (error) => {
  return {
    type: PUT_ASISTENCIAS_ALUMNOS_FALLIDO,
    payload: error,
  };
};

export const putDataAsistenciasAlumnos = (
  carreraFechaInasistencia,
  inasistenciasAlumno
) => {
  return async (dispatch) => {
    try {
      dispatch(putAsistenciaAlumnoRequest());

      const response = await fetch(
        `${BASE_URL}/inasistencias/${JSON.stringify(carreraFechaInasistencia)}`,
        {
          method: 'PUT',
          headers: getHeadersFetch(),
          body: JSON.stringify(inasistenciasAlumno),
        }
      );

      const resultActualizacionInasistencia = await response.json();
      if (response.status !== 200) {
        return dispatch(
          putAsistenciaAlumnoFallido(resultActualizacionInasistencia.errors)
        );
      }
      dispatch(putAsistenciaAlumnoExito(resultActualizacionInasistencia));
    } catch (error) {
      console.log(error);
      dispatch(putAsistenciaAlumnoFallido(error));
    }
  };
};

// limpiar mensajes
export const limpiarMensajesAsistenciasAlumnos = () => {
  return {
    type: LIMPIAR_ASISTENCIAS_ALUMNOS,
  };
};
