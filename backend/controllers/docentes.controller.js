import { MateriaModel } from "../models/Materia.model.js";
import { NotaModel } from "../models/Nota.model.js";
import { PersonaModel } from "../models/Persona.model.js";

export const getMateriasDocente = async (req, res) => {
  try {
    const { _id } = req.decoded;
    const materias = await PersonaModel.findById(_id).select("_materia -_id").populate({ path: "_materia", select: "descripcion_materia horarios _id nombre_carrera" });

    // console.log(materias);
    return res.status(200).json(materias);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getNotasDocente = async (req, res) => {
  try {
    // const { _id } = req.decoded;

    // obtener materias docente

    // const { _materia } = await PersonaModel.findById(_id);

    // console.log(_materia);
    // const notas = await NotaModel.find({ _materia }).select("_materia -_id estado_nota tipo_nota").distinct("tipo_nota");

    const notas = await NotaModel.aggregate(
      [
        {
          $group: {
            _id: "$_materia",
            tipo_nota: { $first: "$tipo_nota" },
            estado_nota: { $first: "$estado_nota" },
            descripcion_materia: { $first: "$descripcion_materia" },
            _materia: { $first: "$_materia" },
          },
        },
      ],
    );
    // console.log(notas);
    return res.status(200).json(notas);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getNotasMateriasDocente = async (req, res) => {
  try {
    // const { _id } = req.decoded;
    const { _materia, tipo_nota } = JSON.parse(req.params.id);

    // obtener alumnos asociados a una materia

    const totalAlumnoNotas = [];

    const alumnosMaterias = await PersonaModel.find({ _materia, "roles.descripcion_rol": "alumno" });

    // eslint-disable-next-line no-restricted-syntax
    for (const alumno of alumnosMaterias) {
      const { _id, nombre_persona, apellido_persona } = alumno;

      // eslint-disable-next-line no-await-in-loop
      const notaAlumno = await NotaModel.findOne({ _materia, tipo_nota, _persona: _id }).populate({
        path: "_persona",
        select: "nombre_persona apellido_persona dni_persona",
      });

      if (notaAlumno) {
        const { descripcion_nota } = notaAlumno;
        const addNotaAlumnoArray = {
          datosAlumno: `${nombre_persona} ${apellido_persona}`,
          _persona: _id,
          descripcion_nota,
          tipo_nota,
          _materia,
        };
        totalAlumnoNotas.push(addNotaAlumnoArray);
      } else {
        const addNotaAlumnoArray = {
          datosAlumno: `${nombre_persona} ${apellido_persona}`,
          _persona: _id,
          descripcion_nota: 0,
          tipo_nota,
          _materia,
        };
        totalAlumnoNotas.push(addNotaAlumnoArray);
      }
    }

    return res.status(200).json(totalAlumnoNotas);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const putNotasDocente = async (req, res) => {
  try {
    // const { id } = req.params;

    const {
      dataMateriaPut,
    } = req.body;

    // console.log(dataMateriaPut);

    // eslint-disable-next-line no-restricted-syntax
    for (const materiaItem of dataMateriaPut) {
      const {
        _persona, descripcion_nota, tipo_nota, _materia,
      } = materiaItem;

      // eslint-disable-next-line no-await-in-loop
      const { descripcion_materia } = await MateriaModel.findOne({ _id: _materia });

      const estadoNota = "en revision";
      // buscar nota si ya esta creado

      // eslint-disable-next-line no-await-in-loop
      const notaAlumno = await NotaModel.findOne({ _persona, tipo_nota, _materia });

      if (!notaAlumno) {
        // crear nota
        materiaItem.descripcion_materia = descripcion_materia;
        materiaItem.estado_nota = estadoNota;

        // eslint-disable-next-line no-await-in-loop
        await NotaModel.create(materiaItem);
      } else {
        // actualizar nota

        // eslint-disable-next-line no-underscore-dangle, no-await-in-loop
        await NotaModel.findByIdAndUpdate(notaAlumno._id, {
          descripcion_nota,
        });
      }
    }

    return res.status(200).json("Nota actualizada correctamente");
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteNotasDocente = async (req, res) => {
  try {
    const { _materia, tipo_nota } = JSON.parse(req.params.id);
    // await NotaModel.findByIdAndDelete(id);
    // console.log(_materia);
    const notasEliminar = await NotaModel.find({ _materia, tipo_nota });

    // eslint-disable-next-line no-restricted-syntax
    for (const materiaItemEliminar of notasEliminar) {
      // console.log(materiaItemEliminar);
      // eslint-disable-next-line no-await-in-loop, no-underscore-dangle
      await NotaModel.findByIdAndDelete(materiaItemEliminar._id);
    }

    return res.status(200).json("Notas eliminadas correctamente");
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
