const express = require('express')
const morgan = require('morgan')
const routes = require('./routes')
const app = express()
const port = 3000

app.use(express.json())
app.use(morgan("tiny"));

app.use("/", routes)

app.listen(port, () => {
  console.log(`[!] Server is starting on http://localhost:${port}`)
})