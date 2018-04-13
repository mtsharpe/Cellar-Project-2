const mongoose = require('../db/connection')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

let userSchema = new Schema({
  email: String,
  password: String
}) 

let wineSchema = new Schema({
  color: String,
  label: String,
  producer: String,
  url: String,
  style: String,
  Description: String,
  Region: String,
  year: Number,
  Inventory: Number,
  user: { type: Schema.ObjectId, ref: 'User'}
})

let User = mongoose.model('User', userSchema)
let Wine = mongoose.model('Wine', wineSchema)

module.exports = User
module.exports = Wine
