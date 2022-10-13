import { Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
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

const AgregarAviso = () => {
  const { loadingAvisos, erroresAvisos, mensajeAvisos } = useSelector(
    (state) => state.avisosAdministrativos
  );

  const dispatch = useDispatch();
  // esquema de validacion
  const schemaAgregarAviso = Yup.object({
    descripcion_aviso: Yup.string().required('Este campo es requerido'),
  });

  const handleSubmit = (values) => {
    const { descripcion_aviso } = values;

    const avisoRegistrar = {
      descripcion_aviso,
      _materia: [],
    };
    // console.log(avisoRegistrar);
    dispatch(postDataAviso(avisoRegistrar));
  };

  useEffect(() => {
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
            }}
            validationSchema={schemaAgregarAviso}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <h6 className="text-center">Descripcion Aviso</h6>
                <div className="mb-3">
                  <label htmlFor="descripcion_aviso" className="form-label">
                    Nombre Persona
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcion_aviso"
                    name="descripcion_aviso"
                    placeholder="Ingrese el nombre de la persona"
                    autoFocus
                  />
                  <MensajeErrorInput name="descripcion_aviso" />
                </div>

                <button type="submit" className="btn btn-success mb-3">
                  Guardar
                </button>
                <NavLink to="/avisos">
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

export default AgregarAviso;
