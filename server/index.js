import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/AuthRoutes.js';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL;

app.use(cors({
    // origin: process.env.ORIGIN,
    origin: 'http://localhost:5173',
    methods: ['POST', 'PUT', 'GET', 'DELETE', 'PATCH'],
    credentials: true,
}))

app.use("/uploads/profiles", express.static("uploads/profiles"));

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);


const server = app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});


mongoose.connect(databaseURL).then(() => {
    console.log('Connected to database 🔥');
}).catch((error) => {
    console.log('Error: ', error.message);
});