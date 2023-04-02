const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bureauSchema = new Schema({
  localisation: { type: String, required: true },
  listeServices: { type: Array, default: [] },
  listeEmploye: { type: Array, default: [] },
  chefService: { type: Object, default: {} },
  horaire: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

const Bureau = mongoose.model("office", bureauSchema);

module.exports = Bureau;
