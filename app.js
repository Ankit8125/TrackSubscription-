import express from 'express'
import { PORT } from './config/env.js'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'
import subscriptionRouter from './routes/subscription.routes.js'
import connectToDatabase from './database/mongodb.js'
import errorMiddleware from './middlewares/error.middleware.js'
import arcjetMiddleware from './middlewares/arcjet.middleware.js'
import workflowRouter from './routes/workflow.routes.js'

const app = express()

// This allows our app to handle JSON data sent in requests or API calls 
app.use(express.json())

// This helps us to process the form data sent via HTML forms in a simple format
app.use(express.urlencoded({ extended: false }))

// This reads cookies from incoming requests so that our app can store user data
app.use(cookieParser())

app.use(arcjetMiddleware)
app.use(errorMiddleware)

// Good practice to keep naming as plural
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)
app.use('/api/v1/workflows', workflowRouter)

app.get('/', (req, res) => {
  res.send('Hello World')
})

// Make our servers listen to access specific routes
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectToDatabase()
})

export default app

// Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGIxYmY0MTk2NWVkZTk3OTA5YWU4MzIiLCJpYXQiOjE3NTY0NzkyOTcsImV4cCI6MTc1NjczODQ5N30.DbE5krOnkg8HWUh8MQY98n1WaaGxdvZsS13MnkM8WV8
// id: 68b1bf41965ede97909ae832