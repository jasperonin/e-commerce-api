import orderItem from './order_item_models.js';
import Product from './product_models.js';
import User from './user_models.js';
import Category from './category_models.js';
import Order from './order_models.js';
import Cart from './cart_models.js';


const models = {
    Order,
    Product,
    User,
    Category,
    orderItem,
    Cart
};

//user model

Order.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' })
User.hasMany(Order, { foreignKey: 'user_id' })
User.hasMany(Cart, { foreignKey: 'user_id' });


//cart model
Cart.belongsTo(User, { foreignKey: 'user_id' });
Cart.belongsTo(Product, { foreignKey: 'product_id' });

orderItem.belongsTo(Order, { foreignKey: 'order_id' });
Order.hasMany(orderItem, { foreignKey: 'order_id' });

orderItem.belongsTo(Product, { foreignKey: 'product_id' });
orderItem.hasMany(orderItem, { foreignKey: 'product_id' });

Product.hasMany(orderItem);
orderItem.belongsTo(Product);

Category.hasMany(Product);
Product.belongsTo(Category);

Product.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasMany(Product, { foreignKey: 'category_id' });
Product.hasMany(Cart, { foreignKey: 'product_id' });

// Export all models
export { models };



