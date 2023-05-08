const express = require('express')
const User = require('../models/user')
const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { nom, prenom, cin, motPasse, email, role, bureau } = req.body
    const user = new User({
      nom,
      prenom,
      cin,
      motPasse,
      email,
      role,
      bureau: bureau !== null ? bureau._id : null,
    })
    const result = await user.save()
    res.send(result)
  } catch (error) {
    res.send(error.message)
  }
})

router.post('/login', async (req, res) => {
  try {
    const { cin, motPasse } = req.body
    const user = await User.findOne({ cin }).populate('bureau').exec()

    if (user === null) {
      res.send('cin incorrecte')
    } else {
      if (user.motPasse === motPasse) {
        res.send(user)
      } else {
        res.send('mot de passe incorrecte')
      }
    }
  } catch (error) {
    res.send(error)
  }
})

module.exports = router
