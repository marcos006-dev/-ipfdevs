import { combineReducers } from 'redux';
import authReducer from './authReducer';
import materiasReducer from './administrativos/materiasReducer';
import usuariosReducer from './administrativos/usuariosReducer';
import carrerasReducer from './administrativos/carrerasReducer';
import avisosAdministrativosReducer from './administrativos/avisosReducer';
import inasistenciasAlumnosReducer from './alumnos/inasistenciasReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  materias: materiasReducer,
  usuarios: usuariosReducer,
  carreras: carrerasReducer,
  avisosAdministrativos: avisosAdministrativosReducer,
  inasistenciasAlumnos: inasistenciasAlumnosReducer,
});

export default rootReducer;
