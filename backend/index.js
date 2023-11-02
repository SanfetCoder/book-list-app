import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from "cors";
const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware CORS POLICY
app.use(cors())

// connect to the database using mongoose
try {
  await mongoose.connect(mongoDBURL);
  console.log('successfully connected to the database bookstore')
} catch(error) {
  console.log(error)
}

app.get('/', (req,res)=>{
  console.log(req)
  return res.status(234).send('Welcome')
});

app.use('/books', booksRoute);

app.listen(PORT, ()=>{
  console.log(`App is listening ot port: ${PORT}`);
});