import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Spinner from '../../../components/Spinner';
import Container from '../../../layouts/Container';
import {
  activarUsuario,
  desactivarUsuario,
  getDataUsuarios,
  limpiarMensajesUsuarios,
} from '../../../redux/actions/administrativos/usuariosAction';
import Swal from 'sweetalert2';
import Alerta from '../../../components/Alerta';

const TablaUsuarios = ({ dataUsuarios }) => {
  const dispatch = useDispatch();
  // const usuarios = useSelector((state) => state.usuarios);

  const handleChangeActiveUsuario = (id) => {
    Swal.fire({
      title: '¿Desea activar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si activar!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(activarUsuario(id));
        // dispatch(getDataMaterias());
      }
    });
  };

  const handleChangeDesactivateUsuario = (id) => {
    Swal.fire({
      title: '¿Desea desactivar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si desactivar!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(desactivarUsuario(id));
        // dispatch(getDataUsuarios());
      }
    });
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nombre Apellido</th>
            <th scope="col">Dni</th>
            <th scope="col">Tipo Usuario</th>
            {/* <th scope="col">Detalle</th> */}
            <th scope="col">Editar</th>
            <th scope="col">Otras Opciones</th>
          </tr>
        </thead>
        <tbody>
          {dataUsuarios.map((usuario) => (
            <tr key={usuario._id}>
              <td>
                {usuario.nombre_persona} {usuario.apellido_persona}
              </td>
              <td>{usuario.dni_persona}</td>
              <td>{usuario.roles.descripcion_rol}</td>
              <td>
                <NavLink
                  key={usuario._id}
                  state={usuario}
                  to="/usuarios/editar"
                  className="btn btn-warning"
                >
                  Editar
                </NavLink>
              </td>

              <td>
                {usuario.activo ? (
                  <NavLink
                    key={usuario._id}
                    className="btn btn-danger"
                    onClick={() => handleChangeDesactivateUsuario(usuario._id)}
                  >
                    Desactivar
                  </NavLink>
                ) : (
                  <NavLink
                    key={usuario._id}
                    style={{ backgroundColor: 'blue' }}
                    className="btn btn-secondary"
                    onClick={() => handleChangeActiveUsuario(usuario._id)}
                  >
                    Activar
                  </NavLink>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const HomeUsuarios = () => {
  const { loadingUsuarios, erroresUsuarios, dataUsuarios, mensajeUsuarios } =
    useSelector((state) => state.usuarios);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataUsuarios());
    return () => {
      dispatch(limpiarMensajesUsuarios());
    };
  }, []);

  return (
    <Container>
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-12">
            <div className="bg-light rounded h-100 p-4">
              <h3 className="mb-4 text-center">Listado de usuarios</h3>
              <NavLink to="/usuarios/agregar" className="btn btn-success">
                Nuevo Usuario
              </NavLink>
              <div className="table-responsive">
                {loadingUsuarios && <Spinner />}

                {erroresUsuarios.length > 0 &&
                  erroresUsuarios.map(({ errors }, i) => (
                    <Alerta
                      clase={'alert-danger mt-2'}
                      key={i}
                      mensaje={errors.msg}
                    />
                  ))}

                {dataUsuarios.length > 0 && (
                  <TablaUsuarios dataUsuarios={dataUsuarios} />
                )}

                {mensajeUsuarios && (
                  <Alerta clase={'alert-success'} mensaje={mensajeUsuarios} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HomeUsuarios;
