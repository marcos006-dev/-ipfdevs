import { BASE_URL } from '../../../utils/getBaseUrl';
import { getHeadersFetch } from '../../../utils/getHeadersFetch';
import {
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
