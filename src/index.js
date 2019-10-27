const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { config } = require('./config')
const tasksAPI = require('./routes/tasks')

app.use(bodyParser.json())

tasksAPI(app)

app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(config.port, () => {
  console.log(`Listen http://localhost:${config.port}`)
})
