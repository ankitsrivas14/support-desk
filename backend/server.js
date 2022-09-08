const express = require('express')
const dotenv = require('dotenv').config();
const colors = require('colors');
const dbConnection = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')
const PORT = process.env.PORT || 4000;

//Connect to DB

const connectDB = async () => {
    await dbConnection();
};
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes Import
const userRoutes = require('./routes/userRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

//Routes
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);

app.use(errorHandler);



app.listen(PORT, () => {
    console.log("Server running at Port ", PORT);
})