import jwt from "jsonwebtoken"

const verToken = (req, res, next) => {

  if (req.method === 'OPTIONS') {
    return next()
 }

  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Not authorized' })
    }
    const decodedToken = jwt.verify(token, 'secretpassword')
    req.user = decodedToken
    next()
  
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Not authorized' })
  }
}

export default verToken
