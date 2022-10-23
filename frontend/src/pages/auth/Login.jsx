import { Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Alerta from '../../components/Alerta';
// import MensajeErrorInput from '../../components/MensajeErrorInput';
import { login } from '../../redux/actions/authAction';

const Login = () => {
  const { token, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = ({ username_usuario, password_usuario }) => {
    dispatch(login(username_usuario, password_usuario));
  };

  useEffect(() => {
    if (token !== null) {
      navigate('/inicio-administrativo');
    }
  }, [token]);

  return (
    <Formik
      // innerRef={}
      initialValues={{
        username_usuario: '',
        password_usuario: '',
      }}
      onSubmit={handleSubmit}
    >
      <div className="container-xxl position-relative bg-white d-flex p-0">
        <div className="container-fluid">
          <div
            className="row h-100 align-items-center justify-content-center"
            style={{ minHeight: '100vh' }}
          >
            <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
              <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <h3>Iniciar Sesión</h3>
                </div>
                <Form>
                  <div className="form-floating mb-3">
                    <Field
                      type="text"
                      className="form-control"
                      id="username_usuario"
                      placeholder="Por favor ingrese su usuario"
                      name="username_usuario"
                      autoFocus
                    />
                    <label htmlFor="username_usuario">Ingrese su usuario</label>

                    {/* <MensajeErrorInput name={'username_usuario'} /> */}
                  </div>
                  <div className="form-floating mb-4">
                    <Field
                      type="password"
                      className="form-control"
                      id="password_usuario"
                      placeholder="Por favor ingrese su password"
                      name="password_usuario"
                    />
                    <label htmlFor="password_usuario">
                      Ingrese su password
                    </label>
                    {/* <MensajeErrorInput name={'password_usuario'} /> */}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary py-3 w-100 mb-4"
                  >
                    Iniciar Sesión
                  </button>
                </Form>
                {error?.length > 0 &&
                  error.map((error, i) => (
                    <Alerta
                      clase={'alert-danger'}
                      key={i}
                      mensaje={error.msg}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Formik>
  );
};

export default Login;
