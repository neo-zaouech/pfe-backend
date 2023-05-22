const express = require('express')
const Bureau = require('../models/bureau')
const Service = require('../models/service')
const User = require('../models/user')
const router = express.Router()

//get Bureaux
router.get('/bureau', async (req, res) => {
  const { filter } = req.query
  const bureaux = await Bureau.find(filter ? { deletedAt: null } : {})
    .populate('listeEmploye.chefService')
    .populate('listeServices')
  res.send(bureaux.reverse())
})
//ajout Bureau
router.post('/bureau', async (req, res) => {
  try {
    const { localisation, horaire, listeServices, chefService } = req.body
    const bureau = new Bureau({ localisation, horaire })
    bureau.listeServices = listeServices
    bureau.listeEmploye = {
      chefService: chefService !== null ? chefService : null,
      employe: [],
    }
    const result = await bureau.save()
    if (chefService !== null) {
      const user = await User.findById(chefService)
      user.bureau = result._id
      const x = await user.save()
    }

    const savedBureau = await Bureau.findById(result._id).populate(
      'listeEmploye.chefService'
    )
    res.send(savedBureau)
  } catch (error) {
    res.status(400).send(error.message)
  }
})
//modifier Bureau
router.put('/bureau', async (req, res) => {
  try {
    const { bureauReq } = req.body
    const bureau = await Bureau.findById(bureauReq._id)
      .populate('listeServices')
      .populate('listeEmploye.chefService')
    bureau.horaire = bureauReq.horaire
    bureau.localisation = bureauReq.localisation
    bureau.listeServices = bureauReq.listeServices.map((service) => {
      return service._id
    })
    bureau.listeEmploye.chefService = bureauReq.listeEmploye.chefService
    const result = await bureau.save()
    if (bureauReq.listeEmploye.chefService) {
      const user = await User.findById(bureauReq.listeEmploye.chefService)
      user.bureau = bureau._id
      const x = await user.save()
    }
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
      .populate('listeServices')
      .populate('listeEmploye.chefService')
      .populate('listeEmploye.employe')
    res.send(result)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})
//get Services
router.get('/service', async (req, res) => {
  const services = await Service.find({ ...req.query })
  res.send(services.reverse())
})
//ajout Service
router.post('/service', async (req, res) => {
  try {
    const { name, idBureau } = req.body
    const service = new Service({ name })
    const result = await service.save()
    if (idBureau) {
      const bureau = await Bureau.findById(idBureau)
        .populate('listeServices')
        .populate('listeEmploye.chefService')
      bureau.listeServices.push(result._id)
      bureau.save().then(async (savedBureau) => {
        const fullBureau = await Bureau.findById(bureau._id)
          .populate('listeServices')
          .populate('listeEmploye.chefService')
          .populate({
            path: 'listeEmploye.chefService',
            populate: { path: 'bureau' },
          })

        res.send({
          service: result,
          bureau: fullBureau,
        })
      })
    } else res.send(result)
  } catch (error) {
    res.status(400).send(error)
  }
})
//modifier Service
router.put('/service', async (req, res) => {
  try {
    const { serviceReq, idBureau } = req.body
    const service = await Service.findById(serviceReq._id)
    Object.assign(service, serviceReq)
    service.save().then(async (savedResult) => {
      if (idBureau) {
        const fullBureau = await Bureau.findById(idBureau)
          .populate('listeServices')
          .populate('listeEmploye.chefService')
          .populate({
            path: 'listeEmploye.chefService',
            populate: { path: 'bureau' },
          })

        res.send({
          service: savedResult,
          bureau: fullBureau,
        })
      } else res.send(savedResult)
    })
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
    res.send(result.reverse())
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})
//get Users
router.get('/user', async (req, res) => {
  const users = await User.find({ ...req.query }).populate('bureau')
  res.send(users.reverse())
})
//ajout User
router.post('/user', async (req, res) => {
  try {
    const { email, nom, prenom, cin, role, bureau, motPasse } = req.body
    const user = new User({
      email,
      nom,
      prenom,
      cin,
      role,
      bureau,
      motPasse,
    })
    const result = await user.save()
    if (role === 'guichier') {
      const b = await Bureau.findById(bureau._id)
      b.listeEmploye.employe.push(result._id)
      const x = await b.save()
      res.send(x)
    } else res.send(result)
  } catch (error) {
    res.status(400).send(error.message)
  }
})
//modifier User
router.put('/user', async (req, res) => {
  try {
    const { userReq } = req.body
    const service = await User.findById(userReq._id)
    Object.assign(service, userReq)
    const result = await service.save()
    res.send(result)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})
//suppression logique
router.delete('/user', async (req, res) => {
  try {
    const { idUser } = req.body
    const user = await User.findById(idUser)
    user.deletedAt = user.deletedAt ? null : new Date()
    await user.save()
    const result = await User.find().populate('bureau')
    res.send(result.reverse())
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

module.exports = router
