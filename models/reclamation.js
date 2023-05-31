const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reclamationSchema = new Schema({
  bureau: { type: Schema.Types.ObjectId, ref: 'office' },
  email: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

const Reclamation = mongoose.model('reclamations', reclamationSchema)

module.exports = Reclamation
