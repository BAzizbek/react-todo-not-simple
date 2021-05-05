import mongoose from 'mongoose';

const todoSchema = mongoose.Schema({
  title: String,
  isDone: {type: Boolean, default: false}
})

export default mongoose.model('Todos', todoSchema)
