const express = require('express')
const router = express.Router()
const Wine = require('../models/Wine')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

router.get('/', (req, res) => {
  Wine.find({}).then(wines => res.render('index', { wines }))
})

router.get('/:reds', (req, res) => {
  Wine.find({ 'color': 'red' })
    .then(wines => res.render('reds', { wines }))
})

router.get('/:whites', (req, res) => {
  Wine.find({ 'color': 'white' })
    .then(wines => res.render('whites', { wines }))
})

router.post('/', (req, res) => {
  Wine.create(req.body)
    .then(wine => {
      res.redirect('/')
    })
})

router.get('/edit/:id', (req, res) => {
  Wine.findOne({ _id: req.params.id })
    .then(wine => {
      res.render('edit', {wine})
    })
})

router.put('/:id', (req, res) => {
  Wine.findOneAndUpdate({ _id: req.params.id }.req.body, { new: true })
    .then(wine => {
      res.redirect('/')
    })
})

router.get('/new', (req, res) => {
  res.render('new')
})

router.get('/reds/:id', (req, res) => {
  Wine.findOne({ _id: req.params.id })
    .then(wine => res.render('show', { wine }))
})

router.delete('/:id', (req, res) => {
  Wine.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      res.redirect('/')
    })
})

module.exports = router
