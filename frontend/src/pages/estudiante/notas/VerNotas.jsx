import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Alerta from '../../../components/Alerta';
import Spinner from '../../../components/Spinner';
import Container from '../../../layouts/Container';
import {
  getDataNotasAlumno,
  limpiarMensajesNotasAlumno,
} from '../../../redux/actions/alumnos/notasAction';

const TablaNotas = ({ dataNotasAlumno }) => {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Materia</th>
            <th scope="col">Tipo Nota</th>
            <th scope="col">Descripcion Nota</th>
          </tr>
        </thead>
        <tbody>
          {dataNotasAlumno.map((nota) => (
            <tr key={nota._id}>
              <th scope="row">{nota.descripcion_materia}</th>
              <td>{nota.tipo_nota}</td>
              <td>{nota.descripcion_nota}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const VerNotas = () => {
  const { dataNotasAlumno, erroresNotasAlumno, loadingNotasAlumno } =
    useSelector((state) => state.notasAlumnos);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataNotasAlumno());

    return () => {
      dispatch(limpiarMensajesNotasAlumno());
    };
  }, []);
  return (
    <Container>
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-12">
            <div className="bg-light rounded h-100 p-4">
              <h3 className="mb-4 text-center">Notas Materias</h3>
              <NavLink to="/inicio-alumnos" className="btn btn-info">
                Volver Atrás
              </NavLink>
              {loadingNotasAlumno && <Spinner />}

              {erroresNotasAlumno.length > 0 &&
                erroresNotasAlumno.map(({ errors }, i) => (
                  <Alerta
                    clase={'alert-danger mt-2'}
                    key={i}
                    mensaje={errors?.msg}
                  />
                ))}
              <div className="col-md-12 col-lg-12 col-md-12 mt-3">
                {dataNotasAlumno?.length > 0 && (
                  <TablaNotas dataNotasAlumno={dataNotasAlumno} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default VerNotas;
