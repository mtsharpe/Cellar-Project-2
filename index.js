const express = require('express')
const hbs = require('hbs')
const session = require('express-session')
const parser = require('body-parser')
const cookieParser = require('cookie-parser')
const flash = require('flash')
const methodOverride = require('method-override')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))
app.use(session({ secret: 'Wine' }))
app.use(flash())

app.use('/assets', express.static('public'))
app.use(parser.urlencoded({ exteded: true }))
app.use(methodOverride('_method'))

//const usersController = require('./controllers/users')
const winesController = require('./controllers/wines')

app.set('view engine', 'hbs')
app.get('/', (req, res) => {
  res.redirect('/wines')
})

//app.use('/', usersController)
app.use('/wines', winesController)
app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
  console.log(`UP on PORT: ${app.get('port')}`)
})
