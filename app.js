const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });

// Database connection
const connectDB = require('./config/db');
connectDB();

// Middleware
app.use(express.json());


// importing routes
const foodItemRouter = require('./routes/foodItem');
const mealRouter = require('./routes/meal');
const userRouter = require('./routes/user');

// using routes
app.use('/api/v1/foodItem', foodItemRouter);
app.use('/api/v1/meal', mealRouter);
app.use('/api/v1/user', userRouter);


module.exports = app;