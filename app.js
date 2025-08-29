import express from 'express'
import { PORT } from './config/env.js'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'
import subscriptionRouter from './routes/subscription.routes.js'
import connectToDatabase from './database/mongodb.js'
import errorMiddleware from './middlewares/error.middleware.js'

const app = express()

// This allows our app to handle JSON data sent in requests or API calls 
app.use(express.json())

// This helps us to process the form data sent via HTML forms in a simple format
app.use(express.urlencoded({ extended: false }))

// This reads cookies from incoming requests so that our app can store user data
app.use(cookieParser())

// Good practice to keep naming as plural
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)

app.use(errorMiddleware)

app.get('/', (req, res) => {
  res.send('Hello World')
})

// Make our servers listen to access specific routes
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectToDatabase()
})

export default app