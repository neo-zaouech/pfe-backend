const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  cin: { type: String, unique: true, required: true },
  motPasse: { type: String, required: true },
  email: { type: String, required: true },
  role: {
    type: String,
    enum: ['chef_service', 'guichier', 'admin'],
    required: true,
  },
  bureau: { type: Schema.Types.ObjectId, ref: 'office' },
  createdAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
})

const User = mongoose.model('user', userSchema)
User.createIndexes()
module.exports = User
