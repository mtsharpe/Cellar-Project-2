# Concept
Cellar is an app that allows users to sort and inventory their personal wine collection based on their input.

# models
```
const Schema = mongoose.Schema
const ObjectId - Schema.ObjectId

let userSchema = new Schema({
  email: String,
  password: String
}) 

let wineSchema = new Schema({
  color: String,
  year: Number,
  producer: String,
  varietal: String,
  Region: String,
  url: String,
  Description: String,
  Inventory: Number,
  user: { type: Schema.ObjectId, ref: 'User'}
})

let User = mongoose.model('User', userSchema)
let Wine = mongoose.model('Wine', wineSchema)
```


Need to filter Wine collection by red, white or other
Need routes to those filtered lists
Need a table template to display the lists
