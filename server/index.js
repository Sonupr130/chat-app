import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL;

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ['POST', 'PUT', 'GET', 'DELETE', 'PATCH'],
    credentials: true,
}))


appuse(express.json());
app.use(cookieParser());


const server = app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});


mongoose.connect(databaseURL).then(() => {
    console.log('Connected to database 🔥');
}).catch((error) => {
    console.log('Error: ', error.message);
});