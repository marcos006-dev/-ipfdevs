import { BORRAR_MENSAJE, ESTABLECER_MENSAJE } from '../types';

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ESTABLECER_MENSAJE:
      return { message: payload };

    case BORRAR_MENSAJE:
      return { message: null };

    default:
      return state;
  }
}
