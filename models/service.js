const mongoose = require('mongoose')
const Schema = mongoose.Schema
const serviceSchema = new Schema({
  name: { type: String, required: true },
  disponible: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
})

const Service = mongoose.model('service', serviceSchema)

module.exports = Service
