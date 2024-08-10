import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const db = new Sequelize(
  process.env.BDNOMBRE,
  process.env.USERBD,
  process.env.PASSWORDDB,
  {
    host: process.env.HOSTBD,
    port: process.env.PORTDB,
    dialect: "mysql",
    define: {
      timestamps: true,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export default db;
