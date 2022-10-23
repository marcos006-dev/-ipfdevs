import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import dayjs from 'dayjs';
import Spinner from '../../../components/Spinner';
import Container from '../../../layouts/Container';
import {
  getDataInasistencias,
  limpiarMensajesInasistencias,
} from '../../../redux/actions/alumnos/inasistenciasAction';

const CardInasistencia = ({ inasistencia }) => {
  const fechaInasistencia = dayjs(inasistencia.fecha).format('DD-MM-YYYY');

  return (
    <div className={`alert alert-warning`} role="alert">
      <b>Fecha Inasistencia: {fechaInasistencia}.</b> <br />
    </div>
  );
};

const VerInasistencias = () => {
  const { dataInasistencias, erroresInasistencias, loadingInasistencias } =
    useSelector((state) => state.inasistenciasAlumnos);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataInasistencias());

    return () => {
      dispatch(limpiarMensajesInasistencias());
    };
  }, []);

  return (
    <Container>
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-12">
            <div className="bg-light rounded h-100 p-4">
              <h3 className="mb-4 text-center">Inasistencias</h3>
              <NavLink to="/inicio-alumnos" className="btn btn-info">
                Volver Atrás
              </NavLink>
              {loadingInasistencias && <Spinner />}

              {erroresInasistencias?.length > 0 &&
                erroresInasistencias.map(({ errors }, i) => (
                  <Alerta
                    clase={'alert-danger mt-2'}
                    key={i}
                    mensaje={errors?.msg}
                  />
                ))}
              <h6 className="mt-4">
                Total de inasistencias:{' '}
                {dataInasistencias?.inasistencias?.length}
              </h6>
              <div className="col-md-12 col-lg-12 col-md-12 mt-3">
                {dataInasistencias?.inasistencias?.length > 0 &&
                  dataInasistencias?.inasistencias.map((inasistencia) => (
                    <CardInasistencia
                      inasistencia={inasistencia}
                      key={inasistencia._id}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default VerInasistencias;
