const express = require('express')
const jsonServer = require('json-server')
const middlewares = jsonServer.defaults()
const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const serverless = require('serverless-http')

const app = express()

// Set default middlewares (logger, static, cors and no-cache)
app.use(middlewares)

// Add custom routes before JSON Server router

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
app.use(jsonServer.bodyParser)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  )
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})
app.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// Use default router (local)
app.use(router)
// Path must route to lambda
app.use('/.netlify/functions/server', router)

module.exports = app
module.exports.handler = serverless(app)
