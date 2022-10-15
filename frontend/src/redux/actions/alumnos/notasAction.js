// OBTENER LISTADO DE NOTAS ALUMNOS

import { BASE_URL } from '../../../utils/getBaseUrl';
import { getHeadersFetch } from '../../../utils/getHeadersFetch';
import {
  GET_NOTAS_ALUMNO_EXITOSO,
  GET_NOTAS_ALUMNO_FALLIDO,
  GET_NOTAS_ALUMNO_REQUEST,
  LIMPIAR_MENSAJES_NOTAS_ALUMNO,
} from '../../types';

export const getNotasAlumnoRequest = () => {
  return {
    type: GET_NOTAS_ALUMNO_REQUEST,
  };
};

export const getNotasAlumnoExito = (dataNotasAlumno) => {
  return {
    type: GET_NOTAS_ALUMNO_EXITOSO,
    payload: dataNotasAlumno,
  };
};

export const getNotasAlumnoFallido = (error) => {
  return {
    type: GET_NOTAS_ALUMNO_FALLIDO,
    payload: error,
  };
};

export const getDataNotasAlumno = () => {
  return async (dispatch) => {
    try {
      dispatch(getNotasAlumnoRequest());

      const response = await fetch(`${BASE_URL}/notas-alumnos`, {
        headers: getHeadersFetch(),
      });

      const dataNotasAlumnos = await response.json();
        // console.log(dataNotasAlumnos);
      if (dataNotasAlumnos.length === 0) {
        return dispatch(
          getNotasAlumnoFallido([
            {
              errors: {
                msg: 'Aun no posee notas cargadas',
              },
            },
          ])
        );
      }
      dispatch(getNotasAlumnoExito(dataNotasAlumnos));
    } catch (error) {
      console.log(error);
      dispatch(getNotasAlumnoFallido(error.error));
    }
  };
};

export const limpiarMensajesNotasAlumno = () => {
  return {
    type: LIMPIAR_MENSAJES_NOTAS_ALUMNO,
  };
};
