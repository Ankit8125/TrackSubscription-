import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

// Make our servers listen to access specific routes
app.listen(3000, () => {
  console.log('Server running on port 3000');
})

export default app