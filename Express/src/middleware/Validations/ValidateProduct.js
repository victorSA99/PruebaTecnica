import { validationResult, check } from "express-validator";

const ValidateProduct = async (req, res, next) => {
  await check("name")
    .notEmpty()
    .withMessage("Tiene que agregar el nombre del producto")
    .run(req);

  await check("amount")
    .notEmpty()
    .withMessage("Tiene que agregar el total en inventario")
    .run(req);

  await check("price")
    .notEmpty()
    .withMessage("Tiene que agregar el precio")
    .run(req);

  await check("description")
    .notEmpty()
    .withMessage("Tiene que agregar una descripcion")
    .run(req);

  await check("picture")
    .notEmpty()
    .withMessage("Tiene que agregar la url de una foto")
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export default ValidateProduct;
