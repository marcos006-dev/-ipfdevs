import { NavLink, useLocation } from 'react-router-dom';
import Container from '../../../layouts/Container';

const DetalleMateria = () => {
  const { state } = useLocation();

  return (
    <Container>
      <div className="col-sm-12 col-xl-12">
        <div className="bg-light rounded h-100 p-4">
          <NavLink to="/materias">
            <button className="btn btn-info mb-3 ms-2">Volver Atras</button>
          </NavLink>
          <h4 className="mb-4 text-center">
            Detalle Materia: {state.descripcion_materia}
          </h4>
          <h6 className="mb-2 text-center">
            Carrera: {state.nombre_carrera} || Año Lectivo
            {state.anio_lectivo[0].descripcion_anio}
          </h6>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">
                  <b>Dia</b>
                </th>
                <th scope="col">
                  <b>Horario</b>
                </th>
              </tr>
            </thead>
            <tbody>
              {state.horarios.map((horario, i) => (
                <tr key={i}>
                  <th>{horario.dia_semana}</th>
                  <th>{horario.horario_semana}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default DetalleMateria;
