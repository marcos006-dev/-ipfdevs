import React from 'react';

const TablaAsistencias = ({
  dataAsistenciaAlumno,
  setDataAsistenciaAlumno,
  fecha,
}) => {
  const handleChangeAsistencia = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    console.log(name);

    let asistenciaArrayEdit = [];
    if (checked) {
      asistenciaArrayEdit = dataAsistenciaAlumno.map((asistencia) => {
        if (asistencia._id === name) {
          asistencia.fechaInasistencia = fecha;
        }

        return asistencia;
      });
    } else {
      asistenciaArrayEdit = dataAsistenciaAlumno.map((asistencia) => {
        if (asistencia._id === name) {
          asistencia.fechaInasistencia = '';
        }

        return asistencia;
      });
    }

    console.log(asistenciaArrayEdit);
    setDataAsistenciaAlumno(asistenciaArrayEdit);
  };

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nombre Apellido</th>
            <th scope="col">Asistio</th>
          </tr>
        </thead>
        <tbody>
          {dataAsistenciaAlumno?.map((asistenciaAlumno) => (
            <tr key={asistenciaAlumno._id}>
              <th scope="row">
                {asistenciaAlumno.nombre_persona}{' '}
                {asistenciaAlumno.apellido_persona}
              </th>
              <td>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    id={asistenciaAlumno._id}
                    name={asistenciaAlumno._id}
                    className="form-check-input"
                    checked={asistenciaAlumno.fechaInasistencia !== ''}
                    onChange={handleChangeAsistencia}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={asistenciaAlumno._id}
                  ></label>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaAsistencias;
