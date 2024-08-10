import { validationResult, check } from "express-validator";

const validateUserFields = async (req, res, next) => {
  await check("name")
    .notEmpty()
    .withMessage("El nombre no puede ir vacío")
    .run(req);

  await check("rol").notEmpty().withMessage("El rol es requerido").run(req);

  await check("lastname")
    .notEmpty()
    .withMessage("El Apellido no puede ir vacío")
    .run(req);

  await check("password")
    .notEmpty()
    .withMessage("La contraseña no puede ir vacía")
    .run(req);

  await check("email")
    .isEmail()
    .withMessage("Eso no parece un correo electrónico")
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export default validateUserFields;
