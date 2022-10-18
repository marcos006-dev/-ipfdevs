import { combineReducers } from 'redux';
import authReducer from './authReducer';
import materiasReducer from './administrativos/materiasReducer';
import usuariosReducer from './administrativos/usuariosReducer';
import carrerasReducer from './administrativos/carrerasReducer';
import avisosAdministrativosReducer from './administrativos/avisosReducer';
import inasistenciasAlumnosReducer from './alumnos/inasistenciasReducer';
import horariosAlumnoReducer from './alumnos/horariosReducer';
import notasAlumnoReducer from './alumnos/notasReducer';
import documentosAlumnoReducer from './alumnos/documentosReducer';
import horariosDocenteReducer from './docentes/horariosReducer';


const rootReducer = combineReducers({
  auth: authReducer,
  materias: materiasReducer,
  usuarios: usuariosReducer,
  carreras: carrerasReducer,
  avisosAdministrativos: avisosAdministrativosReducer,
  inasistenciasAlumnos: inasistenciasAlumnosReducer,
  horariosAlumnos: horariosAlumnoReducer,
  notasAlumnos: notasAlumnoReducer,
  documentosAlumnos: documentosAlumnoReducer,
  horariosDocentes: horariosDocenteReducer,
});

export default rootReducer;
