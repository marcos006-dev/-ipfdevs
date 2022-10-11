import { BASE_URL } from '../../../utils/getBaseUrl';
import { getHeadersFetch } from '../../../utils/getHeadersFetch';
import {
  ACTIVAR_MATERIA_EXITOSO,
  ACTIVAR_MATERIA_FALLIDO,
  ACTIVAR_MATERIA_REQUEST,
  DESACTIVAR_MATERIA_EXITOSO,
  DESACTIVAR_MATERIA_FALLIDO,
  DESACTIVAR_MATERIA_REQUEST,
  EDITAR_MATERIA_EXITOSO,
  EDITAR_MATERIA_FALLIDO,
  EDITAR_MATERIA_REQUEST,
  FETCH_MATERIAS_EXITOSO,
  FETCH_MATERIAS_FALLIDO,
  FETCH_MATERIAS_REQUEST,
  GUARDAR_MATERIA_EXITOSO,
  GUARDAR_MATERIA_FALLIDO,
  GUARDAR_MATERIA_REQUEST,
} from '../../types';

// OBTENER LISTADO DE MATERIAS
export const fetchMateriaRequest = () => {
  return {
    type: FETCH_MATERIAS_REQUEST,
  };
};

export const fetchMateriaExito = (dataMaterias) => {
  return {
    type: FETCH_MATERIAS_EXITOSO,
    payload: dataMaterias,
  };
};

export const fetchMateriaFallido = (error) => {
  // console.log(error)
  return {
    type: FETCH_MATERIAS_FALLIDO,
    payload: error,
  };
};

export const getDataMaterias = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchMateriaRequest());

      const response = await fetch(`${BASE_URL}/materias`, {
        headers: getHeadersFetch(),
      });

      const dataMaterias = await response.json();
      if (dataMaterias.length === 0) {
        return dispatch(
          fetchMateriaFallido([
            {
              errors: {
                msg: 'No hay materias cargadas',
              },
            },
          ])
        );
      }
      dispatch(fetchMateriaExito(dataMaterias));
    } catch (error) {
      console.log(error);
      dispatch(fetchMateriaFallido(error.error));
    }
  };
};
// GUARDAR UNA MATERIA
export const guardarMateriaRequest = () => {
  return {
    type: GUARDAR_MATERIA_REQUEST,
  };
};

export const guardarMateriaExito = (materiaGuardada) => {
  return {
    type: GUARDAR_MATERIA_EXITOSO,
    payload: materiaGuardada,
  };
};

export const guardarMateriaFallido = (error) => {
  return {
    type: GUARDAR_MATERIA_FALLIDO,
    payload: error.errors,
  };
};

export const postDataMateria = (materia) => {
  return async (dispatch) => {
    try {
      dispatch(guardarMateriaRequest());

      const response = await fetch(`${BASE_URL}/materias`, {
        method: 'POST',
        headers: getHeadersFetch(),
        body: JSON.stringify(materia),
      });

      const materiaResult = await response.json();
      if (!response.ok) {
        return dispatch(guardarMateriaFallido(materiaResult));
      }
      dispatch(guardarMateriaExito(materia));
    } catch (error) {
      console.log(error);
      dispatch(guardarMateriaFallido(error.error));
    }
  };
};

// EDITAR UNA MATERIA
export const editarMateriaRequest = () => {
  return {
    type: EDITAR_MATERIA_REQUEST,
  };
};

export const editarMateriaExito = (materiaEditar) => {
  return {
    type: EDITAR_MATERIA_EXITOSO,
    payload: materiaEditar,
  };
};

export const editarMateriaFallido = (error) => {
  return {
    type: EDITAR_MATERIA_FALLIDO,
    payload: error.errors,
  };
};

export const putDataMateria = (id, materia) => {
  return async (dispatch) => {
    try {
      dispatch(editarMateriaRequest());

      const response = await fetch(`${BASE_URL}/materias/${id}`, {
        method: 'PUT',
        headers: getHeadersFetch(),
        body: JSON.stringify(materia),
      });

      const materiaEditarResult = await response.json();
      if (!response.ok) {
        return dispatch(editarMateriaFallido(materiaEditarResult));
      }
      dispatch(editarMateriaExito());
    } catch (error) {
      console.log(error);
      dispatch(editarMateriaFallido(error.error));
    }
  };
};

// ACTIVAR UNA MATERIA
export const activarMateriaRequest = () => {
  return {
    type: ACTIVAR_MATERIA_REQUEST,
  };
};

export const activarMateriaExito = () => {
  return {
    type: ACTIVAR_MATERIA_EXITOSO,
  };
};

export const activarMateriaFallido = (error) => {
  return {
    type: ACTIVAR_MATERIA_FALLIDO,
    payload: error.errors,
  };
};

export const activarMateria = (id) => {
  return async (dispatch) => {
    try {
      dispatch(activarMateriaRequest());

      const response = await fetch(`${BASE_URL}/materias/${id}`, {
        method: 'PATCH',
        headers: getHeadersFetch(),
      });

      const materiaActivar = await response.json();
      // console.log(materiaActivar);
      if (!response.ok) {
        return dispatch(activarMateriaFallido(materiaActivar));
      }
      dispatch(activarMateriaExito());
      dispatch(getDataMaterias());
    } catch (error) {
      console.log(error);
      dispatch(activarMateriaFallido(error.error));
    }
  };
};

// DESACTIVAR UNA MATERIA
export const desactivarMateriaRequest = () => {
  return {
    type: DESACTIVAR_MATERIA_REQUEST,
  };
};

export const desactivarMateriaExito = () => {
  return {
    type: DESACTIVAR_MATERIA_EXITOSO,
  };
};

export const desactivarMateriaFallido = (error) => {
  return {
    type: DESACTIVAR_MATERIA_FALLIDO,
    payload: error.errors,
  };
};

export const desactivarMateria = (id) => {
  return async (dispatch) => {
    try {
      dispatch(desactivarMateriaRequest());

      const response = await fetch(`${BASE_URL}/materias/${id}`, {
        method: 'DELETE',
        headers: getHeadersFetch(),
      });

      const materiaDesactivar = await response.json();
      // console.log(materiaDesactivar);
      if (!response.ok) {
        return dispatch(desactivarMateriaFallido(materiaDesactivar));
      }
      dispatch(desactivarMateriaExito());
      dispatch(getDataMaterias());
    } catch (error) {
      console.log(error);
      dispatch(desactivarMateriaFallido(error.error));
    }
  };
};
