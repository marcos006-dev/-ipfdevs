import { ErrorMessage } from 'formik';
import React from 'react';

const MensajeErrorInput = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      render={(msg) => (
        <div
          className="alert alert-danger alert-dismissible fade show mt-3"
          role="alert"
        >
          <i className="fa fa-exclamation-circle me-2"></i>
          {msg}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
    />
  );
};

export default MensajeErrorInput;
