const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'user' },
  receiver: { type: Schema.Types.ObjectId, ref: 'user' },
  text: { type: String },
  createdAt: { type: Date, default: Date.now },
})

const Message = mongoose.model('messages', messageSchema)

module.exports = Message
