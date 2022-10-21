import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Alerta from '../../../components/Alerta';
import Spinner from '../../../components/Spinner';
import Container from '../../../layouts/Container';
import { getDataNotasDocente } from '../../../redux/actions/docentes/notasAction';

const TablaNotasDocentes = ({ dataNotasDocente }) => {
  const dispatch = useDispatch();

  // const handleChangeDesactivateMateria = (id) => {
  //   Swal.fire({
  //     title: '¿Desea desactivar esta materia?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Si desactivar!',
  //     cancelButtonText: 'No, cancelar!',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       dispatch(desactivarMateria(id));
  //     }
  //   });
  // };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Descripcion Materia</th>
            <th scope="col">Estado Nota</th>
            <th scope="col">Tipo Nota</th>
            <th scope="col">Detalle</th>
            <th scope="col">Editar</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {dataNotasDocente.map((notaDocente) => (
            <tr key={notaDocente._id}>
              <td>{notaDocente.descripcion_materia}</td>
              <td>{notaDocente.estado_nota}</td>
              <td>{notaDocente.tipo_nota}</td>
              <td>
                <NavLink
                  key={notaDocente._id}
                  state={notaDocente._id}
                  to="/notas-docente/detalle"
                  className="btn btn-info"
                >
                  Detalle
                </NavLink>
              </td>
              <td>
                <NavLink
                  key={notaDocente._id}
                  state={notaDocente._id}
                  to="/notas-docente/editar"
                  className="btn btn-warning"
                >
                  Editar
                </NavLink>
              </td>

              <td>
                <NavLink
                  key={notaDocente._id}
                  state={notaDocente._id}
                  to="/notas-docente/eliminar"
                  className="btn btn-danger"
                >
                  Eliminar
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const HomeNotasDocente = () => {
  const {
    dataNotasDocente,
    erroresNotasDocente,
    loadingNotasDocente,
    mensajeNotasDocente,
  } = useSelector((state) => state.notasDocentes);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataNotasDocente());
  }, []);

  return (
    <Container>
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-12">
            <div className="bg-light rounded h-100 p-4">
              <h3 className="mb-4 text-center">Listado de notas</h3>
              <NavLink to="/cargar-nota" className="btn btn-success">
                Cargar Nota
              </NavLink>
              <div className="table-responsive">
                {loadingNotasDocente && <Spinner />}

                {erroresNotasDocente.length > 0 &&
                  erroresNotasDocente.map(({ errors }, i) => (
                    <Alerta
                      clase={'alert-danger mt-2'}
                      key={i}
                      mensaje={errors?.msg}
                    />
                  ))}

                {dataNotasDocente.length > 0 && (
                  <TablaNotasDocentes dataNotasDocente={dataNotasDocente} />
                )}

                {mensajeNotasDocente && (
                  <Alerta
                    clase={'alert-success'}
                    mensaje={mensajeNotasDocente}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HomeNotasDocente;
