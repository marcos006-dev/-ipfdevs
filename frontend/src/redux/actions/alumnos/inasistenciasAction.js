import { BASE_URL } from '../../../utils/getBaseUrl';
import { getHeadersFetch } from '../../../utils/getHeadersFetch';
import {
  GET_INASISTENCIAS_EXITOSO,
  GET_INASISTENCIAS_REQUEST,
  LIMPIAR_MENSAJES_INASISTENCIAS,
} from '../../types';
// OBTENER LISTADO DE INASISTENCIAS

export const getInasistenciasRequest = () => {
  return {
    type: GET_INASISTENCIAS_REQUEST,
  };
};

export const getInasistenciasExito = (dataInasistencias) => {
  return {
    type: GET_INASISTENCIAS_EXITOSO,
    payload: dataInasistencias,
  };
};

export const getInasistenciasFallido = (error) => {
  return {
    type: GET_INASISTENCIAS_FALLIDO,
    payload: error,
  };
};

export const getDataInasistencias = () => {
  return async (dispatch) => {
    try {
      dispatch(getInasistenciasRequest());

      const response = await fetch(`${BASE_URL}/inasistencias-alumnos`, {
        headers: getHeadersFetch(),
      });

      const dataInasistencias = await response.json();
      //   console.log(dataInasistencias);
      if (dataInasistencias.length === 0) {
        return dispatch(
          getInasistenciasFallido([
            {
              errors: {
                msg: 'No posee inasistencias',
              },
            },
          ])
        );
      }
      dispatch(getInasistenciasExito(dataInasistencias));
    } catch (error) {
      console.log(error);
      dispatch(getInasistenciasFallido(error.error));
    }
  };
};

export const limpiarMensajesInasistencias = () => {
  return {
    type: LIMPIAR_MENSAJES_INASISTENCIAS,
  };
};
