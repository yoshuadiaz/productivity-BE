const sinon = require('sinon')

const { tasksMock } = require('./tasks')

const getAllStub = sinon.stub()

getAllStub.withArgs('tasks').resolves(tasksMock)
getAllStub.withArgs('tasks', { status: 'completed' }).resolves(tasksMock.filter(t => t.status === 'completed'))
getAllStub.withArgs('tasks', { status: 'pending' }).resolves(tasksMock.filter(t => t.status === 'pending'))
getAllStub.withArgs('tasks', { status: 'completed', description: new RegExp('win', 'i') }).resolves(tasksMock[1])
getAllStub.withArgs('tasks', { status: 'completed', description: new RegExp('lorem ipsum', 'i') }).resolves([])

const createStub = sinon.stub().resolves(tasksMock[0].id)
const getStub = sinon.stub().resolves(tasksMock[0])
const updateStub = sinon.stub().resolves(tasksMock[0].id)
const deleteStub = sinon.stub().resolves(tasksMock[0].id)

class MongoLibMock {
  getAll (collection, query) {
    return getAllStub(collection, query)
  }

  get (collection, id) {
    return getStub(collection, id)
  }

  create (collection, data) {
    return createStub(collection, data)
  }

  update (collection, id, data) {
    return updateStub(collection, id, data)
  }

  delete (collection, id) {
    return deleteStub(collection, id)
  }
}

module.exports = {
  getAllStub,
  createStub,
  MongoLibMock
}
