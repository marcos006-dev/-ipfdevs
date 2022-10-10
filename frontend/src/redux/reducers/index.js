import { combineReducers } from 'redux';
import authReducer from './authReducer';
import materiasReducer from './administrativos/materiasReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  materias: materiasReducer,
});

export default rootReducer;
