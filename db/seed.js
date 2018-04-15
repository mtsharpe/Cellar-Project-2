const Wine = require('../models/Wine')

const seedData = require('./seeds.json')

Wine.remove({})
  .then(() => {
    return Wine.collection.insert(seedData)
  })
  .then(() => {
    process.exit()
  })
