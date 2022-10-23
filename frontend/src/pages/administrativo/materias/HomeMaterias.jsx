import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Alerta from '../../../components/Alerta';
import Spinner from '../../../components/Spinner';
import Container from '../../../layouts/Container';
import {
  activarMateria,
  desactivarMateria,
  getDataMaterias,
  limpiarMensajesMateria,
} from '../../../redux/actions/administrativos/materiasAction';
import Swal from 'sweetalert2';

const TablaMaterias = ({ dataMaterias }) => {
  const dispatch = useDispatch();

  const handleChangeActiveMateria = (id) => {
    Swal.fire({
      title: '¿Desea activar esta materia?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si activar!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(activarMateria(id));
      }
    });
  };

  const handleChangeDesactivateMateria = (id) => {
    Swal.fire({
      title: '¿Desea desactivar esta materia?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si desactivar!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(desactivarMateria(id));
      }
    });
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Descripcion Materia</th>
            <th scope="col">Carrera</th>
            <th scope="col">Detalle</th>
            <th scope="col">Editar</th>
            <th scope="col">Otras Opciones</th>
          </tr>
        </thead>
        <tbody>
          {dataMaterias.map((materia) => (
            <tr key={materia._id}>
              <td>{materia.descripcion_materia}</td>
              <td>{materia.nombre_carrera}</td>
              <td>
                <NavLink
                  key={materia._id}
                  state={materia}
                  to="/materias/detalle"
                  className="btn btn-info"
                >
                  Detalle
                </NavLink>
              </td>
              <td>
                <NavLink
                  key={materia._id}
                  state={materia}
                  to="/materias/editar"
                  className="btn btn-warning"
                >
                  Editar
                </NavLink>
              </td>

              <td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const HomeMaterias = () => {
  const { dataMaterias, erroresMaterias, loadingMaterias, mensajesMaterias } =
    useSelector((state) => state.materias);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataMaterias());
    return () => {
      dispatch(limpiarMensajesMateria());
    };
  }, []);

  return (
    <Container>
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-12">
            <div className="bg-light rounded h-100 p-4">
              <h3 className="mb-4 text-center">Listado de materias</h3>
              <NavLink to="/materias/agregar" className="btn btn-success">
                Nueva Materia
              </NavLink>
              <div className="table-responsive">
                {loadingMaterias && <Spinner />}

                {erroresMaterias.length > 0 &&
                  erroresMaterias.map(({ errors }, i) => (
                    <Alerta
                      clase={'alert-danger mt-2'}
                      key={i}
                      mensaje={errors?.msg}
                    />
                  ))}

                {dataMaterias.length > 0 && (
                  <TablaMaterias dataMaterias={dataMaterias} />
                )}

                {mensajesMaterias && (
                  <Alerta clase={'alert-success'} mensaje={mensajesMaterias} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HomeMaterias;
