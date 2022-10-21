import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import MensajeErrorInput from '../../../components/MensajeErrorInput';
import Container from '../../../layouts/Container';
import { getDataHorariosDocente } from '../../../redux/actions/docentes/horariosAction';

const AgregarNotaDocente = () => {
  const [materiaTipoNota, setMateriaTipoNota] = useState({
    _materia: '',
    tipo_nota: '',
  });

  const {
    dataHorariosDocente,
    erroresHorariosDocente,
    loadingHorariosDocente,
  } = useSelector((state) => state.horariosDocentes);

  const materiasDocente = Object.values(dataHorariosDocente)[0];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataHorariosDocente());
  }, []);

  const handleChangeParamsNota = (e) => {
    const { name } = e.target;
    const { value } = e.target;

    const newMateriaTipoNota = Object.assign({}, materiaTipoNota);
    newMateriaTipoNota[name] = value;
    setMateriaTipoNota(newMateriaTipoNota);
  };

  useEffect(() => {
    if (materiaTipoNota?._materia === '' || materiaTipoNota?.tipo_nota === '')
      return;

    console.log('fetch');
  }, [materiaTipoNota]);

  return (
    <Container>
      <div className="col-sm-12 col-xl-12">
        <div className="bg-light rounded h-100 p-4">
          <h6 className="mb-4">Cargar Notas</h6>
          <Formik
            initialValues={{
              _materia: '',
              tipo_nota: '',
            }}
            // validationSchema={schemaAgregarMateria}
            // onSubmit={handleSubmit}
          >
            {({ isSubmitting, handleChange }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="_materia" className="form-label">
                    Materia
                  </label>

                  {loadingHorariosDocente && <h1>Cargando Materias</h1>}

                  {erroresHorariosDocente?.length > 0 &&
                    erroresHorariosDocente.map((error, i) => (
                      <Alerta
                        clase={'alert-danger'}
                        key={i}
                        mensaje={error.msg}
                      />
                    ))}

                  {materiasDocente?.length > 0 && (
                    <>
                      <Field
                        as="select"
                        className="form-select"
                        id="_materia"
                        name="_materia"
                        onChange={(e) => {
                          handleChange(e);
                          handleChangeParamsNota(e);
                        }}
                      >
                        <option value="" disabled>
                          Seleccione una opcion
                        </option>
                        {materiasDocente?.map((materia) => (
                          <option
                            value={materia.descripcion_materia}
                            key={materia._id}
                          >
                            {materia.descripcion_materia} -{' '}
                            {materia.nombre_carrera}
                          </option>
                        ))}
                      </Field>
                      <MensajeErrorInput name="_materia" />
                    </>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="tipo_nota" className="form-label">
                    Tipo Nota
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="tipo_nota"
                    name="tipo_nota"
                    onChange={(e) => {
                      handleChange(e);
                      handleChangeParamsNota(e);
                    }}
                  >
                    <option value="" disabled>
                      Seleccione una opcion
                    </option>
                    <option value="primer parcial">Primer Parcial</option>

                    <option value="segundo parcial">Segundo Parcial</option>

                    <option value="recuperatorio">Recuperatorio</option>

                    <option value="recuperatorio extraordinaria">
                      Recuperatorio Extraordinaria
                    </option>
                  </Field>
                  <MensajeErrorInput name="tipo_nota" />
                </div>

                {/* <HorariosMaterias
                  diasSemanaSelected={diasSemanaSelected}
                  setDiasSemanaSelected={setDiasSemanaSelected}
                  horariosSemanaSelected={horariosSemanaSelected}
                  setHorariosSemanaSelected={setHorariosSemanaSelected}
                  horariosError={horariosError}
                  handleChange={handleChange}
                /> */}
                <button type="submit" className="btn btn-success mb-3">
                  Guardar
                </button>
                <NavLink to="/notas-docentes">
                  <button className="btn btn-info mb-3 ms-2">
                    Volver Atras
                  </button>
                </NavLink>
                {/* {loadingMaterias && <Spinner />}

                {erroresMaterias?.length > 0 &&
                  erroresMaterias.map((error, i) => (
                    <Alerta
                      clase={'alert-danger'}
                      key={i}
                      mensaje={error.msg}
                    />
                  ))}

                {mensajesMaterias && (
                  <Alerta clase={'alert-success'} mensaje={mensajesMaterias} />
                )} */}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Container>
  );
};

export default AgregarNotaDocente;
