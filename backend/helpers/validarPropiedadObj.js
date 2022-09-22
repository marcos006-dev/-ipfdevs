export const validarPropObj = (objData) => {
  const propiedades = Object.getOwnPropertyNames(objData);

  if (propiedades.length > 0) return Promise.reject("Se deben enviar los atributos necesarios");

//   for (const i of propiedades) {
//     if(!propiedades[i])
//   }
};
