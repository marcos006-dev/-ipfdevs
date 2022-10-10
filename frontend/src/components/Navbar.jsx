import { useDispatch, useSelector } from 'react-redux';
import profile from '../assets/img/user.jpg';
import { cerrarSesion } from '../redux/actions/authAction';

const Navbar = ({ handleChangeToggle }) => {
  const dataUser = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleClickLogut = () => {
    dispatch(cerrarSesion);
  };

  return (
    <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
      <a href="#" className="navbar-brand d-flex d-lg-none me-4">
        <h2 className="text-primary mb-0">
          <i className="fa fa-hashtag"></i>
        </h2>
      </a>
      <a
        href="#"
        className="sidebar-toggler flex-shrink-0"
        onClick={handleChangeToggle}
      >
        <i className="fa fa-bars"></i>
      </a>

      <div className="navbar-nav align-items-center ms-auto">
        {/* <div className="nav-item dropdown">
          <a
            href="#"
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <i className="fa fa-envelope me-lg-2"></i>
            <span className="d-none d-lg-inline-flex">Message</span>
          </a>
          <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
            <a href="#" className="dropdown-item">
              <div className="d-flex align-items-center">
                <img
                  className="rounded-circle"
                  src={profile}
                  alt=""
                  style={{ width: '40px', height: '40px' }}
                />
                <div className="ms-2">
                  <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                  <small>15 minutes ago</small>
                </div>
              </div>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <div className="d-flex align-items-center">
                <img
                  className="rounded-circle"
                  src={profile}
                  alt=""
                  style={{ width: '40px', height: '40px' }}
                />
                <div className="ms-2">
                  <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                  <small>15 minutes ago</small>
                </div>
              </div>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <div className="d-flex align-items-center">
                <img
                  className="rounded-circle"
                  src={profile}
                  alt=""
                  style={{ width: '40px', height: '40px' }}
                />
                <div className="ms-2">
                  <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                  <small>15 minutes ago</small>
                </div>
              </div>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item text-center">
              See all message
            </a>
          </div>
        </div> */}
        <div className="nav-item dropdown">
          <a
            href="#"
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <i className="fa fa-bell me-lg-2"></i>
            <span className="d-none d-lg-inline-flex">Notification</span>
          </a>
          <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
            <a href="#" className="dropdown-item">
              <h6 className="fw-normal mb-0">Profile updated</h6>
              <small>15 minutes ago</small>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <h6 className="fw-normal mb-0">New user added</h6>
              <small>15 minutes ago</small>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <h6 className="fw-normal mb-0">Password changed</h6>
              <small>15 minutes ago</small>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item text-center">
              See all notifications
            </a>
          </div>
        </div>
        <div className="nav-item dropdown">
          <a
            href="#"
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <img
              className="rounded-circle me-lg-2"
              src={profile}
              alt=""
              style={{ width: '40px', height: '40px' }}
            />
            <span className="d-none d-lg-inline-flex">
              {dataUser.nombre_persona} {dataUser.apellido_persona}
            </span>
          </a>
          <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
            {/* <a href="#" className="dropdown-item">
              My Profile
            </a>
            <a href="#" className="dropdown-item">
              Settings
            </a> */}
            <a onClick={handleClickLogut} href="#" className="dropdown-item">
              Cerrar Sesión
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
