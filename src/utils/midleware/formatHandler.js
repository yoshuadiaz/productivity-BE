const mung = require('express-mung')
const jsonxml = require('jsontoxml')

function formatHandler (body, req, res) {
  if (
    !('content-type' in req.headers) ||
    req.headers['content-type'] === 'application/json'
  ) {
    return body
  } else if (req.headers['content-type'] === 'text/xml') {
    res.set('Content-Type', 'text/xml')

    const isBodyDataArray = body.data.length

    if (isBodyDataArray && isBodyDataArray > 0) {
      const data = body.data.map(item => ({
        name: body.entity,
        children: { ...item }
      }))
      return jsonxml(JSON.stringify({ ...body, data }), true)
    } else {
      return jsonxml(JSON.stringify(body), true)
    }
  } else {
    res.json({
      entity: body.entity,
      data: null,
      error: 'Invalid format, I only resolve in application/json or text/xml',
      message: body.message
    }).status(500)
  }
}

module.exports = {
  formatHandler: mung.json(formatHandler)
}
