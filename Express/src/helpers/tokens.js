import jwt from "jsonwebtoken";

const generateJWT = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });

export { generateJWT };
