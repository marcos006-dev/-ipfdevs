import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Alerta from '../../../components/Alerta';
import Spinner from '../../../components/Spinner';
import Container from '../../../layouts/Container';
import {
  borrarAviso,
  getDataAvisos,
} from '../../../redux/actions/administrativos/avisosActions';
import Swal from 'sweetalert2';

const TablaAvisos = ({ dataAvisos }) => {
  const dispatch = useDispatch();

  const handleChangeDesactivateAviso = (id) => {
    Swal.fire({
      title: '¿Desea borarr este aviso?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si borrar!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(borrarAviso(id));
      }
    });
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Descripcion</th>
            <th scope="col">Tipo Aviso</th>
            <th scope="col">Publico</th>
            <th scope="col">Editar</th>
            <th scope="col">Otras Opciones</th>
          </tr>
        </thead>
        <tbody>
          {dataAvisos.map((aviso) => (
            <tr key={aviso._id}>
              <td>{aviso.descripcion_aviso}</td>
              <td>{aviso.tipo_aviso}</td>
              <td>
                {aviso._persona[0].nombre_persona}{' '}
                {aviso._persona[0].apellido_persona}
              </td>
              <td>
                <NavLink
                  key={aviso._id}
                  state={aviso}
                  to="/avisos/editar"
                  className="btn btn-warning"
                >
                  Editar
                </NavLink>
              </td>

              <td>
                <NavLink
                  key={aviso._id}
                  className="btn btn-danger"
                  onClick={() => handleChangeDesactivateAviso(aviso._id)}
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

const HomeAvisos = () => {
  const dispatch = useDispatch();
  const { dataAvisos, erroresAvisos, loadingAvisos, mensajeAvisos } =
    useSelector((state) => state.avisosAdministrativos);

  useEffect(() => {
    dispatch(getDataAvisos());
  }, []);

  return (
    <Container>
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-12">
            <div className="bg-light rounded h-100 p-4">
              <h3 className="mb-4 text-center">Listado de avisos</h3>
              <NavLink to="/avisos/agregar" className="btn btn-success">
                Nuevo Aviso
              </NavLink>
              <div className="table-responsive">
                {loadingAvisos && <Spinner />}

                {erroresAvisos.length > 0 &&
                  erroresAvisos.map(({ errors }, i) => (
                    <Alerta
                      clase={'alert-danger mt-2'}
                      key={i}
                      mensaje={errors.msg}
                    />
                  ))}

                {dataAvisos.length > 0 && (
                  <TablaAvisos dataAvisos={dataAvisos} />
                )}

                {mensajeAvisos && (
                  <Alerta clase={'alert-success'} mensaje={mensajeAvisos} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HomeAvisos;
