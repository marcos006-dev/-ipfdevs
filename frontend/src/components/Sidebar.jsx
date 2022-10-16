import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import profile from '../assets/img/user.jpg';

const Sidebar = ({ toggle }) => {
  const dataUser = useSelector((state) => state.auth.user);

  const claseCssActivo = 'nav-item nav-link active';
  const claseCssInactivo = 'nav-item nav-link';

  return (
    <div className={`sidebar pe-4 pb-3 ${toggle}`}>
      <nav className="navbar bg-light navbar-light">
        <a href="#" className="navbar-brand mx-4 mb-3">
          <h3 className="text-primary">
            <i className="fa fa-hashtag me-2"></i>IPF
          </h3>
        </a>
        <div className="d-flex align-items-center ms-4 mb-4">
          <div className="position-relative">
            <img
              className="rounded-circle"
              src={profile}
              alt=""
              style={{ width: '40px', height: '40px' }}
            />
            <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
          </div>
          <div className="ms-3">
            <h6 className="mb-0">
              {dataUser.nombre_persona} {dataUser.apellido_persona}
            </h6>
            <span>{dataUser.rol}</span>
          </div>
        </div>
        <div className="navbar-nav w-100">
          {/* Administrativos */}
          {dataUser.rol === 'administrativo' && (
            <>
              <NavLink
                to="/inicio-administrativo"
                className={({ isActive }) =>
                  isActive ? claseCssActivo : claseCssInactivo
                }
              >
                <i className="fa fa-home me-2"></i>Inicio
              </NavLink>

              <NavLink
                to="/materias"
                className={({ isActive }) =>
                  isActive ? claseCssActivo : claseCssInactivo
                }
              >
                <i className="fa fa-keyboard me-2"></i>Materias
              </NavLink>

              <NavLink
                to="/avisos"
                className={({ isActive }) =>
                  isActive ? claseCssActivo : claseCssInactivo
                }
              >
                <i className="fa fa-comments me-2"></i>Avisos
              </NavLink>

              <a href="#" className="nav-item nav-link"></a>

              <NavLink
                to="/asistencias"
                className={({ isActive }) =>
                  isActive ? claseCssActivo : claseCssInactivo
                }
              >
                <i className="fa fa-check me-2"></i>Asistencias
              </NavLink>

              <NavLink
                to="/notas-alumnos"
                className={({ isActive }) =>
                  isActive ? claseCssActivo : claseCssInactivo
                }
              >
                <i className="fa fa-tasks me-2"></i>Notas Alumnos
              </NavLink>

              <NavLink
                to="/usuarios"
                className={({ isActive }) =>
                  isActive ? claseCssActivo : claseCssInactivo
                }
              >
                <i className="fa fa-users me-2"></i>Usuarios
              </NavLink>
            </>
          )}
          {/* Docentes */}

          {dataUser.rol === 'docente' && (
            <>
              <NavLink
                to="/inicio-docente"
                className={({ isActive }) =>
                  isActive ? claseCssActivo : claseCssInactivo
                }
              >
                <i className="fa fa-home me-2"></i>Inicio
              </NavLink>

              <NavLink
                to="/cargar-notas"
                className={({ isActive }) =>
                  isActive ? claseCssActivo : claseCssInactivo
                }
              >
                <i className="fa fa-check me-2"></i>Cargar Notas
              </NavLink>

              <NavLink
                to="/horarios-alumnos"
                className={({ isActive }) =>
                  isActive ? claseCssActivo : claseCssInactivo
                }
              >
                <i className="fa fa-clock me-2"></i>Ver Horarios
              </NavLink>

              <a href="#" className="nav-item nav-link"></a>

              {/* <a href="#" className="nav-item nav-link">
                <i className="fa fa-clock me-2"></i>Ver Notas
              </a> */}

              <NavLink
                to="/enviar-avisos"
                className={({ isActive }) =>
                  isActive ? claseCssActivo : claseCssInactivo
                }
              >
                <i className="fa fa-comments me-2"></i>Enviar Avisos
              </NavLink>
              <a href="#" className="nav-item nav-link"></a>

              {/* <a href="#" className="nav-item nav-link">
                <i className="fa fa-user me-2"></i>Ver Mi Perfil
              </a> */}
            </>
          )}

          {/* Alumnos */}
          {dataUser.rol === 'alumno' && (
            <>
              <NavLink
                to="/inicio-alumno"
                className={({ isActive }) =>
                  isActive ? claseCssActivo : claseCssInactivo
                }
              >
                <i className="fa fa-home me-2"></i>Inicio
              </NavLink>

              <NavLink
                to="/inasistencias-alumnos"
                className={({ isActive }) =>
                  isActive ? claseCssActivo : claseCssInactivo
                }
              >
                <i className="fa fa-check me-2"></i>Ver Inasis.
              </NavLink>

              <NavLink
                to="/horarios-alumnos"
                className={({ isActive }) =>
                  isActive ? claseCssActivo : claseCssInactivo
                }
              >
                <i className="fa fa-clock me-2"></i>Ver Horarios
              </NavLink>

              <NavLink
                to="/notas-alumnos"
                className={({ isActive }) =>
                  isActive ? claseCssActivo : claseCssInactivo
                }
              >
                <i className="fa fa-tasks me-2"></i>Ver Notas
              </NavLink>

              <NavLink
                to="/avisos-alumnos"
                className={({ isActive }) =>
                  isActive ? claseCssActivo : claseCssInactivo
                }
              >
                <i className="fa fa-comments me-2"></i>Ver Avisos
              </NavLink>

              <NavLink
                to="/documentos-alumnos"
                className={({ isActive }) =>
                  isActive ? claseCssActivo : claseCssInactivo
                }
              >
                <i className="fa fa-user me-2"></i>Ver Documentaciones
              </NavLink>
            </>
          )}
          {/* <div className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <i className="fa fa-laptop me-2"></i>Elements
            </a>
            <div className="dropdown-menu bg-transparent border-0">
              <a href="button.html" className="dropdown-item">
                Buttons
              </a>
              <a href="typography.html" className="dropdown-item">
                Typography
              </a>
              <a href="element.html" className="dropdown-item">
                Other Elements
              </a>
            </div>
          </div>
          <div className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <i className="far fa-file-alt me-2"></i>Pages
            </a>
            <div className="dropdown-menu bg-transparent border-0">
              <a href="#" className="dropdown-item">
                Sign In
              </a>
              <a href="#" className="dropdown-item">
                Sign Up
              </a>
              <a href="#" className="dropdown-item">
                404 Error
              </a>
              <a href="#" className="dropdown-item">
                Blank Page
              </a>
            </div>
          </div> */}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
