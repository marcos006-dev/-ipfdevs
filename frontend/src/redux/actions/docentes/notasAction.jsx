import { BASE_URL } from '../../../utils/getBaseUrl';
import { getHeadersFetch } from '../../../utils/getHeadersFetch';
import {
  EDITAR_NOTAS_DOCENTE_EXITOSO,
  EDITAR_NOTAS_DOCENTE_FALLIDO,
  EDITAR_NOTAS_DOCENTE_REQUEST,
  ELIMINAR_NOTAS_DOCENTE_EXITOSO,
  ELIMINAR_NOTAS_DOCENTE_FALLIDO,
  ELIMINAR_NOTAS_DOCENTE_REQUEST,
  GET_NOTAS_DOCENTE_EXITOSO,
  GET_NOTAS_DOCENTE_FALLIDO,
  GET_NOTAS_DOCENTE_REQUEST,
  GET_NOTAS_MATERIAS_DOCENTE_EXITOSO,
  GET_NOTAS_MATERIAS_DOCENTE_FALLIDO,
  GET_NOTAS_MATERIAS_DOCENTE_REQUEST,
  LIMPIAR_MENSAJES_NOTAS_DOCENTE,
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

export const getNotasMateriasDocenteRequest = () => {
  return {
    type: GET_NOTAS_MATERIAS_DOCENTE_REQUEST,
  };
};

export const getNotasMateriasDocenteExito = (dataNotasMateriasDocente) => {
  return {
    type: GET_NOTAS_MATERIAS_DOCENTE_EXITOSO,
    payload: dataNotasMateriasDocente,
  };
};

export const getNotasMateriasDocenteFallido = (error) => {
  return {
    type: GET_NOTAS_MATERIAS_DOCENTE_FALLIDO,
    payload: error,
  };
};

export const getDataNotasMateriasDocente = (materiaTipoNota) => {
  return async (dispatch) => {
    try {
      dispatch(getNotasMateriasDocenteRequest());

      const response = await fetch(
        `${BASE_URL}/notas-materias-docentes/${JSON.stringify(
          materiaTipoNota
        )}`,
        {
          headers: getHeadersFetch(),
        }
      );

      const dataNotasMateriaDocente = await response.json();
      if (response.status !== 200) {
        return dispatch(
          getNotasMateriasDocenteFallido(dataNotasMateriaDocente.errors)
        );
      }
      dispatch(getNotasMateriasDocenteExito(dataNotasMateriaDocente));
    } catch (error) {
      console.log(error);
      dispatch(getNotasMateriasDocenteFallido(error));
    }
  };
};

// EDITAR-CREAR NOTAS DOCENTES
export const editarNotasDocenteRequest = () => {
  return {
    type: EDITAR_NOTAS_DOCENTE_REQUEST,
  };
};

export const editarNotasDocenteExito = (notasDocenteEditar) => {
  return {
    type: EDITAR_NOTAS_DOCENTE_EXITOSO,
    payload: notasDocenteEditar,
  };
};

export const editarNotasDocenteFallido = (error) => {
  return {
    type: EDITAR_NOTAS_DOCENTE_FALLIDO,
    payload: error.errors,
  };
};

export const putNotasDocente = (dataNotasMateriasAlumnos) => {
  return async (dispatch) => {
    try {
      dispatch(editarNotasDocenteRequest());

      const response = await fetch(`${BASE_URL}/editar-notas`, {
        method: 'PUT',
        headers: getHeadersFetch(),
        body: JSON.stringify(dataNotasMateriasAlumnos),
      });

      const notasDocenteEditarResult = await response.json();
      if (!response.ok) {
        return dispatch(editarNotasDocenteFallido(notasDocenteEditarResult));
      }
      dispatch(editarNotasDocenteExito());
    } catch (error) {
      console.log(error);
      dispatch(editarNotasDocenteFallido(error.error));
    }
  };
};


// BORRAR NOTAS DOCENTES
export const eliminarNotaDocenteRequest = () => {
  return {
    type: ELIMINAR_NOTAS_DOCENTE_REQUEST,
  };
};

export const eliminarNotaDocenteExito = () => {
  return {
    type: ELIMINAR_NOTAS_DOCENTE_EXITOSO,
  };
};

export const eliminarNotaDocenteFallido = (error) => {
  return {
    type: ELIMINAR_NOTAS_DOCENTE_FALLIDO,
    payload: error.errors,
  };
};

export const eliminarNotaDocente = (materiaTipoNota) => {
  return async (dispatch) => {
    try {
      dispatch(eliminarNotaDocenteRequest());

      const response = await fetch(`${BASE_URL}/eliminar-notas/${JSON.stringify(materiaTipoNota)}`, {
        method: 'DELETE',
        headers: getHeadersFetch(),
      });

      const notaDocenteResult = await response.json();
      // console.log(notaDocenteResult);
      if (!response.ok) {
        return dispatch(eliminarNotaDocenteFallido(notaDocenteResult));
      }
      dispatch(eliminarNotaDocenteExito());
      // dispatch(getDataNotasDocente());
    } catch (error) {
      console.log(error);
      dispatch(eliminarNotaDocenteFallido(error.error));
    }
  };
};


export const limpiarMensajesNotasDocente = () => {
  return {
    type: LIMPIAR_MENSAJES_NOTAS_DOCENTE,
  };
};
