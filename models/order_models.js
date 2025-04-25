import db from '../db/db.js';
import { DataTypes } from 'sequelize';

const sequelize = db();
const Orders = sequelize.define(
    'Orders',
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      total_amount: DataTypes.DECIMAL,
      status: {
        type: DataTypes.ENUM('pending', 'shipped', 'cancelled', 'paid'),
        defaultValue: null
      }
    },
    {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
      UserId: false
    }
  );
  


export default Orders;