import { BASE_URL } from '../../../utils/getBaseUrl';
import { getHeadersFetch } from '../../../utils/getHeadersFetch';
import {
  GET_CARRERAS_EXITOSO,
  GET_CARRERAS_FALLIDO,
  GET_CARRERAS_REQUEST,
  GET_USUARIOS_EXITOSO,
  GET_USUARIOS_FALLIDO,
  GET_USUARIOS_REQUEST,
  GUARDAR_USUARIO_EXITOSO,
  GUARDAR_USUARIO_FALLIDO,
  GUARDAR_USUARIO_REQUEST,
} from '../../types';

// OBTENER LISTADO DE MATERIAS
export const getUsuariosRequest = () => {
  return {
    type: GET_USUARIOS_REQUEST,
  };
};

export const getUsuariosExito = (dataUsuarios) => {
  return {
    type: GET_USUARIOS_EXITOSO,
    payload: dataUsuarios,
  };
};

export const getUsuariosFallido = (error) => {
  return {
    type: GET_USUARIOS_FALLIDO,
    payload: error,
  };
};

export const getDataUsuarios = () => {
  return async (dispatch) => {
    try {
      dispatch(getUsuariosRequest());

      const response = await fetch(`${BASE_URL}/administrativos`, {
        headers: getHeadersFetch(),
      });

      const dataUsuarios = await response.json();
      if (dataUsuarios.length === 0) {
        return dispatch(
          getUsuariosFallido([
            {
              errors: {
                msg: 'No hay usuarios cargados',
              },
            },
          ])
        );
      }
      dispatch(getUsuariosExito(dataUsuarios));
    } catch (error) {
      console.log(error);
      dispatch(getUsuariosFallido(error.error));
    }
  };
};

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

// GUARDAR UN USUARIO
export const guardarUsuarioRequest = () => {
  return {
    type: GUARDAR_USUARIO_REQUEST,
  };
};

export const guardarUsuarioExito = () => {
  return {
    type: GUARDAR_USUARIO_EXITOSO,
    // payload: usuarioGuardado,
  };
};

export const guardarUsuarioFallido = (error) => {
  return {
    type: GUARDAR_USUARIO_FALLIDO,
    payload: error.errors,
  };
};

export const postDataUsuario = (usuario) => {
  return async (dispatch) => {
    try {
      dispatch(guardarUsuarioRequest());

      const response = await fetch(`${BASE_URL}/administrativos`, {
        method: 'POST',
        headers: getHeadersFetch(),
        body: JSON.stringify(usuario),
      });

      const usuarioResult = await response.json();
    //   console.log(usuarioResult);
      if (!response.ok) {
        return dispatch(guardarUsuarioFallido(usuarioResult));
      }
      dispatch(guardarUsuarioExito());
    } catch (error) {
      console.log(error);
      dispatch(guardarUsuarioFallido(error.error));
    }
  };
};
