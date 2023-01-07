import colors from 'colors'
import dotenv from 'dotenv';
import express from "express";
import { errorHandler } from './middleware/errorMiddleware.js';
import { goalsRouter } from "./routes/goalRoutes.js";
dotenv.config()

import { connectDB } from './config/db.js';
connectDB()
const port = process.env.PORT || 5004;


const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use('/api/goals', goalsRouter)
app.use(errorHandler)

app.listen(port, () => console.log(`server on ${port}`))
