const express = require('express')
const Chance = require('chance')
const chance = new Chance()
const TasksService = require('../services/tasks')
const {
  createTaskSchema,
  taskIdSchema,
  updateTaskSchema
} = require('../utils/schemas/tasks')
const validationHandler = require('../utils/midleware/validationHandler.js')
const NUM_OF_SEEDS = 50
const entity = 'task'

function tasksAPI (app) {
  const router = express.Router()
  app.use('/api/tasks', router)
  const tasksService = new TasksService()

  router.get('/', async (req, res, next) => {
    try {
      const { status } = req.body
      if (!status) {
        const tasks = await tasksService.getTasks()
        res.status(200).json({
          entity,
          data: tasks,
          message: 'tasks listed'
        })
      } else {
        const tasks = await tasksService.getTasks(status)
        res.status(200).json({
          entity,
          data: tasks,
          message: 'tasks listed'
        })
      }
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
        entity,
        data: tasks,
        message: 'found tasks listed'
      })
    } catch (err) {
      next(err)
    }
  })

  router.get('/seed', async (req, res, next) => {
    try {
      const tasksPromises = [...Array(NUM_OF_SEEDS).keys()].map(async () => {
        const task = {
          description: await chance.sentence({ words: 5 }),
          duration: await chance.integer({ min: 1, max: 120 }),
          timeRegistered: await chance.integer({ min: 1, max: 120 }),
          status: await chance.pickone(['completed', 'pending'])
        }
        tasksService.createTask({ task })
      })

      await Promise.all(tasksPromises)

      res.status(200).json({
        entity,
        data: null,
        message: 'DB seeded'
      })
    } catch (error) {
      res
        .status(500)
        .json({
          entity,
          data: null,
          message: 'DB not seeded',
          error: 'seeds fail'
        })
    }
  })

  router.get('/:id', validationHandler({ id: taskIdSchema }, 'params'), async (req, res, next) => {
    try {
      const { id } = req.params
      const task = await tasksService.getTask(id)
      res.status(200).json({
        entity,
        data: task,
        message: 'task retrieved'
      })
    } catch (err) {
      next(err)
    }
  })

  router.post('/', validationHandler(createTaskSchema), async (req, res, next) => {
    const { body: task } = req
    try {
      const createdtaskId = await tasksService.createTask(task)

      res.status(201).json({
        entity,
        data: createdtaskId,
        message: 'task created'
      })
    } catch (err) {
      next(err)
    }
  })

  router.put('/:id', validationHandler({ id: taskIdSchema }, 'params'), validationHandler(updateTaskSchema), async (req, res, next) => {
    const { id } = req.params
    const { task } = req.body

    try {
      const taskOnDB = await tasksService.getTask(id)

      if (taskOnDB.status !== 'completed' && task) {
        const updatedtaskId = await tasksService.updateTask(id, task)

        res
          .status(200)
          .json({
            entity,
            data: updatedtaskId,
            message: 'task updated'
          })
      } else {
        res.json({
          entity,
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
        entity,
        data: deletedtaskId,
        message: 'task deleted'
      })
    } catch (err) {
      next(err)
    }
  })
}

module.exports = tasksAPI
