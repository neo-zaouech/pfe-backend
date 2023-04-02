const express = require("express");
const Bureau = require("../models/bureau");
const router = express.Router();
//ajout
router.post("/bureau", async (req, res) => {
  try {
    const { localisation, horaire } = req.body;
    const bureau = new Bureau({ localisation, horaire });
    const result = await bureau.save();
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});
//modifier
router.put("/bureau", async (req, res) => {
  try {
    const { bureauReq } = req.body;
    const bureau = await Bureau.findById(bureauReq._id);
    bureau.horaire = bureauReq.horaire;
    bureau.localisation = bureauReq.localisation;
    bureau.listeServices = bureauReq.listeServices;
    bureau.listeEmploye = bureauReq.listeEmploye;
    bureau.chefService = bureauReq.chefService;
    const result = await bureau.save();
    res.send(result);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//suppression logique
router.delete("/bureau", async (req, res) => {
  try {
    const { idBureau } = req.body;
    const bureau = await Bureau.findById(idBureau);
    bureau.deletedAt = new Date();
    const result = await bureau.save();
    res.send(result);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
