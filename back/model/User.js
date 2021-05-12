import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  email: {type: String, required: true, trim: true},
  password: { type: String, required: true },
  todos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Todo'}]
})

export default mongoose.model('User', userSchema)
