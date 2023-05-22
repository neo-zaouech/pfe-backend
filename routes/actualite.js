const express = require('express')
const Bureau = require('../models/bureau')
const Service = require('../models/service')
const User = require('../models/user')
const Actualite = require('../models/actualite')
const router = express.Router()

const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    file.mimetype !== 'application/pdf'
      ? cb(null, 'public/images')
      : cb(null, 'public/pdf')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
})

const upload = multer({ storage })

router.get('/', async (req, res) => {
  const actualites = await Actualite.find(
    req.query.filter ? { deletedAt: null } : {}
  )
    .populate('employe')
    .populate('bureau')
  res.send(actualites)
})

router.post('/', upload.single('image'), (req, res) => {
  const { text, employe, bureau } = req.body

  const actualite = new Actualite({
    text,
    employe,
    bureau,
    image: req.file.filename,
  })
  actualite.save().then(async (savedActualité) => {
    const act = await Actualite.findById(savedActualité._id)
      .populate('employe')
      .populate('bureau')
    res.send(act)
  })
})

router.delete('/', async (req, res) => {
  const { id } = req.body
  const actualite = await Actualite.findById(id)
  actualite.deletedAt = actualite.deletedAt ? null : new Date()
  actualite.save().then(async () => {
    const act = await Actualite.find().populate('employe').populate('bureau')
    res.send(act)
  })
})

module.exports = router
