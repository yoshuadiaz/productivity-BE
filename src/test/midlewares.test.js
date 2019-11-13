const assert = require('assert')
const sinon = require('sinon')
const jsonxml = require('jsontoxml')

const { tasksMock } = require('../utils/mocks/tasks')

const {
  logErrors,
  wrapErrors,
  errorHandler
} = require('../utils/midleware/errorHandlers')

const { formatHandlerForTest } = require('../utils/midleware/formatHandler')

describe('MIDLEWARE', function () {
  describe('errorHandlers', function () {
    describe('logErrors', () => {
      it('should called next with errors', () => {
        const nextSpy = sinon.spy()
        sinon.spy(logErrors)

        logErrors(500, {}, {}, nextSpy)
        assert(nextSpy.calledOnce)
      })
    })

    describe('wrapErrors', () => {
      it('should called next with boom errors', () => {
        const nextSpy = sinon.spy()
        const err = { isBoom: true }
        sinon.spy(wrapErrors)

        wrapErrors(err, {}, {}, nextSpy)
        assert(nextSpy.called)
        assert(nextSpy.calledWith(err))
      })
    })

    describe('errorHandler', () => {
      it('should response methods called', () => {
        const err = {
          output: {
            statusCode: 500,
            payload: 'Internal server error'
          },
          stack: 'Not showing data'
        }
        const res = {
          status: sinon.spy(),
          json: sinon.spy()
        }
        sinon.spy(errorHandler)
        errorHandler(err, {}, res, {})
        assert(res.status.calledOnce)
        assert(res.json.calledOnce)
      })
    })
  })

  describe('formatHandler', function () {
    const mockResponse = () => {
      const res = {}
      res.type = () => res
      res.status = () => res
      res.send = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
      return res
    }

    it('should resolves with json', () => {
      const expected = {
        entity: 'task',
        data: tasksMock,
        message: tasksMock
      }
      const body = expected
      const req = {
        headers: {
          'content-type': 'application/json'
        }
      }

      const result = formatHandlerForTest(body, req, {})
      assert.deepStrictEqual(result, expected)
    })

    it('should resolves with xml', () => {
      const body = {
        entity: 'task',
        data: tasksMock
      }
      const req = {
        headers: {
          'content-type': 'text/xml'
        }
      }

      const res = mockResponse()

      const data = body.data.map(item => ({
        name: 'task',
        children: { ...item }
      }))

      const expected = jsonxml({ ...body, data }, true)

      formatHandlerForTest(body, req, res)
      assert.deepStrictEqual(res.send.args[0][0], expected)
    })

    it('should resolves with error', () => {
      const body = {
        entity: 'task',
        data: tasksMock,
        message: 'not found'
      }

      const req = {
        headers: {
          'content-type': 'lorem ipsum'
        }
      }

      const res = mockResponse()

      const expected = {
        entity: body.entity,
        data: null,
        error: 'Invalid format, I only resolve in application/json or text/xml',
        message: body.message
      }

      formatHandlerForTest(body, req, res)
      assert(res.json.called)
      assert.deepStrictEqual(res.json.args[0][0], expected)
    })
  })
})
