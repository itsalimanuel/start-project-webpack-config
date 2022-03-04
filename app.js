require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const port = 3000

// const Prismic = require('@prismicio/client')
// const PrismicDom = require('prismic-dom')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('pages/home')
})
app.get('/about', (req, res) => {
  res.render('pages/about')
})
app.get('/cases', (req, res) => {
  res.render('pages/cases')
})
app.get('/detail', (req, res) => {
  res.render('pages/detail')
})

app.listen(port, () => {
  console.log('work')
})
app.use(express.static(path.join(__dirname, 'dev')))
