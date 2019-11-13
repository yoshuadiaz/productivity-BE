const assert = require('assert')
const proxyquire = require('proxyquire')

const { MongoLibMock, getAllStub } = require('../utils/mocks/mongoLib')
const { tasksMock } = require('../utils/mocks/tasks')

describe('services - tasks', function () {
  const TaskService = proxyquire('../services/tasks.js', {
    '../lib/mongo.js': MongoLibMock
  })

  const tasksService = new TaskService()

  describe('when getTasks method is called', async function () {
    it('should call the getAll MongoLib method', async function () {
      await tasksService.getTasks()
      assert.strictEqual(getAllStub.called, true)
    })

    it('should return an array of taks', async function () {
      const result = await tasksService.getTasks()
      const expected = tasksMock
      assert.deepStrictEqual(result, expected)
    })
    it('should return an array of completed tasks', async function () {
      const result = await tasksService.getTasks('completed')
      const expected = tasksMock.filter(t => t.status === 'completed')
      assert.deepStrictEqual(result, expected)
    })
    it('should return an array of pending tasks', async function () {
      const result = await tasksService.getTasks('pending')
      const expected = tasksMock.filter(t => t.status === 'pending')
      assert.deepStrictEqual(result, expected)
    })
    it('should return an array with a matched task', async function () {
      const result = await tasksService.getTasks('completed', 'win')
      const expected = tasksMock[1]
      assert.deepStrictEqual(result, expected)
    })
    it('should return an empty array', async function () {
      const result = await tasksService.getTasks('completed', 'lorem ipsum')
      const expected = []
      assert.deepStrictEqual(result, expected)
    })
  })

  describe('when getTask method is called', async function () {
    it('should return a task', async function () {
      const result = await tasksService.getTask(1)
      const expected = tasksMock[0]
      assert.deepStrictEqual(result, expected)
    })
  })

  describe('when create/update/delete method is called', async function () {
    it('Creation of a task', async function () {
      const result = await tasksService.createTask({
        task: {
          description: 'Lorem ipsum',
          duration: 100000
        }
      })
      const expected = tasksMock[0].id
      assert.strictEqual(result, expected)
    })

    it('Updating a task', async function () {
      const result = await tasksService.updateTask(1, { task: { description: 'lorem ipsum', status: 'pending' } })
      const expected = tasksMock[0].id
      assert.strictEqual(result, expected)
    })

    it('Deleting of a task', async function () {
      const result = await tasksService.deleteTask(1)
      const expected = tasksMock[0].id
      assert.strictEqual(result, expected)
    })
  })
})
