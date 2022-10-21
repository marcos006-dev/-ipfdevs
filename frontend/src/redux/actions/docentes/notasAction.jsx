import { BASE_URL } from '../../../utils/getBaseUrl';
import { getHeadersFetch } from '../../../utils/getHeadersFetch';
import {
  GET_NOTAS_DOCENTE_EXITOSO,
  GET_NOTAS_DOCENTE_FALLIDO,
  GET_NOTAS_DOCENTE_REQUEST,
} from '../../types';

export const getNotasDocenteRequest = () => {
  return {
    type: GET_NOTAS_DOCENTE_REQUEST,
  };
};

export const getNotasDocenteExito = (dataNotasDocente) => {
  return {
    type: GET_NOTAS_DOCENTE_EXITOSO,
    payload: dataNotasDocente,
  };
};

export const getNotasDocenteFallido = (error) => {
  return {
    type: GET_NOTAS_DOCENTE_FALLIDO,
    payload: error,
  };
};

export const getDataNotasDocente = () => {
  return async (dispatch) => {
    try {
      dispatch(getNotasDocenteRequest());

      const response = await fetch(`${BASE_URL}/notas-docentes`, {
        headers: getHeadersFetch(),
      });

      const dataNotasDocente = await response.json();
      if (dataNotasDocente.length === 0) {
        return dispatch(
          getNotasDocenteFallido([
            {
              errors: {
                msg: 'No cargo ninguna nota aun',
              },
            },
          ])
        );
      }
      dispatch(getNotasDocenteExito(dataNotasDocente));
    } catch (error) {
      console.log(error);
      dispatch(getNotasDocenteFallido(error.error));
    }
  };
};
