import express from 'express';
import mongoose from 'mongoose';
import Todo from './model/Todo.js';
import cors from 'cors';

const app = express()

mongoose.connect('mongodb://localhost:27017/TODOReact', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())

app.get('/todo', async (req, res) => {
  const todo = await Todo.find();
  res.json(todo)
})

app.post('/todo', async (req, res) => {
  const { title } = req.body;
  const todo = new Todo({title})
  await todo.save();
  res.status(201).json(todo)
})

app.put('/todo/:id', async (req, res) => {
  const { id } = req.params;
  const { edit } = req.body;
  const todo = await Todo.findOne({_id: id});
  todo.title = edit
  await todo.save();
  res.status(200).json(todo);
})

app.patch('/todo/:id', async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id)
  await Todo.findByIdAndUpdate(id, { isDone: !todo.isDone}, (err, item) => {
    console.log(item)
    res.status(200).json(item);
  });
  
})

app.delete('/todo/:id', async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findOneAndDelete({_id: id});
  console.log(todo);
  res.status(200).json(id);
})

export default app
