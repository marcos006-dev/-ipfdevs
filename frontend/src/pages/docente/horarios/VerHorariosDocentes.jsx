import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';
import Spinner from '../../../components/Spinner';
import Container from '../../../layouts/Container';
import {
  getDataHorariosDocente,
  limpiarMensajesHorariosDocente,
} from '../../../redux/actions/docentes/horariosAction';

const CardHorariosDocente = ({ horario }) => {
  return (
    <div className={`alert alert-warning`} role="alert">
      <b>Materia: {horario.descripcion_materia}</b> ||{' '}
      <b>Carrera: {horario.nombre_carrera}</b> <br />
      {horario.horarios.map((horario) => (
        <small key={horario._id}>
          *Dia: <b>{horario.dia_semana}</b>---------Hora:{' '}
          <b>{horario.horario_semana}</b>
          <br />
        </small>
      ))}
    </div>
  );
};

const VerHorariosDocente = () => {
  const {
    dataHorariosDocente,
    erroresHorariosDocente,
    loadingHorariosDocente,
  } = useSelector((state) => state.horariosDocentes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataHorariosDocente());

    return () => {
      dispatch(limpiarMensajesHorariosDocente());
    };
  }, []);

  return (
    <Container>
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-12">
            <div className="bg-light rounded h-100 p-4">
              <h3 className="mb-4 text-center">Listado Horarios</h3>
              {loadingHorariosDocente && <Spinner />}

              {erroresHorariosDocente?._materia?.length > 0 &&
                erroresHorariosDocente?._materia?.map(({ errors }, i) => (
                  <Alerta
                    clase={'alert-danger mt-2'}
                    key={i}
                    mensaje={errors?.msg}
                  />
                ))}
              <div className="col-md-12 col-lg-12 col-md-12 mt-3">
                {dataHorariosDocente?._materia?.length > 0 &&
                  dataHorariosDocente?._materia.map((horario) => (
                    <CardHorariosDocente horario={horario} key={horario._id} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default VerHorariosDocente;
