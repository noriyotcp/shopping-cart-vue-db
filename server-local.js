const server = require('./express/server')

server.listen(3000, () => {
  console.log(`JSON Server is running at Port http://localhost:3000`) // eslint-disable-line no-console
})
