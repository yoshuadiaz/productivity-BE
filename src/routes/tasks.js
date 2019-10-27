const express = require('express')
const TasksService = require('../services/tasks')

function tasksAPI (app) {
  const router = express.Router()
  app.use('/api/tasks', router)
  const tasksService = new TasksService()

  router.get('/', async (req, res, next) => {
    try {
      const { status } = req.body
      const tasks = await tasksService.getTasks(status)
      res.status(200).json({
        data: tasks,
        message: 'tasks listed'
      })
    } catch (err) {
      next(err)
    }
  })

  router.get('/search', async (req, res, next) => {
    try {
      const { q } = req.query
      const { status } = req.body
      const tasks = await tasksService.getTasks(status, q)
      res.status(200).json({
        data: tasks,
        message: 'found tasks listed'
      })
    } catch (err) {
      next(err)
    }
  })

  router.get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const task = await tasksService.getTask(id)
      res.status(200).json({
        data: task,
        message: 'task retrieved'
      })
    } catch (err) {
      next(err)
    }
  })

  router.post('/', async (req, res, next) => {
    const { body: task } = req
    try {
      const createdtaskId = await tasksService.createTask(task)

      res.status(201).json({
        data: createdtaskId,
        message: 'task created'
      })
    } catch (err) {
      next(err)
    }
  })

  router.put('/:id', async (req, res, next) => {
    const { id } = req.params
    const { task } = req.body

    try {
      const taskOnDB = await tasksService.getTask(id)

      if (taskOnDB.status !== 'completed' && task) {
        const updatedtaskId = await tasksService.updateTask(id, task)

        res
          .status(200)
          .json({
            data: updatedtaskId,
            message: 'task updated'
          })
      } else {
        res.json({
          data: null,
          message: 'task not updated'
        }).status(304).end()
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  })

  router.delete('/:taskId', async (req, res, next) => {
    const { taskId } = req.params

    try {
      const deletedtaskId = await tasksService.deleteTask(taskId)

      res.status(200).json({
        data: deletedtaskId,
        message: 'task deleted'
      })
    } catch (err) {
      next(err)
    }
  })
}

module.exports = tasksAPI
