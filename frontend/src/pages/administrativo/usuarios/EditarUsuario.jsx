import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Alerta from '../../../components/Alerta';
import MensajeErrorInput from '../../../components/MensajeErrorInput';
import Spinner from '../../../components/Spinner';
import Container from '../../../layouts/Container';
import { limpiarMensajesCarreras } from '../../../redux/actions/administrativos/carrerasAction';
import {
  limpiarMensajesUsuarios,
  putUsuario,
} from '../../../redux/actions/administrativos/usuariosAction';
import MateriasUsuarios from './MateriasUsuarios';

const EditarUsuario = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  if (!state) return navigate('/usuarios');

  const [tipoUser, setTipoUser] = useState(state.roles.descripcion_rol);
  const [materias, setMaterias] = useState(state._materia);
  const [carrera, setCarrera] = useState();
  // console.log(state);
  const dispatch = useDispatch();

  const { erroresUsuarios, loadingUsuarios, mensajeUsuarios } = useSelector(
    (state) => state.usuarios
  );

  // console.log(state);
  // esquema de validacion
  const schemaAgregarEditar = Yup.object({
    nombre_persona: Yup.string().required('Este campo es requerido'),
    apellido_persona: Yup.string().required('Este campo es requerido'),
    dni_persona: Yup.string()
      .required('Este campo es requerido')
      .min(8, 'El dni debe tener como minimo 8 digitos')
      .max(8, 'El dni debe tener como maximo 8 digitos'),
    cuil_persona: Yup.string()
      .required('Este campo es requerido')
      .min(11, 'El dni debe tener como minimo 11 digitos')
      .max(11, 'El dni debe tener como maximo 11 digitos'),
    fecha_nac_persona: Yup.date()
      .required('Este campo es requerido')
      .max(
        new Date(),
        'La fecha de nacimiento no puede ser mayor a la fecha actual'
      ),
    sexo_persona: Yup.string().required('Este campo es requerido'),
    correo_persona: Yup.string()
      .required('Este campo es requerido')
      .email('El correo ingresado no es un correo valido'),
    telefono_persona: Yup.string()
      .required('Este campo es requerido')
      .min(10, 'El numero de telefono debe tener como minimo 10 digitos')
      .max(10, 'El numero de telefono debe tener como maximo 10 digitos'),
    manzana: Yup.string().required('Este campo es requerido'),
    casa: Yup.string().required('Este campo es requerido'),
    sector: Yup.string().required('Este campo es requerido'),
    lote: Yup.string().required('Este campo es requerido'),
    parcela: Yup.string().required('Este campo es requerido'),
    nombre_usuario: Yup.string().required('Este campo es requerido'),
    // password_usuario: Yup.string().required('Este campo es requerido'),
    roles: Yup.string().required('Este campo es requerido'),
  });

  const handleChangeTipoUser = (e) => {
    setTipoUser(e.target.value);
  };

  const handleSubmit = (values) => {
    const {
      nombre_persona,
      apellido_persona,
      dni_persona,
      cuil_persona,
      fecha_nac_persona,
      sexo_persona,
      correo_persona,
      telefono_persona,
      manzana,
      casa,
      sector,
      lote,
      parcela,
      nombre_usuario,
      roles,
    } = values;

    const usuarioEditar = {
      nombre_persona,
      apellido_persona,
      dni_persona,
      cuil_persona,
      fecha_nac_persona,
      sexo_persona,
      correo_persona,
      telefono_persona,
      direccion_persona: {
        manzana,
        casa,
        sector,
        lote,
        parcela,
      },
      _materia: materias,
      nombre_usuario,
      roles,
    };
    // console.log({usuarioEditar});
    // console.log(state._id);
    dispatch(putUsuario(state._id, usuarioEditar));
  };

  useEffect(() => {
    const materiasId = state._materia.map(({ _id }) => _id);

    if (state._materia.length > 0) {
      setCarrera(state._materia[0].nombre_carrera);
    } else {
      setCarrera('');
    }
    setMaterias(materiasId);

    return () => {
      dispatch(limpiarMensajesUsuarios());
      dispatch(limpiarMensajesCarreras());
    };
  }, []);

  return (
    <Container>
      <div className="col-sm-12 col-xl-12">
        <div className="bg-light rounded h-100 p-4">
          <h3 className="mb-4">Nuevo Usuario</h3>
          <Formik
            initialValues={{
              nombre_persona: state.nombre_persona,
              apellido_persona: state.apellido_persona,
              dni_persona: state.dni_persona,
              cuil_persona: state.cuil_persona,
              fecha_nac_persona: state.fecha_nac_persona,
              sexo_persona: state.sexo_persona,
              correo_persona: state.correo_persona,
              telefono_persona: state.telefono_persona,
              manzana: state.direccion_persona.manzana,
              casa: state.direccion_persona.casa,
              sector: state.direccion_persona.sector,
              lote: state.direccion_persona.lote,
              parcela: state.direccion_persona.parcela,
              nombre_usuario: state.nombre_usuario,
              roles: state.roles.descripcion_rol,
            }}
            validationSchema={schemaAgregarEditar}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, handleChange }) => (
              <Form>
                <h6 className="text-center">Datos Personales</h6>
                <div className="mb-3">
                  <label htmlFor="nombre_persona" className="form-label">
                    Nombre Persona
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="nombre_persona"
                    name="nombre_persona"
                    placeholder="Ingrese el nombre de la persona"
                    autoFocus
                  />
                  <MensajeErrorInput name="nombre_persona" />
                </div>
                <div className="mb-3">
                  <label htmlFor="apellido_persona" className="form-label">
                    Apellido Persona
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="apellido_persona"
                    name="apellido_persona"
                    placeholder="Ingrese el apellido de la persona"
                  />
                  <MensajeErrorInput name="apellido_persona" />
                </div>
                <div className="mb-3">
                  <label htmlFor="dni_persona" className="form-label">
                    Dni Persona
                  </label>
                  <Field
                    type="number"
                    className="form-control"
                    id="dni_persona"
                    name="dni_persona"
                    placeholder="Ingrese el dni de la persona"
                  />
                  <MensajeErrorInput name="dni_persona" />
                </div>
                <div className="mb-3">
                  <label htmlFor="cuil_persona" className="form-label">
                    Cuil Persona
                  </label>
                  <Field
                    type="number"
                    className="form-control"
                    id="cuil_persona"
                    name="cuil_persona"
                    placeholder="Ingrese el cuil de la persona"
                  />
                  <MensajeErrorInput name="cuil_persona" />
                </div>
                <div className="mb-3">
                  <label htmlFor="fecha_nac_persona" className="form-label">
                    Fecha Nacimiento Persona
                  </label>
                  <Field
                    type="date"
                    className="form-control"
                    id="fecha_nac_persona"
                    name="fecha_nac_persona"
                  />
                  <MensajeErrorInput name="fecha_nac_persona" />
                </div>

                <div className="mb-3">
                  <label htmlFor="sexo_persona" className="form-label">
                    Sexo Persona
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="sexo_persona"
                    name="sexo_persona"
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Seleccione una opcion
                    </option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Undefined">Undefined</option>
                  </Field>
                  <MensajeErrorInput name="sexo_persona" />
                </div>
                <div className="mb-3">
                  <label htmlFor="correo_persona" className="form-label">
                    Correo Persona
                  </label>
                  <Field
                    type="email"
                    className="form-control"
                    id="correo_persona"
                    name="correo_persona"
                    placeholder="Ingrese el correo de la persona"
                  />
                  <MensajeErrorInput name="correo_persona" />
                </div>
                <div className="mb-3">
                  <label htmlFor="telefono_persona" className="form-label">
                    Telefono Persona
                  </label>
                  <Field
                    type="number"
                    className="form-control"
                    id="telefono_persona"
                    name="telefono_persona"
                    placeholder="Ingrese el telefono de la persona"
                  />
                  <MensajeErrorInput name="telefono_persona" />
                </div>
                <hr />
                <h6 className="text-center">Datos Dirección</h6>

                <div className="mb-3">
                  <label htmlFor="manzana" className="form-label">
                    Manzana Persona
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="manzana"
                    name="manzana"
                    placeholder="Ingrese la manzana de la persona"
                  />
                  <MensajeErrorInput name="manzana" />
                </div>
                <div className="mb-3">
                  <label htmlFor="casa" className="form-label">
                    Casa Persona
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="casa"
                    name="casa"
                    placeholder="Ingrese la casa de la persona"
                  />
                  <MensajeErrorInput name="casa" />
                </div>
                <div className="mb-3">
                  <label htmlFor="sector" className="form-label">
                    Sector Persona
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="sector"
                    name="sector"
                    placeholder="Ingrese el sector de la persona"
                  />
                  <MensajeErrorInput name="sector" />
                </div>
                <div className="mb-3">
                  <label htmlFor="lote" className="form-label">
                    Lote Persona
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="lote"
                    name="lote"
                    placeholder="Ingrese el lote de la persona"
                  />
                  <MensajeErrorInput name="lote" />
                </div>
                <div className="mb-3">
                  <label htmlFor="parcela" className="form-label">
                    Parcela Persona
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="parcela"
                    name="parcela"
                    placeholder="Ingrese la parcela de la persona"
                  />
                  <MensajeErrorInput name="parcela" />
                </div>
                <hr />
                <h6 className="text-center">Datos Login</h6>

                <div className="mb-3">
                  <label htmlFor="nombre_usuario" className="form-label">
                    Usuario Persona
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="nombre_usuario"
                    name="nombre_usuario"
                    placeholder="Ingrese un nombre de usuario para la persona"
                  />
                  <MensajeErrorInput name="nombre_usuario" />
                </div>
                <div className="mb-3">
                  <label htmlFor="roles" className="form-label">
                    Rol Persona
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="roles"
                    name="roles"
                    onChange={(e) => {
                      handleChange(e);
                      handleChangeTipoUser(e);
                    }}
                  >
                    <option value="" disabled>
                      Seleccione una opcion
                    </option>
                    <option value="administrativo">administrativo</option>
                    <option value="alumno">alumno</option>
                    <option value="docente">docente</option>
                  </Field>
                  <MensajeErrorInput name="roles" />
                </div>

                <MateriasUsuarios
                  handleChange={handleChange}
                  tipoUser={tipoUser}
                  materias={materias}
                  setMaterias={setMaterias}
                  carrera={carrera}
                  setCarrera={setCarrera}
                />

                <button type="submit" className="btn btn-warning mb-3">
                  Editar
                </button>
                <NavLink to="/usuarios">
                  <button className="btn btn-info mb-3 ms-2">
                    Volver Atras
                  </button>
                </NavLink>
                {loadingUsuarios && <Spinner />}

                {erroresUsuarios?.length > 0 &&
                  erroresUsuarios.map((error, i) => (
                    <Alerta
                      clase={'alert-danger'}
                      key={i}
                      mensaje={error.msg}
                    />
                  ))}

                {mensajeUsuarios && (
                  <Alerta clase={'alert-success'} mensaje={mensajeUsuarios} />
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Container>
  );
};

export default EditarUsuario;
