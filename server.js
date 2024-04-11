const http = require('http')
const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/html/index.html`)
})
app.listen(port, () => console.log(`Express запущен на http://localhost:${port}; \n нажмите Ctrl+C для завершения.`))