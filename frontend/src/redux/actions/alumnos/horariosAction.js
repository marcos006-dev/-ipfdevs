// OBTENER LISTADO DE HORARIOS

import { BASE_URL } from '../../../utils/getBaseUrl';
import { getHeadersFetch } from '../../../utils/getHeadersFetch';
import {
  GET_HORARIOS_ALUMNO_EXITOSO,
  GET_HORARIOS_ALUMNO_FALLIDO,
  GET_HORARIOS_ALUMNO_REQUEST,
} from '../../types';

export const getHorariosAlumnoRequest = () => {
  return {
    type: GET_HORARIOS_ALUMNO_REQUEST,
  };
};

export const getHorariosAlumnoExito = (dataHorariosAlumno) => {
  return {
    type: GET_HORARIOS_ALUMNO_EXITOSO,
    payload: dataHorariosAlumno,
  };
};

export const getHorariosAlumnoFallido = (error) => {
  return {
    type: GET_HORARIOS_ALUMNO_FALLIDO,
    payload: error,
  };
};

export const getDataHorariosAlumno = () => {
  return async (dispatch) => {
    try {
      dispatch(getHorariosAlumnoRequest());

      const response = await fetch(`${BASE_URL}/horarios-alumnos`, {
        headers: getHeadersFetch(),
      });

      const dataHorariosAlumno = await response.json();
      //   console.log(dataHorariosAlumno);
      if (dataHorariosAlumno.length === 0) {
        return dispatch(
          getHorariosAlumnoFallido([
            {
              errors: {
                msg: 'No posee horarios',
              },
            },
          ])
        );
      }
      dispatch(getHorariosAlumnoExito(dataHorariosAlumno));
    } catch (error) {
      console.log(error);
      dispatch(getHorariosAlumnoFallido(error.error));
    }
  };
};
