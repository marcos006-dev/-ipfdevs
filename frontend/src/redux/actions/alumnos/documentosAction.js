import { BASE_URL } from '../../../utils/getBaseUrl';
import { getHeadersFetch } from '../../../utils/getHeadersFetch';
import {
  EDITAR_DOCUMENTOS_ALUMNO_EXITOSO,
  EDITAR_DOCUMENTOS_ALUMNO_FALLIDO,
  EDITAR_DOCUMENTOS_ALUMNO_REQUEST,
  GET_DOCUMENTOS_ALUMNO_EXITOSO,
  GET_DOCUMENTOS_ALUMNO_FALLIDO,
  GET_DOCUMENTOS_ALUMNO_REQUEST,
  LIMPIAR_MENSAJES_DOCUMENTOS_ALUMNO,
} from '../../types';

export const getDocumentosAlumnoRequest = () => {
  return {
    type: GET_DOCUMENTOS_ALUMNO_REQUEST,
  };
};

export const getDocumentosAlumnoExito = (dataDocumentosAlumno) => {
  return {
    type: GET_DOCUMENTOS_ALUMNO_EXITOSO,
    payload: dataDocumentosAlumno,
  };
};

export const getDocumentosAlumnoFallido = (error) => {
  return {
    type: GET_DOCUMENTOS_ALUMNO_FALLIDO,
    payload: error,
  };
};

export const getDataDocumentosAlumno = () => {
  return async (dispatch) => {
    try {
      dispatch(getDocumentosAlumnoRequest());

      const response = await fetch(`${BASE_URL}/tipos-docum-alumnos`, {
        headers: getHeadersFetch(),
      });

      const dataDocumentosAlumno = await response.json();
      // console.log(dataDocumentosAlumno);
      if (dataDocumentosAlumno.length === 0) {
        return dispatch(
          getDocumentosAlumnoFallido([
            {
              errors: {
                msg: 'No hay tipos de documentos cargados',
              },
            },
          ])
        );
      }
      dispatch(getDocumentosAlumnoExito(dataDocumentosAlumno));
    } catch (error) {
      console.log(error);
      dispatch(getDocumentosAlumnoFallido(error.error));
    }
  };
};

// EDITAR DOCUMENTACIONES ALUMNO
export const editarDocumentosAlumnoRequest = () => {
  return {
    type: EDITAR_DOCUMENTOS_ALUMNO_REQUEST,
  };
};

export const editarDocumentosAlumnoExito = (documentosAlumno) => {
  return {
    type: EDITAR_DOCUMENTOS_ALUMNO_EXITOSO,
    payload: documentosAlumno,
  };
};

export const editarDocumentosAlumnoFallido = (error) => {
  return {
    type: EDITAR_DOCUMENTOS_ALUMNO_FALLIDO,
    payload: error.errors,
  };
};

export const putDataDocumentosAlumno = (documentosAlumno) => {
  return async (dispatch) => {
    try {
      dispatch(editarDocumentosAlumnoRequest());

      const response = await fetch(`${BASE_URL}/tipos-docum-alumnos`, {
        method: 'PUT',
        headers: getHeadersFetch(),
        body: JSON.stringify(documentosAlumno),
      });

      const documentosAlumnoEditarResult = await response.json();
      if (!response.ok) {
        return dispatch(
          editarDocumentosAlumnoFallido(documentosAlumnoEditarResult)
        );
      }
      dispatch(editarDocumentosAlumnoExito());
    } catch (error) {
      console.log(error);
      dispatch(editarDocumentosAlumnoFallido(error.error));
    }
  };
};

export const limpiarMensajesDocumentosAlumno = () => {
  return {
    type: LIMPIAR_MENSAJES_DOCUMENTOS_ALUMNO,
  };
};
