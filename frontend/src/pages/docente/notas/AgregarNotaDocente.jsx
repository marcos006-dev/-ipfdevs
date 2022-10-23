import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Alerta from '../../../components/Alerta';
import MensajeErrorInput from '../../../components/MensajeErrorInput';
import Container from '../../../layouts/Container';
import { getDataHorariosDocente } from '../../../redux/actions/docentes/horariosAction';
import {
  getDataNotasMateriasDocente,
  limpiarMensajesNotasDocente,
  putNotasDocente,
} from '../../../redux/actions/docentes/notasAction';
import TablaNotasAlumnos from './TablaNotasAlumnos';

const AgregarNotaDocente = () => {
  const {
    dataHorariosDocente,
    erroresHorariosDocente,
    loadingHorariosDocente,
  } = useSelector((state) => state.horariosDocentes);

  const {
    dataNotasMateriasDocente,
    erroresNotasDocente,
    loadingNotasDocente,
    mensajeNotasDocente,
  } = useSelector((state) => state.notasDocentes);

  const [materiaTipoNota, setMateriaTipoNota] = useState({
    _materia: '',
    tipo_nota: '',
  });

  const [errorNotaAlumno, setErrorNotaAlumno] = useState('');

  const [notasMateriasAlumnos, setNotasMateriasAlumnos] = useState([]);

  const materiasDocente = Object.values(dataHorariosDocente)[0];
  const dispatch = useDispatch();

  const handleChangeParamsNota = (e) => {
    const { name } = e.target;
    const { value } = e.target;

    const newMateriaTipoNota = Object.assign({}, materiaTipoNota);
    newMateriaTipoNota[name] = value;
    setMateriaTipoNota(newMateriaTipoNota);
  };

  const handleSubmit = () => {
    dispatch(putNotasDocente({ dataMateriaPut: notasMateriasAlumnos }));
  };

  useEffect(() => {
    dispatch(getDataHorariosDocente());

    return () => {
      dispatch(limpiarMensajesNotasDocente());
    };
  }, []);

  useEffect(() => {
    if (materiaTipoNota?._materia === '' || materiaTipoNota?.tipo_nota === '') {
      setNotasMateriasAlumnos([]);
      return;
    }

    dispatch(getDataNotasMateriasDocente(materiaTipoNota));
    return () => {
      dispatch(limpiarMensajesNotasDocente());
    };
  }, [materiaTipoNota]);

  // useEffect(() => {
  //   setNotasMateriasAlumnos(dataNotasMateriasDocente);
  //   return () => {
  //     dispatch(limpiarMensajesNotasDocente());
  //   };
  // }, [dataNotasMateriasDocente]);

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
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, handleChange }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="_materia" className="form-label">
                    Materia
                  </label>

                  {loadingHorariosDocente && <h6>Cargando Materias</h6>}

                  {erroresHorariosDocente?.length > 0 &&
                    erroresHorariosDocente.map((error, i) =>
                      console.log(error)
                    )}

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
                          <option value={materia._id} key={materia._id}>
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

                {loadingNotasDocente && <h6>Cargando Notas de Alumno</h6>}

                {dataNotasMateriasDocente?.length > 0 && (
                  <TablaNotasAlumnos
                    dataNotasMateriasDocente={dataNotasMateriasDocente}
                    errorNotaAlumno={errorNotaAlumno}
                    setErrorNotaAlumno={setErrorNotaAlumno}
                    notasMateriasAlumnos={notasMateriasAlumnos}
                    setNotasMateriasAlumnos={setNotasMateriasAlumnos}
                  />
                )}

                <button
                  type="submit"
                  className="btn btn-success mb-3"
                  disabled={errorNotaAlumno !== ''}
                >
                  Guardar
                </button>
                <NavLink to="/notas-docentes">
                  <button className="btn btn-info mb-3 ms-2">
                    Volver Atras
                  </button>
                </NavLink>

                {erroresNotasDocente?.length > 0 &&
                  erroresNotasDocente.map((error, i) => (
                    <Alerta
                      clase={'alert-danger'}
                      key={i}
                      mensaje={error.msg}
                    />
                  ))}
                {mensajeNotasDocente && (
                  <Alerta
                    clase={'alert-success'}
                    mensaje={mensajeNotasDocente}
                  />
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Container>
  );
};

export default AgregarNotaDocente;
