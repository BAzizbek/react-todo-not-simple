import mongoose from 'mongoose';

const todoSchema = mongoose.Schema({
  title: String,
  isDone: { type: Boolean, default: false },
  comment: String,
  created: {type: Number}
})

export default mongoose.model('Todo', todoSchema)
