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
      request.get('/api/tasks').send({ status: 'completed' }).expect(200, done)
    })

    it('should respond with the list of tasks', function (done) {
      request.get('/api/tasks').end((_, res) => {
        const result = res.body
        const expected = {
          data: tasksMock,
          entity: 'task',
          message: 'tasks listed'
        }
        assert.deepStrictEqual(result, expected)

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

  describe('GET /tasks/:id', function () {
    it('should respond with status 200', function (done) {
      request.get('/api/tasks/5dcb78c8fc13ae1e9e000000').expect(200, done)
    })

    it('should respond with a task', function (done) {
      request.get('/api/tasks/5dcb78c8fc13ae1e9e000000').end((_, res) => {
        const result = res.body
        const expect = {
          data: tasksMock.filter(task => task.id === '5dcb78c8fc13ae1e9e000000'),
          entity: 'task',
          message: 'task retrieved'
        }
        assert.deepStrictEqual(result, expect)
        done()
      })
    })

    it('should respond with a status 500 with an invalid id', function (done) {
      request.get('/api/tasks/5').expect(500, done)
    })
  })

  describe('POST /tasks', function () {
    it('should create a task and obtain a status 201', function (done) {
      request.post('/api/tasks').send({
        task: {
          description: 'lorem',
          duration: 10
        }
      }).expect(201, done)
    })

    it('should create a task and obtain an id', function (done) {
      request.post('/api/tasks').send({
        task: {
          description: 'lorem',
          duration: 10
        }
      }).end((_, res) => {
        const result = res.body
        const expected = {
          data: tasksMock[0].id,
          entity: 'task',
          message: 'task created'
        }
        assert.deepStrictEqual(result, expected)

        done()
      })
    })

    it('should send an status 500 on pass empty task', function (done) {
      request.post('/api/tasks').send({
        task: {
        }
      }).expect(500, done)
    })
  })

  describe('PUT /tasks', function () {
    it('should update a task and obtain a status 201', function (done) {
      request.put(`/api/tasks/${tasksMock[0].id}`).send({
        task: {
          description: 'lorem',
          duration: 10
        }
      }).expect(200, done)
    })

    it('should update a task and obtain the updated task id', function (done) {
      request.put(`/api/tasks/${tasksMock[0].id}`).send({
        task: {
          description: 'lorem',
          duration: 10
        }
      }).end((_, res) => {
        const result = res.body
        const expected = {
          data: tasksMock[0].id,
          entity: 'task',
          message: 'task updated'
        }
        assert.deepStrictEqual(result, expected)

        done()
      })
    })

    it('should send an status 500 try to update invalid task id', function (done) {
      request.put(`/api/tasks/5d`).expect(500, done)
    })
  })

  describe('DELETE /tasks', function () {
    it('should update a task and obtain a status 201', function (done) {
      request.delete(`/api/tasks/${tasksMock[0].id}`).send({
        task: {
          description: 'lorem',
          duration: 10
        }
      }).expect(200, done)
    })

    it('should update a task and obtain the updated task', function (done) {
      request.delete(`/api/tasks/${tasksMock[0].id}`).send({
        task: {
          description: 'lorem',
          duration: 10
        }
      }).end((_, res) => {
        const result = res.body
        const expected = {
          data: tasksMock[0].id,
          entity: 'task',
          message: 'task deleted'
        }
        assert.deepStrictEqual(result, expected)

        done()
      })
    })
  })

  describe('GET /tasks/seed', function () {
    it('should get a status 200', function (done) {
      request.get('/api/tasks/seed').expect(200, done)
    })

    it('should create a seeds', function (done) {
      request.get('/api/tasks/seed').end((_, res) => {
        const result = res.body
        const expected = {
          entity: 'task',
          data: null,
          message: 'DB seeded'
        }

        assert.deepStrictEqual(result, expected)

        done()
      })
    })
  })
})
