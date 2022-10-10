import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Spinner from '../components/Spinner';

// import '../assets/js/main';
const Container = ({ children }) => {
  const [toggle, setToggle] = useState('');

  const handleChangeToggle = () => {
    const toggleChange = toggle === '' ? 'open' : '';
    setToggle(toggleChange);
  };

  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      <Spinner />
      <Sidebar toggle={toggle} />

      <div className="content">
        <Navbar handleChangeToggle={handleChangeToggle} />
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">{children}</div>
        </div>
      </div>

      {/* <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i className="bi bi-arrow-up"></i>
      </a> */}
    </div>
  );
};

export default Container;
