import { PersonaModel } from "../../models/Persona.model.js";

export const vaciarColecciones = async () => {
  try {
    await PersonaModel.deleteMany();
  } catch (error) {
    return Promise.reject(error);
  }
};
