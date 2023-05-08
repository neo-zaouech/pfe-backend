const express = require('express')
const Bureau = require('../models/bureau')
const Service = require('../models/service')
const User = require('../models/user')
const Actualite = require('../models/actualite')
const router = express.Router()

router.get('/', async (req, res) => {
  const actualites = await Actualite.find()
    .populate('employe')
    .populate('bureau')
  res.send(actualites)
})
