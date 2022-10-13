import { BASE_URL } from '../../../utils/getBaseUrl';
import { getHeadersFetch } from '../../../utils/getHeadersFetch';
import {
  BORRAR_AVISO_EXITOSO,
  BORRAR_AVISO_FALLIDO,
  BORRAR_AVISO_REQUEST,
  EDITAR_AVISO_EXITOSO,
  EDITAR_AVISO_FALLIDO,
  EDITAR_AVISO_REQUEST,
  GET_AVISOS_EXITOSO,
  GET_AVISOS_FALLIDO,
  GET_AVISOS_REQUEST,
  GUARDAR_AVISO_EXITOSO,
  GUARDAR_AVISO_FALLIDO,
  GUARDAR_AVISO_REQUEST,
  LIMPIAR_MENSAJES_AVISOS,
} from '../../types';

// OBTENER LISTADO DE AVISOS PARA UN ADMINISTRATIVO
export const getAvisosRequest = () => {
  return {
    type: GET_AVISOS_REQUEST,
  };
};

export const getAvisosExito = (dataAvisos) => {
  return {
    type: GET_AVISOS_EXITOSO,
    payload: dataAvisos,
  };
};

export const getAvisosFallido = (error) => {
  return {
    type: GET_AVISOS_FALLIDO,
    payload: error,
  };
};

export const getDataAvisos = () => {
  return async (dispatch) => {
    try {
      dispatch(getAvisosRequest());

      const response = await fetch(`${BASE_URL}/avisos`, {
        headers: getHeadersFetch(),
      });

      const dataAvisos = await response.json();
      if (dataAvisos.length === 0) {
        return dispatch(
          getAvisosFallido([
            {
              errors: {
                msg: 'No hay avisos cargados',
              },
            },
          ])
        );
      }
      dispatch(getAvisosExito(dataAvisos));
    } catch (error) {
      console.log(error);
      dispatch(getAvisosFallido(error.error));
    }
  };
};

// GUARDAR UN AVISO
export const guardarAvisoRequest = () => {
  return {
    type: GUARDAR_AVISO_REQUEST,
  };
};

export const guardarAvisoExito = () => {
  return {
    type: GUARDAR_AVISO_EXITOSO,
  };
};

export const guardarAvisoFallido = (error) => {
  return {
    type: GUARDAR_AVISO_FALLIDO,
    payload: error.errors,
  };
};

export const postDataAviso = (aviso) => {
  return async (dispatch) => {
    try {
      dispatch(guardarAvisoRequest());

      const response = await fetch(`${BASE_URL}/avisos`, {
        method: 'POST',
        headers: getHeadersFetch(),
        body: JSON.stringify(aviso),
      });

      const avisoResult = await response.json();
      //   console.log(avisoResult);
      if (!response.ok) {
        return dispatch(guardarAvisoFallido(avisoResult));
      }
      dispatch(guardarAvisoExito());
    } catch (error) {
      console.log(error);
      dispatch(guardarAvisoFallido(error.error));
    }
  };
};

// EDITAR UN AVISO
export const editarAvisoRequest = () => {
  return {
    type: EDITAR_AVISO_REQUEST,
  };
};

export const editarAvisoExito = () => {
  return {
    type: EDITAR_AVISO_EXITOSO,
  };
};

export const editarAvisoFallido = (error) => {
  return {
    type: EDITAR_AVISO_FALLIDO,
    payload: error.errors,
  };
};

export const putDataAviso = (id, aviso) => {
  return async (dispatch) => {
    try {
      dispatch(editarAvisoRequest());

      //   console.log(id);
      const response = await fetch(`${BASE_URL}/avisos/${id}`, {
        method: 'PUT',
        headers: getHeadersFetch(),
        body: JSON.stringify(aviso),
      });

      const avisoEditarResult = await response.json();
      if (!response.ok) {
        return dispatch(editarAvisoFallido(avisoEditarResult));
      }
      dispatch(editarAvisoExito());
    } catch (error) {
      console.log(error);
      dispatch(editarAvisoFallido(error.error));
    }
  };
};

// BORRAR UN AVISO
export const borrarAvisoRequest = () => {
  return {
    type: BORRAR_AVISO_REQUEST,
  };
};

export const borrarAvisoExito = () => {
  return {
    type: BORRAR_AVISO_EXITOSO,
  };
};

export const borrarAvisoFallido = (error) => {
  return {
    type: BORRAR_AVISO_FALLIDO,
    payload: error.errors,
  };
};

export const borrarAviso = (id) => {
  return async (dispatch) => {
    try {
      dispatch(borrarAvisoRequest());

      const response = await fetch(`${BASE_URL}/avisos/${id}`, {
        method: 'DELETE',
        headers: getHeadersFetch(),
      });

      const avisoBorrarResult = await response.json();
      // console.log(avisoBorrarResult);
      if (!response.ok) {
        return dispatch(borrarAvisoFallido(avisoBorrarResult));
      }
      dispatch(borrarAvisoExito());
      dispatch(getDataAvisos());
    } catch (error) {
      console.log(error);
      dispatch(borrarAvisoFallido(error.error));
    }
  };
};

// limpiar mensajes
export const limpiarMensajesAvisos = () => {
  return {
    type: LIMPIAR_MENSAJES_AVISOS,
  };
};
