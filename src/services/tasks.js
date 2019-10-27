const MongoLib = require('../lib/mongo')

class TasksService {
  constructor () {
    this.collection = 'tasks'
    this.mongoDB = new MongoLib()
  }

  async getTasks (status = null, search = null) {
    const statusQuery = status ? { status } : {}
    const searchQuery = search ? { description: new RegExp(search, 'i') } : {}
    const query = { ...statusQuery, ...searchQuery }
    const tasks = await this.mongoDB.getAll(this.collection, query)

    return tasks || []
  }

  async getTask (id) {
    const task = await this.mongoDB.get(this.collection, id)
    return task || {}
  }

  async createTask (taskData) {
    const createTaskId = await this.mongoDB.create(this.collection, { ...taskData.task, status: 'pending' })
    return createTaskId
  }

  async updateTask (taskId, taskData) {
    const updatedTaskId = await this.mongoDB.update(this.collection, taskId, taskData)

    return updatedTaskId
  }

  async deleteTask (taskId) {
    const deletedTaskId = await this.mongoDB.delete(this.collection, taskId)
    return deletedTaskId
  }
}

module.exports = TasksService
