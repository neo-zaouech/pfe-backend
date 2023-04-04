const express = require('express')
const Bureau = require('../models/bureau')
const Service = require('../models/service')
const router = express.Router()
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
    bureau.deletedAt = new Date()
    const result = await bureau.save()
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
    service.deletedAt = new Date()
    const result = await service.save()
    res.send(result)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

module.exports = router
