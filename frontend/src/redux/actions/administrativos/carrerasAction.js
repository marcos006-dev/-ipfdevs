import { BASE_URL } from '../../../utils/getBaseUrl';
import { getHeadersFetch } from '../../../utils/getHeadersFetch';
import {
  GET_CARRERAS_EXITOSO,
  GET_CARRERAS_FALLIDO,
  GET_CARRERAS_REQUEST,
  LIMPIAR_MENSAJES_USUARIOS,
} from '../../types';

// OBTENER LISTADO DE CARRERAS
export const getCarrerasRequest = () => {
  return {
    type: GET_CARRERAS_REQUEST,
  };
};

export const getCarrerasExito = (dataCarreras) => {
  return {
    type: GET_CARRERAS_EXITOSO,
    payload: dataCarreras,
  };
};

export const getCarrerasFallido = (error) => {
  return {
    type: GET_CARRERAS_FALLIDO,
    payload: error,
  };
};

export const getDataCarreras = () => {
  return async (dispatch) => {
    try {
      dispatch(getCarrerasRequest());

      const response = await fetch(`${BASE_URL}/carreras`, {
        headers: getHeadersFetch(),
      });

      const dataCarreras = await response.json();
      //   console.log(dataCarreras);
      if (dataCarreras.length === 0) {
        return dispatch(
          getCarrerasFallido([
            {
              errors: {
                msg: 'No hay carreras cargadas',
              },
            },
          ])
        );
      }
      dispatch(getCarrerasExito(dataCarreras));
    } catch (error) {
      console.log(error);
      dispatch(getCarrerasFallido(error.error));
    }
  };
};

export const limpiarMensajesUsuarios = () => {
  return {
    type: LIMPIAR_MENSAJES_USUARIOS,
  };
};
