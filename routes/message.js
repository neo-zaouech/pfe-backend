const express = require('express')
const Message = require('../models/message')
const router = express.Router()

router.get('/', async (req, res) => {
  const { userId } = req.query
  const messages = await Message.find({
    $or: [{ sender: userId }, { receiver: userId }],
  })
    .populate('receiver')
    .populate('sender')
  res.send(messages)
})

router.get('/messages', async (req, res) => {
  const { user1, user2 } = req.query
  const messages = await Message.find({
    $or: [
      { sender: user1, receiver: user2 },
      { receiver: user1, sender: user2 },
    ],
  })
    .populate('receiver')
    .populate('sender')
  res.send(messages)
})

router.post('/', async (req, res) => {
  try {
    const { receiver, sender, text } = req.body
    const message = new Message({ receiver, sender, text })
    message
      .save()
      .then((savedMessage) => {
        res.send(savedMessage)
      })
      .catch((error) => {
        res.status(500).send(error)
      })
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router
