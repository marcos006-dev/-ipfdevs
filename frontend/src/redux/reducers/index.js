import { combineReducers } from 'redux';
import authReducer from './authReducer';
import materiasReducer from './administrativos/materiasReducer';
import usuariosReducer from './administrativos/usuariosReducer';
import carrerasReducer from './administrativos/carrerasReducer';
import avisosAdministrativosReducer from './administrativos/avisosReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  materias: materiasReducer,
  usuarios: usuariosReducer,
  carreras: carrerasReducer,
  avisosAdministrativos: avisosAdministrativosReducer,
});

export default rootReducer;
