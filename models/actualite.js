const { Schema, model } = require('mongoose')
const actualiteSchema = new Schema({
  text: { type: String, required: true },
  image: { type: String, required: true },
  employe: { type: Schema.Types.ObjectId, ref: 'user' },
  bureau: { type: Schema.Types.ObjectId, ref: 'office' },
  createdAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
})

const Actualite = model('actualite', actualiteSchema)

module.exports = Actualite
