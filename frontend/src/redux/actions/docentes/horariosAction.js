// OBTENER LISTADO DE HORARIOS PARA UN DOCENTE

import { BASE_URL } from '../../../utils/getBaseUrl';
import { getHeadersFetch } from '../../../utils/getHeadersFetch';
import {
  GET_HORARIOS_DOCENTE_EXITOSO,
  GET_HORARIOS_DOCENTE_FALLIDO,
  GET_HORARIOS_DOCENTE_REQUEST,
  LIMPIAR_MENSAJES_HORARIOS_DOCENTE,
} from '../../types';

export const getHorariosDocenteRequest = () => {
  return {
    type: GET_HORARIOS_DOCENTE_REQUEST,
  };
};

export const getHorariosDocenteExito = (dataHorariosDocente) => {
  return {
    type: GET_HORARIOS_DOCENTE_EXITOSO,
    payload: dataHorariosDocente,
  };
};

export const getHorariosDocenteFallido = (error) => {
  return {
    type: GET_HORARIOS_DOCENTE_FALLIDO,
    payload: error,
  };
};

export const getDataHorariosDocente = () => {
  return async (dispatch) => {
    try {
      dispatch(getHorariosDocenteRequest());

      const response = await fetch(`${BASE_URL}/materias-docentes`, {
        headers: getHeadersFetch(),
      });

      const dataHorariosDocente = await response.json();
      //   console.log(dataHorariosDocente);
      if (dataHorariosDocente.length === 0) {
        return dispatch(
          getHorariosDocenteFallido([
            {
              errors: {
                msg: 'No posee horarios',
              },
            },
          ])
        );
      }
      dispatch(getHorariosDocenteExito(dataHorariosDocente));
    } catch (error) {
      console.log(error);
      dispatch(getHorariosDocenteFallido(error.error));
    }
  };
};

export const limpiarMensajesHorariosDocente = () => {
  return {
    type: LIMPIAR_MENSAJES_HORARIOS_DOCENTE,
  };
};
