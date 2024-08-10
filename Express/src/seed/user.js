import bcrypt from "bcrypt";

const users = [
  {
    id: 1, // Especifica manualmente el id
    name: "Emily",
    lastname: "Sandoval",
    rol: "user",
    email: "prueba1@hotmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    id: 2,
    name: "Daniel",
    lastname: "Cervantes",
    rol: "admin",
    email: "prueba2@hotmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
