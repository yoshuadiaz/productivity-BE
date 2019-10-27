const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const { config } = require('./config')
const tasksAPI = require('./routes/tasks')

const { logErrors, errorHandler } = require('./utils/midleware/errorHandlers')
const { formatHandler } = require('./utils/midleware/formatHandler')

app.use(formatHandler)

app.use(bodyParser.json())
tasksAPI(app)

app.use(logErrors)
app.use(errorHandler)

app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(config.port, () => {
  console.log(`Listen http://localhost:${config.port}`)
})
