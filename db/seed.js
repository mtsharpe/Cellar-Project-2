const Wine = require('../models/Wine')

const seedData = require('./seeds.json')

Wine.remove({})
  .then(() => {
    seedData.forEach(wine => {
      wine.image = ''
    })
    return Wine.collection.insert(seedData)
  })
  .then(() => {
    process.exit()
  })
