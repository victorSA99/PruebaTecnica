import { validationResult, check } from "express-validator";

const validateOrderFields = async (req, res, next) => {
  await check("userId")
    .notEmpty()
    .withMessage("Tiene que agregar el id del usuario")
    .run(req);

  await check("status")
    .notEmpty()
    .withMessage("Tiene que agregar un status")
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export default validateOrderFields;
