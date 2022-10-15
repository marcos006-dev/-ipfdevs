import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { es } from 'dayjs/locale/es';
import Alerta from '../../../components/Alerta';
import Spinner from '../../../components/Spinner';
import Container from '../../../layouts/Container';
import { getDataAvisosAlumno } from '../../../redux/actions/administrativos/avisosActions';

dayjs.locale('es');
dayjs.extend(relativeTime);

const CardAviso = ({ aviso }) => {
  const date1 = dayjs(aviso.fecha_alta);
  const date2 = dayjs();
  let horas = date1.diff(date2, 'hours');
  const days = Math.floor(horas / 24);
  horas = horas - days * 24;
  // console.log(horas);
  return (
    <div
      className={`alert alert-${horas < 24 ? 'warning' : 'dark'}`}
      role="alert"
    >
      <b>{aviso.descripcion_aviso}</b> <br />
      {/* <small>{aviso.fecha_alta}</small> <br /> */}
      <small>{dayjs().to(dayjs(aviso.fecha_alta))}</small>
    </div>
  );
};

const VerAvisos = () => {
  const { dataAvisos, erroresAvisos, loadingAvisos } = useSelector(
    (state) => state.avisosAdministrativos
  );
  const dispatch = useDispatch();

  //   console.log(dataAvisos);
  useEffect(() => {
    dispatch(getDataAvisosAlumno());
  }, []);

  return (
    <Container>
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-12">
            <div className="bg-light rounded h-100 p-4">
              <h3 className="mb-4 text-center">Listado de avisos</h3>
              <NavLink to="/avisos-alumnos" className="btn btn-info">
                Volver Atrás
              </NavLink>
              {loadingAvisos && <Spinner />}

              {erroresAvisos.length > 0 &&
                erroresAvisos.map(({ errors }, i) => (
                  <Alerta
                    clase={'alert-danger mt-2'}
                    key={i}
                    mensaje={errors?.msg}
                  />
                ))}
              <div className="row mt-3">
                <div className="col-md-6 col-lg-6 col-md-6">
                  <h5 className="mb-4 text-center">Avisos Particulares</h5>
                  {dataAvisos?.avisoParticular?.length > 0 &&
                    dataAvisos.avisoParticular.map((aviso) => (
                      <CardAviso aviso={aviso} key={aviso.fecha_alta} />
                    ))}
                </div>
                <div className="col-md-6 col-lg-6 col-md-6">
                  <h5 className="mb-4 text-center">Avisos General</h5>
                  {dataAvisos?.avisoGeneral?.length > 0 &&
                    dataAvisos.avisoGeneral.map((aviso) => (
                      <CardAviso aviso={aviso} key={aviso.fecha_alta} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default VerAvisos;
