const express = require('express')
const hbs = require('hbs')
const session = require('express-session')
const parser = require('body-parser')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const morgan = require('morgan')
const passport = require('passport')
const passportConfig = require('./config/passport')

const aws = require('aws-sdk')

const app = express()

app.use(morgan('dev'))
app.use(cookieParser())
app.use(session({ secret: 'Wine' }))
app.use(flash())

passportConfig(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use('/assets', express.static('public'))
app.use(parser.urlencoded({ exteded: true }))
app.use(methodOverride('_method'))
app.engine('html', require('ejs').renderFile)
aws.config.region = 'us-east-2'

const usersController = require('./controllers/users')
const winesController = require('./controllers/wines')

app.set('view engine', 'hbs')
app.get('/', (req, res) => {
  res.redirect('/wines')
})

app.use(function (req, res, next) {
  res.locals.currentUser = req.user
  next()
})

const S3_BUCKET = process.env.S3_BUCKET

// app.get('/', (req, res) => res.render('show'))

app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3()
  const fileName = req.query['file-name']
  const fileType = req.query['file-type']
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  }

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err)
      return res.end()
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    }
    res.write(JSON.stringify(returnData))
    res.end()
    console.log('file-name')
    console.log('file-type')
  })
})

app.post('/', (req, res) => {

})

app.use('/', usersController)
app.use('/wines', winesController)
app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
  console.log(`UP on PORT: ${app.get('port')}`)
})
