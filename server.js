import express from "express";
import sequelize from './db/db.js';
import userRoutes from './routes/user-creation.js'
import loginRoute from './routes/login-route.js';

const PORT = 3000;
const app = express();
app.use(express.json());

const sql = sequelize();

app.get('/', (_req,res) => {
  return res.json({message: 'Welcome to E-commerce API'});
});

app.use('/api/users', userRoutes);
app.use('/api/login',loginRoute);

const startServer = async() => {
  try {
    await sql.authenticate();
    console.log(`Database connected!`);
    await sql.sync( {
      force: true,
      alter: true
    } ).then(() => console.log('DB sync')).catch(err => console.log(`Errro ${err}`));

    app.listen(PORT, ()=> {
      console.log(`Server running at http://localhost:${PORT}`);
    })
  } catch(err) {
    console.log(`Error during connection ${err}`);
  }
};

startServer();