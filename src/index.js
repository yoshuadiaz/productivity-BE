const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const { config } = require('./config')
const tasksAPI = require('./routes/tasks')

const {
  logErrors,
  errorHandler,
  wrapErrors
} = require('./utils/midleware/errorHandlers')

const notFoundHandler = require('./utils/midleware/notFoundHandler')

const { formatHandler } = require('./utils/midleware/formatHandler')

// body parser
app.use(bodyParser.json())

// format middleware
app.use(formatHandler)

// routes
tasksAPI(app)

// Catch 404
app.use(notFoundHandler)

// Errors midleware
app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)

app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(config.port, () => {
  console.log(`Listen http://localhost:${config.port}`)
})
