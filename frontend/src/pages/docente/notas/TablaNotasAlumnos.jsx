import { useEffect, useState } from 'react';
import Alerta from '../../../components/Alerta';

const TablaNotasAlumnos = ({
  dataNotasMateriasDocente,
  errorNotaAlumno,
  setErrorNotaAlumno,
  notasMateriasAlumnos,
  setNotasMateriasAlumnos,
}) => {
  //   console.log(dataNotasMateriasDocente);

  const onChangeNotaMateriaAlumno = (e) => {
    const idAlumno = e.target.name;

    let mensajeError = '';
    if (!parseInt(e.target.value)) {
      mensajeError = 'Ingrese solo numeros';
    }

    if (parseInt(e.target.value) < 0 || parseInt(e.target.value) > 10) {
      mensajeError;
      ('La nota ingresada debe ser mayor o igual a 0 y menor o igual a 10');
    }

    setErrorNotaAlumno(mensajeError);
    const valorNota = parseInt(e.target.value);
    const notasMateriasAlumnosGuardar = dataNotasMateriasDocente.filter(
      (notaAlumno) => {
        if (notaAlumno._persona === idAlumno) {
          notaAlumno.descripcion_nota = valorNota;
        }
        return notaAlumno;
      }
    );

    setNotasMateriasAlumnos(notasMateriasAlumnosGuardar);
  };
  useEffect(() => {
    setNotasMateriasAlumnos(dataNotasMateriasDocente);
  }, [dataNotasMateriasDocente]);

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nombre Apellido</th>
            <th scope="col">Nota</th>
          </tr>
        </thead>
        <tbody>
          {notasMateriasAlumnos?.map((notaAlumno) => (
            <tr key={notaAlumno._persona}>
              <th scope="row">{notaAlumno.datosAlumno}</th>
              <td>
                <input
                  type="number"
                  name={notaAlumno._persona}
                  className="form-control"
                  value={notaAlumno.descripcion_nota}
                  onChange={onChangeNotaMateriaAlumno}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {errorNotaAlumno && (
        <Alerta clase={'alert-danger'} mensaje={errorNotaAlumno} />
      )}
    </div>
  );
};

export default TablaNotasAlumnos;
