import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alerta from '../../../components/Alerta';
import Spinner from '../../../components/Spinner';
import Container from '../../../layouts/Container';
import {
  getDataDocumentosAlumno,
  limpiarMensajesDocumentosAlumno,
  putDataDocumentosAlumno,
} from '../../../redux/actions/alumnos/documentosAction';

const Documentos = ({ dataDocumentosAlumno, handleChangeFile }) => {
  return (
    <>
      {Object.keys(dataDocumentosAlumno)?.map((documentoKey, i) => (
        <div className="mb-3" key={i}>
          <label htmlFor="formFile" className="form-label">
            Documento: {documentoKey}
          </label>
          <input
            className="form-control"
            type="file"
            id={documentoKey}
            name={documentoKey}
            onChange={handleChangeFile}
          />

          {dataDocumentosAlumno[documentoKey].hasOwnProperty(
            'url_documento'
          ) ? (
            <h6 className="text-success">
              Documento ya cargado:{' '}
              <a
                target="_blank"
                href={dataDocumentosAlumno[documentoKey].url_documento}
              >
                Ver Documento
              </a>
            </h6>
          ) : (
            <h6 className="text-danger">Documento aun no cargado</h6>
          )}
        </div>
      ))}
    </>
  );
};

const VerDocumentos = () => {
  const {
    dataDocumentosAlumno,
    erroresDocumentosAlumno,
    loadingDocumentosAlumno,
    mensajeDocumentosAlumno,
  } = useSelector((state) => state.documentosAlumnos);

  const [documentos, setDocumentos] = useState();
  const [files, setFiles] = useState({});
  const [errorUploadFile, setErrorUploadFile] = useState('');
  const [statusUploadFile, setStatusUploadFile] = useState(false);
  // console.log(dataDocumentosAlumno);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataDocumentosAlumno());

    return () => {
      dispatch(limpiarMensajesDocumentosAlumno());
    };
  }, []);

  useEffect(() => {
    setDocumentos(dataDocumentosAlumno);
  }, [dataDocumentosAlumno]);

  const handleChangeFile = (e) => {
    const fileInput = e.target.files[0];
    // console.log(fileInput);
    const typeFile = fileInput.name.split('.').reverse()[0];
    // console.log(typeFile !== 'pdf');
    if (typeFile !== 'png' && typeFile !== 'jpg' && typeFile !== 'jpeg') {
      setErrorUploadFile('Solo se pueden subir archivos del PNG, JPG o JPEG.');
      return;
    }

    if (fileInput.size >= 5242880) {
      setErrorUploadFile('Solo se pueden subir archivos menor a 5 MB.');
      return;
    }

    setErrorUploadFile('');

    setFiles({
      ...files,
      [e.target.name]: fileInput,
    });
  };

  const handleSubmit = async (e) => {
    if (Object.keys(files).length === 0) {
      setErrorUploadFile('Debe seleccionar almenos un archivo para subir');
      return;
    }
    // console.log(documentos);
    setStatusUploadFile(true);
    Object.keys(files).forEach(async (documentoKey) => {
      try {
        const formData = new FormData();
        formData.append('file', files[documentoKey]);
        formData.append('upload_preset', 'ipf_devs');
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/marcosDev/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );
        if (!response.ok) {
          // console.log("Poner error aqui")
          setErrorUploadFile('Error al subir la imagen, intente mas tarde');
          setStatusUploadFile(false);
          setFiles({});
          return;
        }

        const data = await response.json();

        const fileForSave = {
          url_documento: data.url,
          tipo_documento: documentoKey,
        };

        // console.log(fileForSave);

        documentos[documentoKey] = fileForSave;
        console.log(documentos)
        setDocumentos(documentos);
      } catch (error) {
        console.log(error);
        setErrorUploadFile('Error al subir la imagen, intente mas tarde');
        return;
      }

      setStatusUploadFile(false);
      setFiles({});
      setErrorUploadFile('');
      dispatch(putDataDocumentosAlumno(documentos));
    });
  };

  return (
    <Container>
      <div className="col-sm-12 col-xl-12">
        <div className="bg-light rounded h-100 p-4">
          <h3 className="mb-4 text-center">Listado de documentos</h3>

          {loadingDocumentosAlumno && <Spinner />}

          {erroresDocumentosAlumno.length > 0 &&
            erroresDocumentosAlumno.map((errors, i) => (
              <Alerta
                clase={'alert-danger mt-2'}
                key={i}
                mensaje={errors?.msg}
              />
            ))}

          <Documentos
            dataDocumentosAlumno={dataDocumentosAlumno}
            handleChangeFile={handleChangeFile}
          />
          <input
            className="btn btn-success"
            type="button"
            name="cargarDocumento"
            value="Actualizar Documento"
            onClick={handleSubmit}
            disabled={statusUploadFile}
            hidden={errorUploadFile ? 'hidden' : ''}
          />

          {errorUploadFile && (
            <Alerta clase={'alert-danger mt-2'} mensaje={errorUploadFile} />
          )}

          {mensajeDocumentosAlumno && (
            <Alerta
              clase={'alert-success mt-3'}
              mensaje={mensajeDocumentosAlumno}
            />
          )}

          {statusUploadFile && (
            <>
              <br />
              <div className="d-flex justify-content-center">
                <div
                  className="spinner-border text-warning"
                  role="status"
                  style={{ width: '3rem', height: '3rem' }}
                >
                  <span className="visually-hidden"></span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default VerDocumentos;
