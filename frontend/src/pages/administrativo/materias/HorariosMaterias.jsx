import { Field } from 'formik';
import Alerta from '../../../components/Alerta';
import MensajeErrorInput from '../../../components/MensajeErrorInput';

const HorariosMaterias = ({
  diasSemanaSelected,
  setDiasSemanaSelected,
  horariosSemanaSelected,
  setHorariosSemanaSelected,
  horariosError,
  handleChange,
}) => {
  const diasSemana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  const horariosSemana = [
    '09:40 a 10:00',
    '10:00 a 10:40',
    '10:40 a 11:20',
    '11:20 a 12:00',
    '12:00 a 14:00',
    '14:00 a 14:40',
    '14:40 a 15:20',
    '15:20 a 16:00',
    '16:00 a 17:00',
  ];

  // escuchador de cambios para los dias de la semana
  const handleChangeDiaSemanaSelected = (e) => {
    const diaSelected = e.target.value;

    if (e.target.checked) {
      setDiasSemanaSelected([...diasSemanaSelected, e.target.value]);
    } else {
      const newDiasSemanaSelected = diasSemanaSelected.filter(
        (dia) => dia !== diaSelected
      );

      const horarios = horariosSemanaSelected.filter(
        (horario) => horario.dia_semana !== diaSelected
      );
      // console.log(horarios);
      setDiasSemanaSelected(newDiasSemanaSelected);
      setHorariosSemanaSelected(horarios);
    }
  };

  const handleChangeHorariosSemana = (e) => {
    const diaSemana = e.target.name;
    const horarioSemana = e.target.value;
    if (e.target.checked) {
      setHorariosSemanaSelected([
        ...horariosSemanaSelected,
        {
          dia_semana: diaSemana,
          horario_semana: horarioSemana,
        },
      ]);
    } else {
      const horarios = horariosSemanaSelected.filter((horario) => {
        if (
          Object.entries(horario).toString() !==
          Object.entries({
            dia_semana: diaSemana,
            horario_semana: horarioSemana,
          }).toString()
        ) {
          return horario;
        }
      });
      setHorariosSemanaSelected(horarios);
    }
  };

  const verifyObjectOfArray = (horario) => {

    // console.log(horario)
    // if (horariosSemanaSelected.length === 0) return;
    for (const horarioSelected of horariosSemanaSelected) {
      if(horarioSelected.hasOwnProperty('_id')) delete horarioSelected._id

      if (JSON.stringify(horarioSelected) === JSON.stringify(horario))
      // console.log("first")
        return true;
    }
  };

  return (
    <>
      <div className="mb-3">
        <label className="form-label">Dia de la Semana</label>

        {diasSemana.map((dia, i) => (
          <div className="form-check" key={i}>
            <Field
              className="form-check-input"
              type="checkbox"
              value={dia}
              id={dia}
              name="dia_semana"
              onChange={(e) => {
                handleChangeDiaSemanaSelected(e);
                handleChange(e);
              }}
              checked={diasSemanaSelected.includes(dia)}
            />
            <label className="form-check-label" htmlFor={dia}>
              {dia}
            </label>
          </div>
        ))}
        <MensajeErrorInput name="dia_semana" />
      </div>
      {diasSemanaSelected.map((dia, i) => (
        <div className="mb-3" key={i}>
          <label className="form-label">Horario para el dia: {dia}</label>

          {horariosSemana.map((horario, i) => (
            <div className="form-check" key={i}>
              <Field
                className="form-check-input"
                type="checkbox"
                value={horario}
                id={`${horario}-${dia}`}
                name={dia}
                onChange={(e) => {
                  handleChange(e);
                  handleChangeHorariosSemana(e);
                }}
                checked={
                  verifyObjectOfArray({
                    dia_semana: dia,
                    horario_semana: horario,
                  }) || ''
                }
              />
              <label className="form-check-label" htmlFor={`${horario}-${dia}`}>
                {horario}
              </label>
            </div>
          ))}
          {/* <MensajeErrorInput name={dia} /> */}
        </div>
      ))}
      {horariosError && (
        <Alerta
          clase={'alert-danger'}
          mensaje={
            'Los dias seleccionados no concuerdan con los horarios seleccionados'
          }
        />
      )}
    </>
  );
};

export default HorariosMaterias;
