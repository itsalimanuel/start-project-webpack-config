const express = require('express')
const app = express()
const path = require('path')
const port = 3000

app.set('views', path.join(__dirname, '/views'))

app.set('view engine', 'html')

app.get('/', (req, res) => {
  res.sendFile('views/pages/home.html', { root: __dirname })
})
app.get('/about', (req, res) => {
  res.sendFile('views/pages/about.html', { root: __dirname })
})
app.listen(port, () => {
  console.log(`This server works with port ${port}`)
})
