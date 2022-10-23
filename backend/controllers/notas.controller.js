import { NotaModel } from "../models/Nota.model.js";

export const putNota = async (req, res) => {
  try {
    const { _materia, tipo_nota, estado_nota } = JSON.parse(req.params.id);

    await NotaModel.updateMany({ _materia, tipo_nota }, { estado_nota });

    return res.status(200).json({
      msg: "Nota Actualizado",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
