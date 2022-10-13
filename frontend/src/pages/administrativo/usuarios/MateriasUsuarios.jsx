import { Field } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MensajeErrorInput from '../../../components/MensajeErrorInput';
import { getDataCarreras } from '../../../redux/actions/administrativos/carrerasAction';
import { getDataMaterias } from '../../../redux/actions/administrativos/materiasAction';

const MateriasUsuarios = ({
  handleChange,
  tipoUser,
  materias,
  setMaterias,
  carrera,
  setCarrera,
}) => {
  const { dataCarreras } = useSelector((state) => state.carreras);
  const { dataMaterias } = useSelector((state) => state.materias);

  const dispatch = useDispatch();

  const handleChangeCarrera = (e) => {
    const nombreCarrera = e.target.value;
    const materiasCarreras = [];

    for (const materia of dataMaterias) {
      if (materia.nombre_carrera === nombreCarrera) {
        materiasCarreras.push(materia._id);
      }
    }

    setMaterias(materiasCarreras);
  };

  const handleChangeMateriaCarrera = (e) => {
    const idMateria = e.target.value;
    if (e.target.checked) {
      setMaterias([...materias, idMateria]);
    } else {
      const idMateriasFiltrado = materias.filter(
        (materia) => materia !== idMateria
      );
      // console.log(idMateriasFiltrado);
      setMaterias(idMateriasFiltrado);
    }
  };

  useEffect(() => {
    dispatch(getDataCarreras());
    dispatch(getDataMaterias());
  }, []);

  useEffect(() => {
    setMaterias([]);
    setCarrera('');
    // console.log({ carrera, materias });
  }, [tipoUser]);

  if (tipoUser === 'docente') {
    return (
      <div className="mb-3">
        <div className="mb-3">
          <label className="form-label">Materia</label>

          {dataMaterias.map((materia, i) => (
            <div className="form-check" key={materia._id}>
              <Field
                className="form-check-input"
                type="checkbox"
                value={materia._id}
                id={materia.descripcion_materia}
                name="materia"
                onChange={(e) => {
                  handleChangeMateriaCarrera(e);
                  handleChange(e);
                }}
                checked={materias.includes(materia._id)}
              />
              <label
                className="form-check-label"
                htmlFor={materia.descripcion_materia}
              >
                {materia.descripcion_materia}
              </label>
            </div>
          ))}
          <MensajeErrorInput name="materia" />
        </div>
      </div>
    );
  }

  if (tipoUser === 'alumno') {
    return (
      <div className="mb-3">
        <label htmlFor="carrera" className="form-label">
          Carreras
        </label>
        <Field
          as="select"
          className="form-select"
          id="carrera"
          name="carrera"
          onChange={(e) => {
            handleChange(e);
            handleChangeCarrera(e);
            setCarrera(e.target.value);
          }}
          value={carrera}
        >
          <option value="" disabled>
            Seleccione una opcion
          </option>
          {dataCarreras.map((carrera, i) => (
            <option key={i} value={carrera}>
              {carrera}
            </option>
          ))}
        </Field>
        <MensajeErrorInput name="sexo_persona" />
      </div>
    );
  }
};

export default MateriasUsuarios;
