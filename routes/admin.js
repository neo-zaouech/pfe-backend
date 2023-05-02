const express = require('express')
const Bureau = require('../models/bureau')
const Service = require('../models/service')
const User = require('../models/user')
const router = express.Router()

//get Bureaux
router.get('/bureau', async (req, res) => {
  const bureaux = await Bureau.find({ ...req.query })
  res.send(bureaux)
})
//ajout Bureau
router.post('/bureau', async (req, res) => {
  try {
    const { localisation, horaire } = req.body
    const bureau = new Bureau({ localisation, horaire })
    const result = await bureau.save()
    res.send(result)
  } catch (error) {
    res.status(400).send(error)
  }
})
//modifier Bureau
router.put('/bureau', async (req, res) => {
  try {
    const { bureauReq } = req.body
    const bureau = await Bureau.findById(bureauReq._id)
    bureau.horaire = bureauReq.horaire
    bureau.localisation = bureauReq.localisation
    bureau.listeServices = bureauReq.listeServices
    bureau.listeEmploye = bureauReq.listeEmploye
    bureau.chefService = bureauReq.chefService
    const result = await bureau.save()
    res.send(result)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})
//suppression logique Bureau
router.delete('/bureau', async (req, res) => {
  try {
    const { idBureau } = req.body
    const bureau = await Bureau.findById(idBureau)
    bureau.deletedAt = bureau.deletedAt ? null : new Date()
    await bureau.save()
    const result = await Bureau.find()
    res.send(result)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

//get Services
router.get('/service', async (req, res) => {
  const services = await Service.find({ ...req.query })
  res.send(services)
})
//ajout Service
router.post('/service', async (req, res) => {
  try {
    const { name, disponible } = req.body
    const service = new Service({ name, disponible })
    const result = await service.save()
    res.send(result)
  } catch (error) {
    res.status(400).send(error)
  }
})
//modifier Service
router.put('/service', async (req, res) => {
  try {
    const { serviceReq } = req.body
    const service = await Service.findById(serviceReq._id)
    Object.assign(service, serviceReq)
    const result = await service.save()
    res.send(result)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})
//suppression logique
router.delete('/service', async (req, res) => {
  try {
    const { idService } = req.body
    const service = await Service.findById(idService)
    service.deletedAt = service.deletedAt ? null : new Date()
    await service.save()
    const result = await Service.find()
    res.send(result)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

//get Users
router.get('/user', async (req, res) => {
  const users = await User.find({ ...req.query })
  res.send(users)
})

module.exports = router
