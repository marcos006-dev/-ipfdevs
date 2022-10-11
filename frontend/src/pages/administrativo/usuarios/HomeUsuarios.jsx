import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Spinner from '../../../components/Spinner';
import Container from '../../../layouts/Container';
import { getDataUsuarios } from '../../../redux/actions/administrativos/usuariosAction';

const TablaUsuarios = ({ dataUsuarios }) => {
  //   const dispatch = useDispatch();
  //   const materia = useSelector((state) => state.materias);

  //   const handleChangeActiveMateria = (id) => {
  //     Swal.fire({
  //       title: '¿Desea activar esta materia?',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Si activar!',
  //       cancelButtonText: 'No, cancelar!',
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         dispatch(activarMateria(id));
  //         // dispatch(getDataMaterias());
  //       }
  //     });
  //   };

  //   const handleChangeDesactivateMateria = (id) => {
  //     Swal.fire({
  //       title: '¿Desea desactivar esta materia?',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Si desactivar!',
  //       cancelButtonText: 'No, cancelar!',
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         dispatch(desactivarMateria(id));
  //         // dispatch(getDataMaterias());
  //       }
  //     });
  //   };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nombre Apellido</th>
            <th scope="col">Dni</th>
            <th scope="col">Tipo Usuario</th>
            <th scope="col">Detalle</th>
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
                  to="/usuarios/detalle"
                  className="btn btn-info"
                >
                  Detalle
                </NavLink>
              </td>
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

              {/* <td>
                {materia.activo ? (
                  <NavLink
                    key={materia._id}
                    className="btn btn-danger"
                    onClick={() => handleChangeDesactivateMateria(materia._id)}
                  >
                    Desactivar
                  </NavLink>
                ) : (
                  <NavLink
                    key={materia._id}
                    style={{ backgroundColor: 'blue' }}
                    className="btn btn-secondary"
                    onClick={() => handleChangeActiveMateria(materia._id)}
                  >
                    Activar
                  </NavLink>
                )}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* {materia.activandoDatosMateria && <Spinner />}

      {materia.erroresActivarMateria?.length > 0 &&
        materia.erroresActivarMateria.map((error, i) => (
          <Alerta clase={'alert-danger'} key={i} mensaje={error.msg} />
        ))}

      {materia.activadoExistosoMateria && (
        <Alerta
          clase={'alert-success'}
          mensaje={'Materia activada correctamente'}
        />
      )} */}

      {/* {materia.desactivandoDatosMateria && <Spinner />}

      {materia.erroresDesactivarMateria?.length > 0 &&
        materia.erroresDesactivarMateria.map((error, i) => (
          <Alerta clase={'alert-danger'} key={i} mensaje={error.msg} />
        ))}

      {materia.desactivadoExistosoMateria && (
        <Alerta
          clase={'alert-success'}
          mensaje={'Materia desactivada correctamente'}
        />
      )} */}
    </>
  );
};

const HomeUsuarios = () => {
  const { loadingUsuarios, erroresUsuarios, dataUsuarios } = useSelector(
    (state) => state.usuarios
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataUsuarios());
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HomeUsuarios;
