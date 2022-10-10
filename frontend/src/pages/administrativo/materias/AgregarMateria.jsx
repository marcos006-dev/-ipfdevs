import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Alerta from '../../../components/Alerta';
import MensajeErrorInput from '../../../components/MensajeErrorInput';
import Spinner from '../../../components/Spinner';
import Container from '../../../layouts/Container';
import { postDataMateria } from '../../../redux/actions/administrativos/materiasAction';

const HorarioSemana = ({
  horariosSemana,
  dia,
  handleChangeHorariosSemana,
  handleChange,
}) => {
  return (
    <div className="mb-3">
      <label className="form-label">Horario para el dia: {dia}</label>

      {horariosSemana.map((horario, i) => (
        <div className="form-check" key={i}>
          <Field
            className="form-check-input"
            type="checkbox"
            value={horario}
            id={`${horario}-${dia}`}
            name={dia}
            onChange={(e) => {
              handleChange(e);
              handleChangeHorariosSemana(e);
            }}
          />
          <label className="form-check-label" htmlFor={`${horario}-${dia}`}>
            {horario}
          </label>
        </div>
      ))}
      <MensajeErrorInput name={dia} />
    </div>
  );
};

const AgregarMateria = () => {
  const [diasSemanaSelected, setDiasSemanaSelected] = useState([]);
  const [horariosSemanaSelected, setHorariosSemanaSelected] = useState([]);

  const materia = useSelector((state) => state.materias);
  const dispatch = useDispatch();

  const diasSemana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  const horariosSemana = [
    '09:40 a 10:00',
    '10:00 a 10:40',
    '10:40 a 11:20',
    '11:20 a 12:00',
    '12:00 a 14:00',
    '14:00 a 14:40',
    '14:40 a 15:20',
    '15:20 a 16:00',
    '16:00 a 17:00',
  ];

  // esquema de validacion
  const schemaAgregarMateria = Yup.object({
    descripcion_materia: Yup.string().required('Este campo es requerido'),
    nombre_carrera: Yup.string().required('Este campo es requerido'),
    dia_semana: Yup.array()
      .min(1, 'Debe seleccionar almenos un dia de la semana')
      .required('Este campo es requerido'),
    descripcion_anio: Yup.string().required('Este campo es requerido'),
  });

  // escuchador de cambios para los dias de la semana
  const handleChangeDiaSemanaSelected = (e) => {
    const diaSelected = e.target.value;

    if (e.target.checked) {
      setDiasSemanaSelected([...diasSemanaSelected, e.target.value]);
    } else {
      const newDiasSemanaSelected = diasSemanaSelected.filter(
        (dia) => dia !== diaSelected
      );

      const horarios = horariosSemanaSelected.filter(
        (horario) => horario.dia_semana !== diaSelected
      );
      // console.log(horarios);
      setDiasSemanaSelected(newDiasSemanaSelected);
      setHorariosSemanaSelected(horarios);
    }
  };

  const handleChangeHorariosSemana = (e) => {
    const diaSemana = e.target.name;
    const horarioSemana = e.target.value;

    if (e.target.checked) {
      setHorariosSemanaSelected([
        ...horariosSemanaSelected,
        {
          dia_semana: diaSemana,
          horario_semana: horarioSemana,
        },
      ]);
    } else {
      const horarios = horariosSemanaSelected.filter((horario) => {
        if (
          Object.entries(horario).toString() !==
          Object.entries({
            dia_semana: diaSemana,
            horario_semana: horarioSemana,
          }).toString()
        ) {
          return horario;
        }
      });
      setHorariosSemanaSelected(horarios);
    }
  };

  // funcion de envio de formulario
  const handleSubmit = (values) => {
    const { descripcion_materia, nombre_carrera, descripcion_anio } = values;

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
                <div className="mb-3">
                  <label className="form-label">Dia de la Semana</label>

                  {diasSemana.map((dia, i) => (
                    <div className="form-check" key={i}>
                      <Field
                        className="form-check-input"
                        type="checkbox"
                        value={dia}
                        id={dia}
                        name="dia_semana"
                        onChange={(e) => {
                          handleChangeDiaSemanaSelected(e);
                          handleChange(e);
                        }}
                      />
                      <label className="form-check-label" htmlFor={dia}>
                        {dia}
                      </label>
                    </div>
                  ))}
                  <MensajeErrorInput name="dia_semana" />
                </div>

                {diasSemanaSelected.map((dia, i) => (
                  <HorarioSemana
                    horariosSemana={horariosSemana}
                    dia={dia}
                    key={i}
                    handleChangeHorariosSemana={handleChangeHorariosSemana}
                    handleChange={handleChange}
                  />
                ))}

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

                {materia.enviandoDatosMaterias && <Spinner />}

                {materia.erroresMaterias?.length > 0 &&
                  materia.erroresMaterias.map((error, i) => (
                    <Alerta
                      clase={'alert-danger'}
                      key={i}
                      mensaje={error.msg}
                    />
                  ))}

                {materia.guardadoExistoso && (
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
