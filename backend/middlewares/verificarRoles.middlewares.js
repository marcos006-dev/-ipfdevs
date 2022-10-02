import { PersonaModel } from "../models/Persona.model.js";

export const verificarRoles = async (req, res, next) => {
  try {
    const { path } = req.route;
    const [, pathRuta] = path.split("/");
    // console.log(req.decoded);
    // return;
    //   obtener el id del usuario que realizo la peticion
    const { _id } = req.decoded;

    // console.log(_id);
    //   obtener rutas disponibles para el usuario que trata de acceder a la ruta
    const persona = await PersonaModel.findById(_id);
    // console.log(persona);
    if (!persona) {
      return res.status(401).json({
        msg: "Su usuario no posee los privilegios para interactuar con esta ruta",
      });
    }
    const { roles } = persona;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < roles.acceso_endpoint.length; i++) {
    //   console.log(roles.acceso_endpoint[i]);
    //   console.log(pathRuta);

      if (roles.acceso_endpoint[i].includes(pathRuta)) {
        return next();
      }
    }

    return res.status(401).json({
      msg: "Su usuario no posee los privilegios para interactuar con esta ruta",
    });
  } catch (error) {
    return res.status(401).json({
      msg: error,
    });
  }
};
