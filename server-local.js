const app = require('./express/server')

app.listen(3000, () => {
  console.log(`JSON Server is running at Port http://localhost:3000`) // eslint-disable-line no-console
})
