const express = require('express')
const Reclamation = require('../models/reclamation')
const router = express.Router()

router.post('/', async (req, res) => {
  const { bureau, text, email } = req.body
  const reclamation = new Reclamation({
    bureau: bureau ? bureau._id : null,
    text,
    email,
  })
  reclamation
    .save()
    .then((savedReclamation) => {
      res.send(savedReclamation)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

router.get('/', async (req, res) => {
  const reclamations = await Reclamation.find().populate('bureau')
  res.send(reclamations)
})

module.exports = router
