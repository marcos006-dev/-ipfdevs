import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import Alerta from '../../../components/Alerta';
import Spinner from '../../../components/Spinner';
import Container from '../../../layouts/Container';
import {
  eliminarNotaDocente,
  getDataNotasDocente,
  limpiarMensajesNotasDocente,
} from '../../../redux/actions/docentes/notasAction';

const TablaNotasDocentes = ({ dataNotasDocente }) => {
  const dispatch = useDispatch();

  const handleChangeDeleteNotaDocente = (materiaTipoNota) => {
    console.log(materiaTipoNota);
    Swal.fire({
      title: '¿Desea borrar estas notas?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si borrar!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(eliminarNotaDocente(materiaTipoNota));
      }
    });
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Descripcion Materia</th>
            <th scope="col">Estado Nota</th>
            <th scope="col">Tipo Nota</th>
            <th scope="col">Detalle</th>
            {/* <th scope="col">Editar</th> */}
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
                  state={{
                    _materia: notaDocente._materia,
                    tipo_nota: notaDocente.tipo_nota,
                    descripcionMateria: notaDocente.descripcion_materia,
                  }}
                  to="/detalle-notas-docente"
                  className="btn btn-info"
                >
                  Detalle
                </NavLink>
              </td>
              {/* <td>
                <NavLink
                  key={notaDocente._id}
                  state={notaDocente._id}
                  to="/notas-docente/editar"
                  className="btn btn-warning"
                >
                  Editar
                </NavLink>
              </td> */}

              <td>
                {notaDocente.estado_nota === 'en revision' ? (
                  <NavLink
                    key={notaDocente._id}
                    state={notaDocente._id}
                    className="btn btn-danger"
                    onClick={() =>
                      handleChangeDeleteNotaDocente({
                        _materia: notaDocente._materia,
                        tipo_nota: notaDocente.tipo_nota,
                      })
                    }
                  >
                    Eliminar
                  </NavLink>
                ) : (
                  <h6 className="text-danger">No disponible</h6>
                )}
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

    return () => {
      dispatch(limpiarMensajesNotasDocente());
    };
  }, []);

  useEffect(() => {
    dispatch(getDataNotasDocente());

    return () => {
      dispatch(limpiarMensajesNotasDocente());
    };
  }, [mensajeNotasDocente]);

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
