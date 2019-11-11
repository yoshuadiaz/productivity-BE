const assert = require('assert')
const proxyquire = require('proxyquire')

const { tasksMock, TaskServiceMock } = require('../utils/mocks/tasks')
const testServer = require('../utils/testServer')

describe('routes - tasks', function () {
  const route = proxyquire('../routes/tasks', {
    '../services/tasks': TaskServiceMock
  })

  const request = testServer(route)

  describe('GET /tasks', function () {
    it('should respond with status 200', function (done) {
      request.get('/api/tasks').send({status: 'completed'}).expect(200, done)
    })

    it('should respond with the list of tasks', function (done) {
      request.get('/api/tasks').end((_, res) => {
        assert.deepStrictEqual(res.body, {
          data: tasksMock,
          entity: 'task',
          message: 'tasks listed'
        })

        done()
      })
    })

    it('should respond with the list of tasks completed', function (done) {
      request.get('/api/tasks').send({ status: 'completed' }).end((_, res) => {
        assert.deepStrictEqual(res.body, {
          data: tasksMock.filter(task => task.status === 'completed'),
          entity: 'task',
          message: 'tasks listed'
        })

        done()
      })
    })

    it('should respond with the list of tasks pending', function (done) {
      request.get('/api/tasks').send({ status: 'pending' }).end((_, res) => {
        assert.deepStrictEqual(res.body, {
          data: tasksMock.filter(task => task.status === 'pending'),
          entity: 'task',
          message: 'tasks listed'
        })

        done()
      })
    })

    it('should respond with the list of tasks matched with search param', function (done) {
      request.get('/api/tasks/search').query({q: 'Win'}).end((_, res) => {
        assert.deepStrictEqual(res.body, {
          data: tasksMock.filter(task => task.description.search('Win') >= 0),
          entity: 'task',
          message: 'found tasks listed'
        })

        done()
      })
    })
  })
})
