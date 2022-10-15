import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Spinner from '../../../components/Spinner';
import Container from '../../../layouts/Container';
import { getDataHorariosAlumno } from '../../../redux/actions/alumnos/horariosAction';

const CardHorariosAlumno = ({ horario }) => {
  return (
    <div className={`alert alert-warning`} role="alert">
      <b>Materia: {horario.descripcion_materia}</b> <br />
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

const VerHorarios = () => {
  const { dataHorariosAlumno, erroresHorariosAlumno, loadingHorariosAlumno } =
    useSelector((state) => state.horariosAlumnos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataHorariosAlumno());
  }, []);

  return (
    <Container>
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-12">
            <div className="bg-light rounded h-100 p-4">
              <h3 className="mb-4 text-center">Listado Horarios</h3>
              <NavLink to="/inicio-alumnos" className="btn btn-info">
                Volver Atrás
              </NavLink>
              {loadingHorariosAlumno && <Spinner />}

              {erroresHorariosAlumno?.horarios?.length > 0 &&
                erroresHorariosAlumno?.horarios?.map(({ errors }, i) => (
                  <Alerta
                    clase={'alert-danger mt-2'}
                    key={i}
                    mensaje={errors?.msg}
                  />
                ))}
              <div className="col-md-12 col-lg-12 col-md-12 mt-3">
                {dataHorariosAlumno?.horarios?.length > 0 &&
                  dataHorariosAlumno?.horarios.map((horario) => (
                    <CardHorariosAlumno horario={horario} key={horario._id} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default VerHorarios;
