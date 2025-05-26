require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sql = require('mssql');
import { Request, Response } from 'express';
const MyUserRoute = require('./routes/MyUserRoute')
const LoginUserRoute = require('./routes/LoginUserRoute')
const DriverRequestRoute = require('./routes/DriverRequestRoute')
const mongoose = require('mongoose')

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch((error: unknown) => {
    if (error instanceof Error) {
        console.error('MongoDB connection error:', error.message);
    } else {
        console.error('MongoDB connection error:', error);
    }
})


app.use('/', MyUserRoute)
app.use('/', LoginUserRoute)
app.use('/', DriverRequestRoute)


app.get('/api', async (req: Request, res: Response) => {  
    res.json({ message: 'API is running' });
});


app.listen(7000, () => {
    console.log('Server running on port 7000');
})