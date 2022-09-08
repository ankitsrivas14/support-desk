const express = require('express')
const path = require('path')
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
const e = require('express');

//Routes
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);

app.use(errorHandler);

//Serve Frontend
if(process.env.NODE_ENV === 'production'){
    //Set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) => res.sendFile(__dirname, '../',  'frontend', 'build', 'index.html'))
}
else{
    app.get('/', (req, res) => {
        res.status(200).json({message: 'Welcome to the Support Desk API'})
    })
}



app.listen(PORT, () => {
    console.log("Server running at Port ", PORT);
})