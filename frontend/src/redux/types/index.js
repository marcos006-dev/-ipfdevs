// AUTH

export const INICIO_SESION_REQUEST = 'INICIO_SESION_REQUEST';
export const INICIO_SESION_EXITOSO = 'INICIO_SESION_EXITOSO';
export const INICIO_SESION_FALLIDO = 'INICIO_SESION_FALLIDO';
export const CERRAR_SESION = 'CERRAR_SESION';

export const CARGAR_DATOS_USUARIO_REQUEST = 'CARGAR_DATOS_USUARIO_REQUEST';
export const CARGAR_DATOS_USUARIO_EXITOSO = 'CARGAR_DATOS_USUARIO_EXITOSO';
export const CARGAR_DATOS_USUARIO_FALLIDO = 'CARGAR_DATOS_USUARIO_FALLIDO';
export const BORRAR_DATOS_USUARIO = 'BORRAR_DATOS_USUARIO';

// USUARIO ADMINISTRATIVO

// materias GET
export const FETCH_MATERIAS_REQUEST = 'FETCH_MATERIAS_REQUEST';
export const FETCH_MATERIAS_EXITOSO = 'FETCH_MATERIAS_EXITOSO';
export const FETCH_MATERIAS_FALLIDO = 'FETCH_MATERIAS_FALLIDO';

// materias POST
export const GUARDAR_MATERIA_REQUEST = 'GUARDAR_MATERIA_REQUEST';
export const GUARDAR_MATERIA_EXITOSO = 'GUARDAR_MATERIA_EXITOSO';
export const GUARDAR_MATERIA_FALLIDO = 'GUARDAR_MATERIA_FALLIDO';

// materias PUT
export const EDITAR_MATERIA_REQUEST = 'EDITAR_MATERIA_REQUEST';
export const EDITAR_MATERIA_EXITOSO = 'EDITAR_MATERIA_EXITOSO';
export const EDITAR_MATERIA_FALLIDO = 'EDITAR_MATERIA_FALLIDO';

// materias PATCH
export const ACTIVAR_MATERIA_REQUEST = ' ACTIVAR_MATERIA_REQUEST';
export const ACTIVAR_MATERIA_EXITOSO = ' ACTIVAR_MATERIA_EXITOSO';
export const ACTIVAR_MATERIA_FALLIDO = ' ACTIVAR_MATERIA_FALLIDO';

// materias DELETE
export const DESACTIVAR_MATERIA_REQUEST = ' DESACTIVAR_MATERIA_REQUEST';
export const DESACTIVAR_MATERIA_EXITOSO = ' DESACTIVAR_MATERIA_EXITOSO';
export const DESACTIVAR_MATERIA_FALLIDO = ' DESACTIVAR_MATERIA_FALLIDO';

export const LIMPIAR_MENSAJES_MATERIAS = 'LIMPIAR_MENSAJES_MATERIAS';
export const RESET_MATERIAS = 'RESET_MATERIAS';

// carreras GET
export const GET_CARRERAS_REQUEST = 'GET_CARRERAS_REQUEST';
export const GET_CARRERAS_EXITOSO = 'GET_CARRERAS_EXITOSO';
export const GET_CARRERAS_FALLIDO = 'GET_CARRERAS_FALLIDO';

// usuarios GET
export const GET_USUARIOS_REQUEST = 'GET_USUARIOS_REQUEST';
export const GET_USUARIOS_EXITOSO = 'GET_USUARIOS_EXITOSO';
export const GET_USUARIOS_FALLIDO = 'GET_USUARIOS_FALLIDO';

// usuarios POST
export const GUARDAR_USUARIO_REQUEST = 'GUARDAR_USUARIO_REQUEST';
export const GUARDAR_USUARIO_EXITOSO = 'GUARDAR_USUARIO_EXITOSO';
export const GUARDAR_USUARIO_FALLIDO = 'GUARDAR_USUARIO_FALLIDO';

export const EDITAR_USUARIO_REQUEST = 'EDITAR_USUARIO_REQUEST';
export const EDITAR_USUARIO_EXITOSO = 'EDITAR_USUARIO_EXITOSO';
export const EDITAR_USUARIO_FALLIDO = 'EDITAR_USUARIO_FALLIDO';

// usuarios PATCH
export const ACTIVAR_USUARIO_REQUEST = ' ACTIVAR_USUARIO_REQUEST';
export const ACTIVAR_USUARIO_EXITOSO = ' ACTIVAR_USUARIO_EXITOSO';
export const ACTIVAR_USUARIO_FALLIDO = ' ACTIVAR_USUARIO_FALLIDO';

