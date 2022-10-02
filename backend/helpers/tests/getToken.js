import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const getTokenTest = ({ _id, nombre_persona, apellido_persona }) => {
  const token = jwt.sign({ _id, nombre_persona, apellido_persona }, process.env.PRIVATE_KEY);
  return {
    authorization: token,
  };
};
