import db from "../db/db.js";
import { DataTypes } from "sequelize";

const sequelize = db();
const Categories = sequelize.define("Categories", {
  name: DataTypes.STRING,
});

export default Categories;
