import jwt from "jsonwebtoken";

export default function verificarToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({
      message: "No se envio un token.",
    });
  }
  jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Envio un token no valido.",
      });
    }
    req.decoded = decoded;
    next();
  });
}
