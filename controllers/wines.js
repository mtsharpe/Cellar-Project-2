const express = require('express')
const router = express.Router()
const Wine = require('../models/Wine')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

router.get('/', (req, res) => {
  Wine.find({}).then(wines => res.render('index', { wines }))
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

router.put('/:id/save-image', (req, res) => {
  Wine.findOneAndUpdate({ _id: req.params.id }, {'$set': {'image': req.body['wine-url']}})
    .then(wine => {
      res.redirect(`/wines/${wine.color}/${wine._id}`)
    })
})

router.put('/:id', (req, res) => {
  Wine.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(wine => {
      res.redirect('/')
    })
})

router.get('/new', (req, res) => {
  res.render('new')
})

router.get('/:wineType/:id', (req, res) => {
  Wine.findOne({ _id: req.params.id })
    .then(wine => res.render('show', { wine }))
})

router.get('/:wineType/:sortType?', (req, res) => {
  let wineType = req.params.wineType.slice(0, -1)
  Wine.find({ 'color': wineType })
    .then(wines => {
      if (req.params.wineType === 'reds' || req.params.wineType === 'whites' || req.params.wineType === 'others') {
        res.render(req.params.wineType, { wines })
      } else {
        res.redirect('/')
      }
    })
})

router.delete('/:id', (req, res) => {
  Wine.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      res.redirect('/')
    })
})

module.exports = router
