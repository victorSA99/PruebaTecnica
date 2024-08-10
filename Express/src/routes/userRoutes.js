import express from "express";
import { createUser, getUser, login } from "../controllers/userController.js";
import { protegerRuta } from "../middleware/index.js";
import validateUserFields from "../middleware/Validations/validateUser.js";
const routerUser = express.Router();

routerUser.post("/createUser", protegerRuta, validateUserFields, createUser);
routerUser.get("/getUsers", protegerRuta, getUser);
routerUser.post("/logIn", login);

export default routerUser;
