const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const db = require('./config/db/index');
const app = express();
const port = process.env.PORT || 5000;
//import routes
const userRoutes = require('./app/routes/users.router');
const registerRoutes = require('./app/routes/register.router');
const productRoutes = require('./app/routes/products.router');
const loginRoutes = require('./app/routes/login.router');
//Middleware necessary
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(
   cors({
      credentials: true,
   })
);
app.use(cookieParser())
//Connect database
db.connect();
//Midleware router
app.use('/users', userRoutes);
app.use('/register', registerRoutes);
app.use('/products', productRoutes);
app.use('/login', loginRoutes);
//
app.listen(port);
