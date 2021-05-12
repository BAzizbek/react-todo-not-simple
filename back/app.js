import dotenv from 'dotenv'
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
// import Todo from './model/Todo.js';
import TodoRouter from "./routes/todoRoute.js";
import UserRouter from "./routes/userRoute.js";

dotenv.config()
const app = express()

// mongoose.connect('mongodb://localhost:27017/TODOReact', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.connect(`mongodb+srv://aziz:${process.env.DB_PASS}@cluster0.2yxyw.mongodb.net/react-todo?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use(TodoRouter)
app.use(UserRouter)

export default app