// materias DELETE
export const DESACTIVAR_USUARIO_REQUEST = ' DESACTIVAR_USUARIO_REQUEST';
export const DESACTIVAR_USUARIO_EXITOSO = ' DESACTIVAR_USUARIO_EXITOSO';
export const DESACTIVAR_USUARIO_FALLIDO = ' DESACTIVAR_USUARIO_FALLIDO';

export const LIMPIAR_MENSAJES_USUARIOS = 'LIMPIAR_MENSAJES_USUARIOS';

// avisos GET
export const GET_AVISOS_REQUEST = 'GET_AVISOS_REQUEST';
export const GET_AVISOS_EXITOSO = 'GET_AVISOS_EXITOSO';
export const GET_AVISOS_FALLIDO = 'GET_AVISOS_FALLIDO';

// avisos administrativos POST
export const GUARDAR_AVISO_REQUEST = 'GUARDAR_AVISO_REQUEST';
export const GUARDAR_AVISO_EXITOSO = 'GUARDAR_AVISO_EXITOSO';
export const GUARDAR_AVISO_FALLIDO = 'GUARDAR_AVISO_FALLIDO';

export const EDITAR_AVISO_REQUEST = 'EDITAR_AVISO_REQUEST';
export const EDITAR_AVISO_EXITOSO = 'EDITAR_AVISO_EXITOSO';
export const EDITAR_AVISO_FALLIDO = 'EDITAR_AVISO_FALLIDO';

// avisos DELETE
export const BORRAR_AVISO_REQUEST = ' BORRAR_AVISO_REQUEST';
export const BORRAR_AVISO_EXITOSO = ' BORRAR_AVISO_EXITOSO';
export const BORRAR_AVISO_FALLIDO = ' BORRAR_AVISO_FALLIDO';

// limpiar mensajes aviso administrativo
export const LIMPIAR_MENSAJES_AVISOS = 'LIMPIAR_MENSAJES_AVISOS';

// inasistencias alumnos GET
export const GET_INASISTENCIAS_REQUEST = 'GET_INASISTENCIAS_REQUEST';
export const GET_INASISTENCIAS_EXITOSO = 'GET_INASISTENCIAS_EXITOSO';
export const GET_INASISTENCIAS_FALLIDO = 'GET_INASISTENCIAS_FALLIDO';

// limpiar mensajes inasistencias alumnos
export const LIMPIAR_MENSAJES_INASISTENCIAS = 'LIMPIAR_MENSAJES_INASISTENCIAS';

// horarios alumnos GET
export const GET_HORARIOS_ALUMNO_REQUEST = 'GET_HORARIOS_ALUMNO_REQUEST';
export const GET_HORARIOS_ALUMNO_EXITOSO = 'GET_HORARIOS_ALUMNO_EXITOSO';
export const GET_HORARIOS_ALUMNO_FALLIDO = 'GET_HORARIOS_ALUMNO_FALLIDO';

// limpiar mensajes horarios alumnos
export const LIMPIAR_MENSAJES_HORARIOS_ALUMNO =
  'LIMPIAR_MENSAJES_HORARIOS_ALUMNO';

// notas alumnos GET
export const GET_NOTAS_ALUMNO_REQUEST = 'GET_NOTAS_ALUMNO_REQUEST';
export const GET_NOTAS_ALUMNO_EXITOSO = 'GET_NOTAS_ALUMNO_EXITOSO';
export const GET_NOTAS_ALUMNO_FALLIDO = 'GET_NOTAS_ALUMNO_FALLIDO';

// limpiar mensajes notas alumnos
export const LIMPIAR_MENSAJES_NOTAS_ALUMNO = 'LIMPIAR_MENSAJES_NOTAS_ALUMNO';

// documentaciones alumnos GET
export const GET_DOCUMENTOS_ALUMNO_REQUEST = 'GET_DOCUMENTOS_ALUMNO_REQUEST';
export const GET_DOCUMENTOS_ALUMNO_EXITOSO = 'GET_DOCUMENTOS_ALUMNO_EXITOSO';
export const GET_DOCUMENTOS_ALUMNO_FALLIDO = 'GET_DOCUMENTOS_ALUMNO_FALLIDO';

// documentaciones alumnos PUT

export const EDITAR_DOCUMENTOS_ALUMNO_REQUEST =
  'EDITAR_DOCUMENTOS_ALUMNO_REQUEST';
export const EDITAR_DOCUMENTOS_ALUMNO_EXITOSO =
  'EDITAR_DOCUMENTOS_ALUMNO_EXITOSO';
export const EDITAR_DOCUMENTOS_ALUMNO_FALLIDO =
  'EDITAR_DOCUMENTOS_ALUMNO_FALLIDO';

// limpiar mensajes documentaciones alumnos
export const LIMPIAR_MENSAJES_DOCUMENTOS_ALUMNO =
  'LIMPIAR_MENSAJES_DOCUMENTOS_ALUMNO';
