import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import Alerta from '../../../components/Alerta';
import MensajeErrorInput from '../../../components/MensajeErrorInput';
import Spinner from '../../../components/Spinner';
import Container from '../../../layouts/Container';
import {
  limpiarMensajesAvisos,
  postDataAviso,
} from '../../../redux/actions/administrativos/avisosActions';
import { getDataMateriasDocentes } from '../../../redux/actions/administrativos/materiasAction';
import AvisoMaterias from './AvisoMaterias';

const AgregarAvisoDocente = () => {
  const { loadingAvisos, erroresAvisos, mensajeAvisos } = useSelector(
    (state) => state.avisosAdministrativos
  );

  const [materiasSelected, setMateriasSelected] = useState([]);
  const dispatch = useDispatch();
  // esquema de validacion
  const schemaAgregarAviso = Yup.object({
    descripcion_aviso: Yup.string().required('Este campo es requerido'),
    _materia: Yup.array()
      .required('Este campo es requerido')
      .min(1, 'Se debe seleccionar almenos 1 una materia'),
  });

  const handleSubmit = (values) => {
    const { descripcion_aviso, _materia } = values;

    const avisoRegistrar = {
      descripcion_aviso,
      _materia,
    };
    // console.log(avisoRegistrar);
    dispatch(postDataAviso(avisoRegistrar));
  };

  useEffect(() => {
    dispatch(getDataMateriasDocentes());
    return () => {
      dispatch(limpiarMensajesAvisos());
    };
  }, []);

  return (
    <Container>
      <div className="col-sm-12 col-xl-12">
        <div className="bg-light rounded h-100 p-4">
          <h3 className="mb-4">Nuevo Aviso</h3>
          <Formik
            initialValues={{
              descripcion_aviso: '',
              _materia: [],
            }}
            validationSchema={schemaAgregarAviso}
            onSubmit={handleSubmit}
          >
            {({ handleChange }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="descripcion_aviso" className="form-label">
                    Descripcion Aviso
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcion_aviso"
                    name="descripcion_aviso"
                    placeholder="Ingrese una descripcion para el aviso"
                    autoFocus
                  />
                  <MensajeErrorInput name="descripcion_aviso" />
                </div>
                <AvisoMaterias
                  materiasSelected={materiasSelected}
                  setMateriasSelected={setMateriasSelected}
                  handleChange={handleChange}
                />
                <button type="submit" className="btn btn-success mb-3">
                  Guardar
                </button>
                <NavLink to="/enviar-avisos">
                  <button className="btn btn-info mb-3 ms-2">
                    Volver Atras
                  </button>
                </NavLink>
                {loadingAvisos && <Spinner />}

                {erroresAvisos?.length > 0 &&
                  erroresAvisos.map((error, i) => (
                    <Alerta
                      clase={'alert-danger'}
                      key={i}
                      mensaje={error.msg}
                    />
                  ))}

                {mensajeAvisos && (
                  <Alerta clase={'alert-success'} mensaje={mensajeAvisos} />
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Container>
  );
};

export default AgregarAvisoDocente;
