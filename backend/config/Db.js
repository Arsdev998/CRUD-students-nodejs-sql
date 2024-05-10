import { Sequelize } from "sequelize";

const db = new Sequelize("students_data", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
