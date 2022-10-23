import {
  EDITAR_DOCUMENTOS_ALUMNO_EXITOSO,
  EDITAR_DOCUMENTOS_ALUMNO_FALLIDO,
  EDITAR_DOCUMENTOS_ALUMNO_REQUEST,
  GET_DOCUMENTOS_ALUMNO_EXITOSO,
  GET_DOCUMENTOS_ALUMNO_FALLIDO,
  GET_DOCUMENTOS_ALUMNO_REQUEST,
  LIMPIAR_MENSAJES_DOCUMENTOS_ALUMNO,
} from '../../types';

const initialState = {
  dataDocumentosAlumno: [],
  erroresDocumentosAlumno: [],
  loadingDocumentosAlumno: false,
  mensajeDocumentosAlumno: '',
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DOCUMENTOS_ALUMNO_REQUEST:
      return {
        ...state,
        loadingDocumentosAlumno: true,
      };
    case GET_DOCUMENTOS_ALUMNO_EXITOSO:
      return {
        ...state,
        loadingDocumentosAlumno: false,
        dataDocumentosAlumno: payload,
      };
    case GET_DOCUMENTOS_ALUMNO_FALLIDO:
      return {
        ...state,
        loadingDocumentosAlumno: false,
        erroresDocumentosAlumno: payload,
      };

    case EDITAR_DOCUMENTOS_ALUMNO_REQUEST:
      return {
        ...state,
        loadingDocumentosAlumno: true,
        erroresDocumentosAlumno: [],
      };

    case EDITAR_DOCUMENTOS_ALUMNO_EXITOSO:
      return {
        ...state,
        loadingDocumentosAlumno: false,
        erroresDocumentosAlumno: [],
        mensajeDocumentosAlumno: 'Documentacion actualizada correctamente',
      };
    case EDITAR_DOCUMENTOS_ALUMNO_FALLIDO:
      return {
        ...state,
        loadingDocumentosAlumno: false,
        erroresDocumentosAlumno: payload,
      };
    case LIMPIAR_MENSAJES_DOCUMENTOS_ALUMNO:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
