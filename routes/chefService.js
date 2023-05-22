const express = require('express')
const Bureau = require('../models/bureau')

const router = express.Router()

router.post('/service', async (req, res) => {
  const { idService, idBureau, action } = req.body
  const bureau = await Bureau.findById(idBureau).populate('listeServices')
  if (action === 'affecter') {
    bureau.listeServices.push(idService)
  } else
    bureau.listeServices = bureau.listeServices.filter((s) => {
      return s._id + '' !== idService + ''
    })

  bureau.save().then(async (savedBureau) => {
    const fullBureau = await Bureau.findById(idBureau)
      .populate('listeServices')
      .populate('listeEmploye.chefService')

    res.send(fullBureau)
  })
})

router.post('/user', async (req, res) => {
  const { idGuichier, idBureau, action } = req.body
  const bureau = await Bureau.findById(idBureau).populate('listeServices')
  if (action === 'affecter') {
    bureau.listeEmploye.employe.push(idGuichier)
  } else
    bureau.listeEmploye.employe = bureau.listeEmploye.employe.filter(
      (guichier) => {
        return guichier._id + '' !== idGuichier + ''
      }
    )
  bureau.save().then(async (savedBureau) => {
    const fullBureau = await Bureau.findById(idBureau)
      .populate('listeServices')
      .populate('listeEmploye.chefService')
      .populate('listeEmploye.employe')

    res.send(fullBureau)
  })
})

module.exports = router
