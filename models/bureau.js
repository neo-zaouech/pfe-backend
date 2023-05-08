const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bureauSchema = new Schema({
  localisation: { type: Object, required: true },
  listeEmploye: {
    type: {
      chefService: { type: Schema.Types.ObjectId, ref: 'user' },
      employe: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    },
    default: {},
  },
  listeServices: [{ type: Schema.Types.ObjectId, ref: 'service' }],
  horaire: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
})

const Bureau = mongoose.model('office', bureauSchema)

module.exports = Bureau
