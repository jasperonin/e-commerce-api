import db from '../db/db.js';
import { DataTypes } from 'sequelize';


const sequelize = db();
const OrderItem = sequelize.define('OrderItem', {
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Orders',
      key: 'id'
    }
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Products',
      key: 'id'
    }
  },
  quantity: DataTypes.INTEGER,
  unit_price: DataTypes.DECIMAL
});



export default OrderItem;
