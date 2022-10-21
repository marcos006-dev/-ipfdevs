import bcrypt from "bcryptjs";
import { PersonaModel } from "../models/Persona.model.js";

export const getAdministrativos = async (req, res) => {
  try {
    const administrativos = await PersonaModel.find()
      .select(
        "_id direccion_persona nombre_persona apellido_persona dni_persona cuil_persona fecha_nac_persona sexo_persona correo_persona telefono_persona nombre_usuario roles _materia activo",
      )
      .populate({
        path: "_materia",
        select: "descripcion_materia nombre_carrera horarios",
      });

    // console.log(administrativos);
    return res.status(200).json(administrativos);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAdministrativo = async (req, res) => {
  try {
    const { id } = req.params;

    const administrativo = await PersonaModel.findById(id).select(
      "_id direccion_persona nombre_persona apellido_persona dni_persona cuil_persona fecha_nac_persona sexo_persona correo_persona telefono_persona nombre_usuario roles _materia activo",
    ).populate({
      path: "_materia",
      select: "descripcion_materia nombre_carrera horarios",
    });

    // console.log(administrativo);
    return res.status(200).json(administrativo);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postAdministrativo = async (req, res) => {
  const {
    nombre_persona,
    apellido_persona,
    dni_persona,
    cuil_persona,
    fecha_nac_persona,
    sexo_persona,
    correo_persona,
    telefono_persona,
    _materia,
    direccion_persona,
    nombre_usuario,
    roles,
  } = req.body;
  const tipoUsuario = {
    descripcion_rol: roles,
  };
  if (roles === "administrativo") {
    tipoUsuario.acceso_endpoint = [
      "notas",
      "materias",
      "administrativos",
      "avisos",
      "materias-carrera",
    ];
  } else if (roles === "docente") {
    tipoUsuario.acceso_endpoint = [
      "avisos",
      "materias-docentes",
      "cargar-notas",
      "editar-notas",
      "eliminar-notas",
      "avisos-docentes",
      "notas-docentes",
    ];
  } else if (roles === "alumno") {
    tipoUsuario.acceso_endpoint = [
      "inasistencias-alumnos",
      "notas-alumnos",
      "avisos-alumnos",
      "tipos-docum-alumnos",
      "horarios-alumnos",
    ];
  }

  try {
    // console.log(dni_persona);
    const passwordEncriptado = bcrypt.hashSync(`${dni_persona}`, 10);

    await PersonaModel.create({
      nombre_persona,
      apellido_persona,
      dni_persona,
      cuil_persona,
      fecha_nac_persona,
      sexo_persona,
      correo_persona,
      _materia,
      telefono_persona,
      direccion_persona,
      nombre_usuario,
      password_usuario: passwordEncriptado,
      roles: tipoUsuario,
    });

    // const { _id, nombre_persona: NombrePersona, apellido_persona: apellidPersona } = usuario;

    // const token = await generarJwt({ _id, NombrePersona, apellidPersona });

    return res.status(200).json({
      msg: "Administrativo registrado correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const putAdministrativo = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      nombre_persona,
      apellido_persona,
      dni_persona,
      cuil_persona,
      fecha_nac_persona,
      sexo_persona,
      correo_persona,
      telefono_persona,
      direccion_persona,
      _materia,
      nombre_usuario,
      roles,
    } = req.body;
    // const passwordEncriptado = bcrypt.hashSync(password_usuario, 10);

    const tipoUsuario = {
      descripcion_rol: roles,
    };
    if (roles === "administrativo") {
      tipoUsuario.acceso_endpoint = [
        "notas",
        "materias",
        "administrativos",
        "avisos",
        "materias-carrera",
        "carreras",
      ];
    } else if (roles === "docente") {
      tipoUsuario.acceso_endpoint = [
        "avisos",
        "materias-docentes",
        "cargar-notas",
        "editar-notas",
        "eliminar-notas",
      ];
    } else if (roles === "alumno") {
      tipoUsuario.acceso_endpoint = [
        "inasistencias-alumnos",
        "notas-alumnos",
        "avisos-alumnos",
        "tipos-docum-alumnos",
        "horarios-alumnos",
      ];
    }

    await PersonaModel.findByIdAndUpdate(id, {
      nombre_persona,
      apellido_persona,
      dni_persona,
      cuil_persona,
      fecha_nac_persona,
      sexo_persona,
      correo_persona,
      telefono_persona,
      direccion_persona,
      _materia,
      nombre_usuario,
      roles: tipoUsuario,
    });

    return res.status(200).json({
      msg: "Administrativo Actualizado",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteAdministrativo = async (req, res) => {
  try {
    const { id } = req.params;

    await PersonaModel.findByIdAndUpdate(id, { activo: false });
    return res.status(200).json({
      msg: "Administrativo Desactivado",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const activarAdministrativo = async (req, res) => {
  try {
    const { id } = req.params;

    await PersonaModel.findByIdAndUpdate(id, { activo: true });
    return res.status(200).json({
      msg: "Administrativo Activado",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
