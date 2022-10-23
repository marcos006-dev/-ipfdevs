import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import Spinner from '../../../components/Spinner';
import Container from '../../../layouts/Container';
import { getDataNotasMateriasDocente, limpiarMensajesNotasDocente } from '../../../redux/actions/docentes/notasAction';

const DetalleNotasDocente = () => {
  const { dataNotasMateriasDocente, erroresNotasDocente, loadingNotasDocente } =
    useSelector((state) => state.notasDocentes);

  const dispatch = useDispatch();

  const { state } = useLocation();
  const { _materia, tipo_nota, descripcionMateria } = state;
  useEffect(() => {
    dispatch(getDataNotasMateriasDocente({ _materia, tipo_nota }));
    return () => {
      dispatch(limpiarMensajesNotasDocente());
    };
  }, []);

  return (
    <Container>
      <div className="col-sm-12 col-xl-12">
        <div className="bg-light rounded h-100 p-4">
          <h3 className="mb-4 text-center">Detalle Notas</h3>
          <h6>
            Materia: {descripcionMateria} <br /> Tipo Nota: {tipo_nota}
          </h6>

          {loadingNotasDocente && <Spinner />}

          {dataNotasMateriasDocente?.length > 0 && (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Nombre Apellido</th>
                    <th scope="col">Nota</th>
                  </tr>
                </thead>
                <tbody>
                  {dataNotasMateriasDocente?.map((notaAlumno) => (
                    <tr key={notaAlumno._persona}>
                      <th scope="row">{notaAlumno.datosAlumno}</th>
                      <td>
                        <input
                          type="number"
                          name={notaAlumno._persona}
                          className="form-control"
                          value={notaAlumno.descripcion_nota}
                          disabled={true}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <NavLink to="/notas-docentes">
            <button className="btn btn-info mb-3 ms-2">Volver Atras</button>
          </NavLink>
          {erroresNotasDocente?.length > 0 &&
            erroresNotasDocente.map((error, i) => (
              <Alerta clase={'alert-danger'} key={i} mensaje={error.msg} />
            ))}
        </div>
      </div>
    </Container>
  );
};

export default DetalleNotasDocente;
