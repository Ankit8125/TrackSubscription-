// This middleware finds the user based off the token of the user that is trying to make the request
// It looks if it is there -> decodes it -> verifies it
// Attaches it to the request  

import { JWT_SECRET } from "../config/env.js"
import jwt from 'jsonwebtoken'
import User from "../models/user.model.js"

// Someone is making a requrest: get user details -> authorize middleware -> verify -> if valid -> next -> get user details
const authorize = async (req, res, next) => {
  try {
    let token

    // We pass token via headers
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      token = req.headers.authorization.split(' ')[1]
    }

    if(!token) return res.status(401).json({ message: 'Unauthorized' })

    const decoded = jwt.verify(token, JWT_SECRET)
    const user = await User.findById(decoded.userId)

    if(!user) return res.status(401).json({ message: 'Unauthorized' })

    req.user = user

    next()

  } catch (error) {
    res.status(401).json({
      message: 'Unauthorized',
      error: error.message
    })
  }
}

export default authorize