import express from 'express'
import { PORT } from './config/env.js'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

// Make our servers listen to access specific routes
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

export default app