import { DataTypes } from "sequelize";
import db from "../config/Db.js";


const Student = db.define(
  "students",
  {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    tugas: DataTypes.STRING,
    detail: DataTypes.STRING,
    nilai: DataTypes.INTEGER
  },
  {
    freezeTableName: true,
  }
);

export default Student;
(async () => {
    try {
      await db.sync();
      console.log("Database synchronized successfully");
    } catch (error) {
      console.error("Error synchronizing database:", error);
    }
  })();