const joi = require('@hapi/joi')

const taskIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)
const taskDescriptionSchema = joi.string().max(150)
const taskDurationSchema = joi.number().min(1).max(120)
const taskTimeRegisteredSchema = joi.number().min(1)
const taskStatusSchema = joi.string().valid('completed', 'pending')

const createTaskSchema = {
  task: {
    description: taskDescriptionSchema.required(),
    duration: taskDurationSchema.required()
  }
}

const updateTaskSchema = {
  task: {
    description: taskDescriptionSchema,
    duration: taskDurationSchema,
    timeRegistered: taskTimeRegisteredSchema,
    status: taskStatusSchema
  }
}

module.exports = {
  taskIdSchema,
  createTaskSchema,
  updateTaskSchema
}
