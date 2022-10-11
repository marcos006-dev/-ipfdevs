import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import HomeAdministrativo from '../pages/administrativo/home/HomeAdministrativo';
import AgregarMateria from '../pages/administrativo/materias/AgregarMateria';
import DetalleMateria from '../pages/administrativo/materias/DetalleMateria';
import EditarMateria from '../pages/administrativo/materias/EditarMateria';
import HomeMaterias from '../pages/administrativo/materias/HomeMaterias';
import AgregarUsuario from '../pages/administrativo/usuarios/AgregarUsuario';
import DetalleUsuario from '../pages/administrativo/usuarios/DetalleUsuario';
import EditarUsuario from '../pages/administrativo/usuarios/EditarUsuario';
import HomeUsuarios from '../pages/administrativo/usuarios/HomeUsuarios';
import Login from '../pages/auth/Login';
import { fetchCargarDatosUsuario } from '../redux/actions/authAction';

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
      <Route path="/usuarios/detalle" element={<DetalleUsuario />} />

      <Route path="*" element={<HomeAdministrativo />} />
    </Routes>
  );
};

const RoutesDocentes = () => {
  return (
    <Routes>
      <Route path="/inicio-docentes" element={<HomeAdministrativo />} />
      <Route path="*" element={<HomeAdministrativo />} />
    </Routes>
  );
};

const RoutesAlumnos = () => {
  return (
    <Routes>
      <Route path="/inicio-docentes" element={<HomeAdministrativo />} />
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
