import { AvisoModel } from "../../models/Aviso.model.js";
import { MateriaModel } from "../../models/Materia.model.js";
import { NotaModel } from "../../models/Nota.model.js";
import { PersonaModel } from "../../models/Persona.model.js";

export const vaciarColecciones = async () => {
  try {
    await PersonaModel.deleteMany();
    await MateriaModel.deleteMany();
    await NotaModel.deleteMany();
    await AvisoModel.deleteMany();
  } catch (error) {
    return Promise.reject(error);
  }
};
