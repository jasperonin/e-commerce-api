import db from "../db/db.js";
import { DataTypes } from "sequelize";

const sequelize = db();
const Products = sequelize.define(
  "Product",
  {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    stock: DataTypes.STRING,
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Categories",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Products;
