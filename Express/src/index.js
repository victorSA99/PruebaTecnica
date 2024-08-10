import express from "express";
import cors from "cors";
import { routerOrder, routerProducts, routerUser } from "./routes/index.js";
import db from "./config/db.js";

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: "*", // Permitir solicitudes de cualquier origen
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
  credentials: false, // No se requieren credenciales
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions)); // Aplicar la configuración de CORS

// Conexión a la base de datos
try {
  await db.authenticate();
  await db.sync(); // Asegúrate de usar await aquí también
  console.log("Conexión correcta a la base de datos");
} catch (error) {
  console.log(error);
}

// Routing
app.use("/", routerUser);
app.use("/products", routerProducts);
app.use("/order", routerOrder);

const port = 3000;
app.listen(port, () => {
  console.log(`El servidor está funcionando en el puerto ${port}`);
});
