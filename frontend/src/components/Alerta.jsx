import React from 'react';

const Alerta = ({ clase, mensaje }) => {
  return (
    <div className={`alert ${clase} alert-dismissible fade show`} role="alert">
      <i className="fa fa-exclamation-circle me-2"></i>
      {mensaje}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default Alerta;
