import Router from 'express'
const router = new Router()
import Todo from '../model/Todo.js'
import User from '../model/User.js'


router.get('/todo', async (req, res) => {
  const todo = await Todo.find()
  res.json(todo)
})

router.get('/todo/done', async (req, res) => {
  const todo = await Todo.find({isDone: true})
  res.json(todo)
})

router.get('/todo/:id', async (req, res) => {
  const { id } = req.params
  const todo = await Todo.findOne({_id: id})
  res.json(todo)
})

router.post('/todo', async (req, res) => {
  const { title, comment } = req.body
  const todo = new Todo({title, comment, created: Date.now()})
  await todo.save()
  res.status(201).json(todo)
})

router.put('/todo/:id', async (req, res) => {
  const { id } = req.params
  const { edit, comment } = req.body
  const todo = await Todo.findOne({_id: id})
  todo.title = edit
  todo.comment = comment
  await todo.save();
  res.status(200).json(todo)
})

router.patch('/todo/:id', async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id)
  await Todo.findByIdAndUpdate(id, { isDone: !todo.isDone}, (err, item) => {
    res.status(200).json(item);
  });
  
})

router.delete('/todo/:id', async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findOneAndDelete({_id: id})
  res.status(200).json(id);
})

export default router
