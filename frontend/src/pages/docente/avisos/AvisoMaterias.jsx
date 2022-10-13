import { Field } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import MensajeErrorInput from '../../../components/MensajeErrorInput';

const AvisoMaterias = ({
  materiasSelected,
  setMateriasSelected,
  handleChange,
}) => {
  const { dataMaterias, erroresMaterias, loadingMaterias } = useSelector(
    (state) => state.materias
  );

  const handleChangeMateriasSelected = (e) => {
    const idMateria = e.target.value;
    if (e.target.checked) {
      setMateriasSelected([...materiasSelected, e.target.value]);
    } else {
      const newMateriasSelected = materiasSelected.filter(
        (materia) => materia !== idMateria
      );
      setMateriasSelected(newMateriasSelected);
    }
  };

  return (
    <div className="mb-3">
      <label className="form-label">Materia</label>

      {loadingMaterias && <h6>Cargando materias</h6>}

      {erroresMaterias?.length > 0 &&
        erroresMaterias.map((error, i) => (
          <Alerta clase={'alert-danger'} key={i} mensaje={error.msg} />
        ))}

      {dataMaterias.length > 0 &&
        dataMaterias.map((materia) => (
          <div className="form-check" key={materia._id}>
            <Field
              className="form-check-input"
              type="checkbox"
              value={materia._id}
              id={materia.descripcion_materia}
              name="_materia"
              onChange={(e) => {
                handleChange(e);
                handleChangeMateriasSelected(e);
              }}
              checked={materiasSelected.includes(materia._id) ? 'checked' : ''}
            />
            <label
              className="form-check-label"
              htmlFor={materia.descripcion_materia}
            >
              {materia.descripcion_materia}
            </label>
          </div>
        ))}
      <MensajeErrorInput name="_materia" />
    </div>
  );
};

export default AvisoMaterias;
