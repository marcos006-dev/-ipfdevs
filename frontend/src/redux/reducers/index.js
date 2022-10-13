import { combineReducers } from 'redux';
import authReducer from './authReducer';
import materiasReducer from './administrativos/materiasReducer';
import usuariosReducer from './administrativos/usuariosReducer';
import carrerasReducer from './administrativos/carrerasReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  materias: materiasReducer,
  usuarios: usuariosReducer,
  carreras: carrerasReducer,
});

export default rootReducer;
