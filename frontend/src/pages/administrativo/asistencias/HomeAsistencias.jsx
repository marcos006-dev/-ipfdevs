import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import dayjs from 'dayjs';
// import MensajeErrorInput from '../../../components/MensajeErrorInput';
import Container from '../../../layouts/Container';
import {
  getDataCarreras,
  limpiarMensajesCarreras,
} from '../../../redux/actions/administrativos/carrerasAction';
import Alerta from '../../../components/Alerta';
import {
  getDataAsistenciasAlumnos,
  limpiarMensajesAsistenciasAlumnos,
  putDataAsistenciasAlumnos,
} from '../../../redux/actions/administrativos/asistenciasActions';
import TablaAsistencias from './TablaAsistencias';

const HomeAsistencias = () => {
  const [carrera, setCarrera] = useState('');
  const [fecha, setFecha] = useState('');
  const [error, setError] = useState('');

  const { dataCarreras, erroresCarreras, loadingCarreras } = useSelector(
    (state) => state.carreras
  );

  const {
    dataAsistenciasAlumno,
    erroresAsistenciasAlumno,
    loadingAsistenciasAlumno,
    mensajeAsistenciasAlumno,
  } = useSelector((state) => state.asistenciasAlumno);

  const [dataAsistenciaAlumno, setDataAsistenciaAlumno] = useState([]);

  const dispatch = useDispatch();

  const handleChangeCarrera = (e) => {
    const carrera = e.target.value;

    if (!carrera) {
      setError('Seleccione alguna carrera');
    } else {
      setError('');
    }
    setCarrera(carrera);
  };

  const handleChangeFecha = (e) => {
    const fecha = e.target.value;
    if (!dayjs().isSame(fecha, 'year')) {
      setError('El año de la fecha debe coincidir con el año actual');
    } else {
      setError('');
    }

    setFecha(fecha);
  };

  const handleSubmit = () => {
    console.log('Guardar Inasistencias');

    dispatch(
      putDataAsistenciasAlumnos({ carrera, fecha }, { dataAsistenciaAlumno })
    );
  };

  useEffect(() => {
    dispatch(getDataCarreras());

    return () => {
      dispatch(limpiarMensajesAsistenciasAlumnos());
      setDataAsistenciaAlumno([]);
    };
  }, []);

  useEffect(() => {
    if (error || carrera === '' || fecha === '') return;
    dispatch(getDataAsistenciasAlumnos({ carrera, fecha }));
    // return () => {
    //   dispatch(limpiarMensajesAsistenciasAlumnos());
    //   setDataAsistenciaAlumno([]);
    // };
  }, [carrera, fecha]);

  useEffect(() => {
    setDataAsistenciaAlumno(dataAsistenciasAlumno);
    // return () => {
    //   dispatch(limpiarMensajesAsistenciasAlumnos());
    //   setDataAsistenciaAlumno([]);
    // };
  }, [dataAsistenciasAlumno]);

  return (
    <Container>
      <div className="col-sm-12 col-xl-12">
        <div className="bg-light rounded h-100 p-4">
          <h2 className="mb-4 text-center">Cargar Inasistencias</h2>
          <Formik
            initialValues={{
              carrera: '',
              fecha: '',
            }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, handleChange }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="_materia" className="form-label">
                    <b>Seleccione una carrera:</b>
                  </label>

                  {loadingCarreras && (
                    <h6 className="text-center text-warning">
                      Cargando Carreras
                    </h6>
                  )}

                  {erroresCarreras?.length > 0 &&
                    erroresCarreras.map((error, i) => console.log(error))}

                  {dataCarreras?.length > 0 && (
                    <>
                      <Field
                        as="select"
                        className="form-select"
                        id="carrera"
                        name="carrera"
                        onChange={(e) => {
                          handleChange(e);
                          handleChangeCarrera(e);
                        }}
                      >
                        <option value="" disabled>
                          Seleccione una opcion
                        </option>
                        {dataCarreras?.map((materia, i) => (
                          <option value={materia} key={i}>
                            {materia}
                          </option>
                        ))}
                      </Field>
                    </>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="_materia" className="form-label">
                    <b>Seleccione una fecha:</b>
                  </label>

                  <Field
                    name="fecha"
                    type="date"
                    className="form-control"
                    onChange={(e) => {
                      handleChange(e);
                      handleChangeFecha(e);
                    }}
                  />
                </div>

                {loadingAsistenciasAlumno && (
                  <h6 className="text-center text-warning">
                    Cargando Asistencias de Alumno
                  </h6>
                )}

                {dataAsistenciasAlumno?.length > 0 && (
                  <TablaAsistencias
                    dataAsistenciaAlumno={dataAsistenciaAlumno}
                    setDataAsistenciaAlumno={setDataAsistenciaAlumno}
                    fecha={fecha}
                  />
                )}
                <button
                  type="submit"
                  className="btn btn-success mb-3"
                  disabled={dataAsistenciaAlumno.length === 0}
                >
                  Guardar
                </button>
                <NavLink to="/notas-docentes">
                  <button className="btn btn-info mb-3 ms-2">
                    Volver Atras
                  </button>
                </NavLink>

                {error && <Alerta clase={'alert-danger'} mensaje={error} />}

                {erroresAsistenciasAlumno?.length > 0 &&
                  erroresAsistenciasAlumno.map((error, i) => (
                    <Alerta
                      clase={'alert-danger'}
                      key={i}
                      mensaje={error.msg}
                    />
                  ))}
                {mensajeAsistenciasAlumno && (
                  <Alerta
                    clase={'alert-success'}
                    mensaje={mensajeAsistenciasAlumno}
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

export default HomeAsistencias;
