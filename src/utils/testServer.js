const express = require('express')
const supertest = require('supertest')
var bodyParser = require('body-parser')

function testServer (route) {
  const app = express()
  app.use(bodyParser.json())
  route(app)
  return supertest(app)
}

module.exports = testServer
