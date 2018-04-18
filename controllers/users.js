var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var passport = require('passport')

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/signup', (req, res) => {
  res.render('signup', {
    message: req.flash('signupMessage')
  })
})

router.post('/signup', (req, res) => {
  const signupStrategy = passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  })
  return signupStrategy(req, res)
})

router.get('/login', (req, res) => {
  res.render('login', { message: req.flash('loginMessage') })
})

router.post('/login', (req, res) => {
  const loginProperty = passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
  return loginProperty(req, res)
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/secret', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('secret')
  } else {res.redirect('/')
  }
})

module.exports = router
