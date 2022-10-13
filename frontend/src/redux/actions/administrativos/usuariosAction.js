import { BASE_URL } from '../../../utils/getBaseUrl';
import { getHeadersFetch } from '../../../utils/getHeadersFetch';
import {
  ACTIVAR_USUARIO_EXITOSO,
  ACTIVAR_USUARIO_FALLIDO,
  ACTIVAR_USUARIO_REQUEST,
  DESACTIVAR_USUARIO_EXITOSO,
  DESACTIVAR_USUARIO_FALLIDO,
  DESACTIVAR_USUARIO_REQUEST,
  EDITAR_USUARIO_EXITOSO,
  EDITAR_USUARIO_FALLIDO,
  EDITAR_USUARIO_REQUEST,
  GET_USUARIOS_EXITOSO,
  GET_USUARIOS_FALLIDO,
  GET_USUARIOS_REQUEST,
  GUARDAR_USUARIO_EXITOSO,
  GUARDAR_USUARIO_FALLIDO,
  GUARDAR_USUARIO_REQUEST,
  LIMPIAR_MENSAJES_USUARIOS,
} from '../../types';

// OBTENER LISTADO DE USUARIOS
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

// EDITAR UN USUARIO
export const editarUsuarioRequest = () => {
  return {
    type: EDITAR_USUARIO_REQUEST,
  };
};

export const editarUsuarioExito = (usuarioEditar) => {
  return {
    type: EDITAR_USUARIO_EXITOSO,
    payload: usuarioEditar,
  };
};

export const editarUsuarioFallido = (error) => {
  return {
    type: EDITAR_USUARIO_FALLIDO,
    payload: error.errors,
  };
};

export const putUsuario = (id, usuario) => {
  return async (dispatch) => {
    try {
      dispatch(editarUsuarioRequest());

      console.log(id);
      const response = await fetch(`${BASE_URL}/administrativos/${id}`, {
        method: 'PUT',
        headers: getHeadersFetch(),
        body: JSON.stringify(usuario),
      });

      const usuarioEditarResult = await response.json();
      if (!response.ok) {
        return dispatch(editarUsuarioFallido(usuarioEditarResult));
      }
      dispatch(editarUsuarioExito());
    } catch (error) {
      console.log(error);
      dispatch(editarUsuarioFallido(error.error));
    }
  };
};

// DESACTIVAR UN USUARIO
export const desactivarUsuarioRequest = () => {
  return {
    type: DESACTIVAR_USUARIO_REQUEST,
  };
};

export const desactivarUsuarioExito = () => {
  return {
    type: DESACTIVAR_USUARIO_EXITOSO,
  };
};

export const desactivarUsuarioFallido = (error) => {
  return {
    type: DESACTIVAR_USUARIO_FALLIDO,
    payload: error.errors,
  };
};

export const desactivarUsuario = (id) => {
  return async (dispatch) => {
    try {
      dispatch(desactivarUsuarioRequest());

      const response = await fetch(`${BASE_URL}/administrativos/${id}`, {
        method: 'DELETE',
        headers: getHeadersFetch(),
      });

      const usuarioDesactivar = await response.json();
      // console.log(usuarioDesactivar);
      if (!response.ok) {
        return dispatch(desactivarUsuarioFallido(usuarioDesactivar));
      }
      dispatch(desactivarUsuarioExito());
      dispatch(getDataUsuarios());
    } catch (error) {
      console.log(error);
      dispatch(desactivarUsuarioFallido(error.error));
    }
  };
};

// ACTIVAR UN USUARIO
export const activarUsuarioRequest = () => {
  return {
    type: ACTIVAR_USUARIO_REQUEST,
  };
};

export const activarUsuarioExito = () => {
  return {
    type: ACTIVAR_USUARIO_EXITOSO,
  };
};

export const activarUsuarioFallido = (error) => {
  return {
    type: ACTIVAR_USUARIO_FALLIDO,
    payload: error.errors,
  };
};

export const activarUsuario = (id) => {
  return async (dispatch) => {
    try {
      dispatch(activarUsuarioRequest());

      const response = await fetch(`${BASE_URL}/administrativos/${id}`, {
        method: 'PATCH',
        headers: getHeadersFetch(),
      });

      const usuarioActivar = await response.json();
      // console.log(usuarioActivar);
      if (!response.ok) {
        return dispatch(activarUsuarioFallido(usuarioActivar));
      }
      dispatch(activarUsuarioExito());
      dispatch(getDataUsuarios());
    } catch (error) {
      console.log(error);
      dispatch(activarUsuarioFallido(error.error));
    }
  };
};

// limpiar mensajes
export const limpiarMensajesUsuarios = () => {
  return {
    type: LIMPIAR_MENSAJES_USUARIOS,
  };
};
