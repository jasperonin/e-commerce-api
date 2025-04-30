import express from "express";
import sequelize from './db/db.js';
import userRoutes from './routes/user-creation.js';
import loginRoute from './routes/login-route.js';
import productRoute from './routes/product-route.js';
import apiRoute from './routes/api-routes.js';
import orderRoute from './routes/order-routes.js';
import cartRoute from './routes/cart-routes.js';

const app = express();
app.use(express.json());

export const sql = sequelize();

app.get('/', (_req, res) => {
  return res.json({message: 'Welcome to E-commerce API'});
});

app.use('/api/users', userRoutes);
app.use('/api/login', loginRoute);
app.use('/api/products', productRoute);
app.use('/api', apiRoute);
app.use('/api/orders', orderRoute);
app.use('/api/cart',cartRoute);

// Export the app without starting the server
export default app;

if (process.env.NODE_ENV !== 'test') {
  const startServer = async() => {
    try {
      await sql.authenticate();
      console.log(`Database connected!`);
      await sql.sync({
        force: true,
        alter: true
      }).then(() => console.log('DB sync')).catch(err => console.log(`Error ${err}`));

      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
      });
    } catch(err) {
      console.log(`Error during connection ${err}`);
    }
  };

  startServer();
}