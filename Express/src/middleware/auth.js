import jwt from "jsonwebtoken";

const protegerRuta = async (req, res, next) => {
  const _authHeader = req.headers["authorization"];

  if (!_authHeader) {
    return res.status(401).send("Se requiere autenticación");
  }

  const parts = _authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).send("Formato de autorización no válido");
  }

  const _token = parts[1];

  try {
    // Verificar el token JWT
    const decoded = jwt.verify(_token, process.env.JWT_SECRET);
    req.user = decoded; //
    next();
  } catch (error) {
    return res.status(401).send("Token no válido");
  }
};

export default protegerRuta;
