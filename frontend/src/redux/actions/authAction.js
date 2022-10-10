import { BASE_URL } from '../../utils/getBaseUrl';
import {
  INICIO_SESION_REQUEST,
  INICIO_SESION_EXITOSO,
  INICIO_SESION_FALLIDO,
  CARGAR_DATOS_USUARIO_REQUEST,
  CARGAR_DATOS_USUARIO_EXITOSO,
  CARGAR_DATOS_USUARIO_FALLIDO,
  CERRAR_SESION,
  BORRAR_DATOS_USUARIO,
} from '../types';

// ACTION CREATORS

export const fetchAuthRequest = () => {
  return {
    type: INICIO_SESION_REQUEST,
  };
};

export const fetchAuthExito = (token, user) => {
  return {
    type: INICIO_SESION_EXITOSO,
    payload: {
      token,
      user,
    },
  };
};

export const fetchAuthFallido = (error) => {
  return {
    type: INICIO_SESION_FALLIDO,
    payload: error.errors,
  };
};

export const login = (nombreUsuario, passwordUsuario) => {
  return async (dispatch) => {
    try {
      dispatch(fetchAuthRequest());

      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        body: JSON.stringify({
          nombre_usuario: nombreUsuario,
          password_usuario: passwordUsuario,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      const data = await response.json();
      if (!Object.prototype.hasOwnProperty.call(data, 'token')) {
        dispatch(fetchAuthFallido(data));
        return;
      }
      dispatch(fetchAuthExito(data.token, data.userData));

      // console.log(data);
    } catch (error) {
      // console.log(error.error);
      dispatch(fetchAuthFallido(error.error));
    }
  };
};

export const cargarDatosUsuarioRequest = () => {
  return {
    type: CARGAR_DATOS_USUARIO_REQUEST,
  };
};

export const cargarDatosUsuarioExitoso = (user) => {
  // console.log(user);
  return {
    type: CARGAR_DATOS_USUARIO_EXITOSO,
    payload: user,
  };
};

export const cargarDatosUsuarioFallido = () => {
  return {
    type: CARGAR_DATOS_USUARIO_FALLIDO,
  };
};
export const fetchCargarDatosUsuario = (token) => {
  // console.log(token);
  return async (dispatch) => {
    try {
      dispatch(cargarDatosUsuarioRequest());

      const response = await fetch(`${BASE_URL}/user/`, {
        headers: {
          authorization: token,
        },
      });

      const user = await response.json();
      // console.log(user);
      if (!Object.prototype.hasOwnProperty.call(user, 'userData')) {
        // console.log('entro');
        dispatch(cargarDatosUsuarioFallido());
        return;
      }
      // console.log(user);
      dispatch(cargarDatosUsuarioExitoso(user));

      // console.log(user);
    } catch (error) {
      console.log(error);
      dispatch(cargarDatosUsuarioFallido());
    }
  };
};

export const cerrarSesion = (dispatch) => {
  dispatch({
    type: CERRAR_SESION,
  });
  dispatch({
    type: BORRAR_DATOS_USUARIO,
  });
};
