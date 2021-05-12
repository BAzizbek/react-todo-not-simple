import Router from 'express'
const router = new Router()
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import verToken from "../middleware/auth.js"
import User from '../model/User.js';

const generateToken = (id) => jwt.sign({ id }, process.env.SECRET, { expiresIn: '1h' })

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
      console.log('error');
      return res.status(404).json({ message: 'This email is already in use' })
    }
    const hashedPass = await bcrypt.hash(password, 10)
    const newUSer = await User.create({ email, password: hashedPass })
    const token = generateToken(newUSer._id)
    console.log('success');
    console.log(newUSer);

    res.status(201).json({ user: newUSer._id, token })
  } catch (error) {
    console.log(error)
    res.json({ message: "Server error" })
  }
})

router.post('/login', async (req, res) => {

  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }
    const isPassValid = bcrypt.compare(password, user.password)
    if (!isPassValid) {
      return res.status(400).json({ message: 'Invalid password' })
    }
    const token = generateToken(user._id)
    return res.status(200).json({ user: user._id, token })
  } catch (error) {
    console.log(error)
    res.json({ message: 'Server error' })
  }
})

router.get('/auth', verToken, async (req, res) => {
  try {
    const user = await User.find({ _id: req.user.id })
    const token = generateToken(user[0]._id)
    res.status(200).json({ user: user[0]._id, token })
  } catch (error) {
    console.log(error)
    res.json({ message: 'Server error' })
  }
})

export default router
