import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import Alerta from '../../../components/Alerta';
import MensajeErrorInput from '../../../components/MensajeErrorInput';
import Spinner from '../../../components/Spinner';
import Container from '../../../layouts/Container';
import { postDataMateria } from '../../../redux/actions/administrativos/materiasAction';
// import HorarioSemana from './HorarioSemana';
import HorariosMaterias from './HorariosMaterias';

const AgregarMateria = () => {
  const [diasSemanaSelected, setDiasSemanaSelected] = useState([]);
  const [horariosSemanaSelected, setHorariosSemanaSelected] = useState([]);
  const [horariosError, setHorariosError] = useState(false);

  const materia = useSelector((state) => state.materias);
  const dispatch = useDispatch();

  // esquema de validacion
  const schemaAgregarMateria = Yup.object({
    descripcion_materia: Yup.string().required('Este campo es requerido'),
    nombre_carrera: Yup.string().required('Este campo es requerido'),
    dia_semana: Yup.array()
      .min(1, 'Debe seleccionar almenos un dia de la semana')
      .required('Este campo es requerido'),
    descripcion_anio: Yup.string().required('Este campo es requerido'),
  });

  // funcion de envio de formulario
  const handleSubmit = (values) => {
    const { descripcion_materia, nombre_carrera, descripcion_anio } = values;

    // verificar si hay concodancia entre los dias de semena seleccionados y los horarios
    const diasSemanaEditar = [];
    horariosSemanaSelected.filter(({ dia_semana }) => {
      const isDuplicate = diasSemanaEditar.includes(dia_semana);

      if (!isDuplicate) {
        diasSemanaEditar.push(dia_semana);
        return true;
      }
      return false;
    });

    for (let i = 0; i < diasSemanaSelected.length; i++) {
      if (!diasSemanaEditar.includes(diasSemanaSelected[i])) {
        setHorariosError(true);
        return;
      }
    }
    setHorariosError(false);

    const materiaGuardar = {
      descripcion_materia,
      nombre_carrera,
      horarios: horariosSemanaSelected,
      anio_lectivo: [
        {
          descripcion_anio,
        },
      ],
    };

    // console.log(materiaGuardar);
    dispatch(postDataMateria(materiaGuardar));
  };

  return (
    <Container>
      <div className="col-sm-12 col-xl-12">
        <div className="bg-light rounded h-100 p-4">
          <h6 className="mb-4">Nueva Materia</h6>
          <Formik
            initialValues={{
              descripcion_materia: '',
              nombre_carrera: '',
              dia_semana: [],
              descripcion_anio: '',
            }}
            validationSchema={schemaAgregarMateria}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, handleChange }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="descripcion_materia" className="form-label">
                    Descripcion Materia
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcion_materia"
                    name="descripcion_materia"
                    autoFocus
                  />
                  <MensajeErrorInput name="descripcion_materia" />
                </div>
                <div className="mb-3">
                  <label htmlFor="nombre_carrera" className="form-label">
                    Carrera
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="nombre_carrera"
                    name="nombre_carrera"
                  >
                    <option value="" disabled>
                      Seleccione una opcion
                    </option>
                    <option value="Tecnico en Programación">
                      Tecnico en Programación
                    </option>
                  </Field>
                  <MensajeErrorInput name="nombre_carrera" />
                </div>

                <HorariosMaterias
                  diasSemanaSelected={diasSemanaSelected}
                  setDiasSemanaSelected={setDiasSemanaSelected}
                  horariosSemanaSelected={horariosSemanaSelected}
                  setHorariosSemanaSelected={setHorariosSemanaSelected}
                  horariosError={horariosError}
                  handleChange={handleChange}
                />

                <div className="mb-3">
                  <label htmlFor="descripcion_anio" className="form-label">
                    Año Lectivo
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="descripcion_anio"
                    name="descripcion_anio"
                  >
                    <option value="" disabled>
                      Seleccione una opcion
                    </option>
                    <option value="2022">2022</option>
                  </Field>
                  <MensajeErrorInput name="descripcion_anio" />
                </div>
                <button type="submit" className="btn btn-success mb-3">
                  Guardar
                </button>
                <NavLink to="/materias">
                  <button className="btn btn-info mb-3 ms-2">
                    Volver Atras
                  </button>
                </NavLink>
                {materia.enviandoDatosMaterias && <Spinner />}

                {materia.erroresGuardadoMateria?.length > 0 &&
                  materia.erroresGuardadoMateria.map((error, i) => (
                    <Alerta
                      clase={'alert-danger'}
                      key={i}
                      mensaje={error.msg}
                    />
                  ))}

                {materia.guardadoExistosoMateria && (
                  <Alerta
                    clase={'alert-success'}
                    mensaje={'Materia agregada correctamente'}
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

export default AgregarMateria;
