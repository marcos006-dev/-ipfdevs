import { combineReducers } from 'redux';
import authReducer from './authReducer';
import materiasReducer from './administrativos/materiasReducer';
import usuariosReducer from './administrativos/usuariosReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  materias: materiasReducer,
  usuarios: usuariosReducer,
});

export default rootReducer;
