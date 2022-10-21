import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AgregarAvisoDocente from '../pages/docente/avisos/AgregarAviso';
import EditarAvisoDocente from '../pages/docente/avisos/EditarAviso';
import HomeAvisosDocentes from '../pages/docente/avisos/HomeAvisos';
import AgregarAviso from '../pages/administrativo/avisos/AgregarAviso';
import EditarAviso from '../pages/administrativo/avisos/EditarAviso';
import HomeAvisos from '../pages/administrativo/avisos/HomeAvisos';
import HomeAdministrativo from '../pages/administrativo/home/HomeAdministrativo';
import AgregarMateria from '../pages/administrativo/materias/AgregarMateria';
import DetalleMateria from '../pages/administrativo/materias/DetalleMateria';
import EditarMateria from '../pages/administrativo/materias/EditarMateria';
import HomeMaterias from '../pages/administrativo/materias/HomeMaterias';
import AgregarUsuario from '../pages/administrativo/usuarios/AgregarUsuario';
import EditarUsuario from '../pages/administrativo/usuarios/EditarUsuario';
import HomeUsuarios from '../pages/administrativo/usuarios/HomeUsuarios';
import Login from '../pages/auth/Login';
import { fetchCargarDatosUsuario } from '../redux/actions/authAction';
import VerAvisos from '../pages/estudiante/avisos/VerAvisos';
import VerInasistencias from '../pages/estudiante/inasistencias/VerInasistencias';
import VerHorarios from '../pages/estudiante/horarios/VerHorarios';
import VerNotas from '../pages/estudiante/notas/VerNotas';
import VerDocumentos from '../pages/estudiante/documentos/VerDocumentos';
import VerHorariosDocente from '../pages/docente/horarios/VerHorariosDocentes';
import HomeNotasDocente from '../pages/docente/notas/HomeNotasDocente';

const RoutesAdministrativos = () => {
  return (
    <Routes>
      <Route path="/inicio-administrativo" element={<HomeAdministrativo />} />
      <Route path="/materias" element={<HomeMaterias />} />
      <Route path="/materias/agregar" element={<AgregarMateria />} />
      <Route path="/materias/editar" element={<EditarMateria />} />
      <Route path="/materias/detalle" element={<DetalleMateria />} />
      <Route path="/usuarios" element={<HomeUsuarios />} />
      <Route path="/usuarios/agregar" element={<AgregarUsuario />} />
      <Route path="/usuarios/editar" element={<EditarUsuario />} />
      <Route path="/avisos" element={<HomeAvisos />} />
      <Route path="/avisos/agregar" element={<AgregarAviso />} />
      <Route path="/avisos/editar" element={<EditarAviso />} />

      <Route path="*" element={<HomeAdministrativo />} />
    </Routes>
  );
};

const RoutesDocentes = () => {
  return (
    <Routes>
      <Route path="/inicio-docentes" element={<HomeAdministrativo />} />
      <Route path="/enviar-avisos" element={<HomeAvisosDocentes />} />
      <Route path="/enviar-avisos/agregar" element={<AgregarAvisoDocente />} />
      <Route path="/enviar-avisos/editar" element={<EditarAvisoDocente />} />
      <Route path="/horarios-docentes" element={<VerHorariosDocente />} />
      <Route path="/notas-docentes" element={<HomeNotasDocente />} />
      <Route path="*" element={<HomeAdministrativo />} />
    </Routes>
  );
};

const RoutesAlumnos = () => {
  return (
    <Routes>
      <Route path="/inicio-alumnos" element={<HomeAdministrativo />} />
      <Route path="/avisos-alumnos" element={<VerAvisos />} />
      <Route path="/inasistencias-alumnos" element={<VerInasistencias />} />
      <Route path="/horarios-alumnos" element={<VerHorarios />} />
      <Route path="/notas-alumnos" element={<VerNotas />} />
      <Route path="/documentos-alumnos" element={<VerDocumentos />} />
      <Route path="*" element={<HomeAdministrativo />} />
    </Routes>
  );
};

const Routing = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const dataUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (token === null) return;
    dispatch(fetchCargarDatosUsuario(token));
  }, []);

  if (token === null) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  // rutas para el usuario administrativo

  if (dataUser.rol === 'administrativo') {
    return <RoutesAdministrativos />;
  }

  // rutas para el usuario docente
  if (dataUser.rol === 'docente') {
    return <RoutesDocentes />;
  }

  // rutas para el usuario alumnos

  if (dataUser.rol === 'alumno') {
    return <RoutesAlumnos />;
  }
};

export default Routing;
