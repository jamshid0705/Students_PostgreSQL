const express = require("express");
const Rout = express.Router();
const tumanController = require("../controllers/tuman");

Rout.route("/").get(tumanController.getAll).post(tumanController.add);
Rout.route("/:id")
  .patch(tumanController.edit)
  .delete(tumanController.deleteData)
  .get(tumanController.getOne);

module.exports = Rout;
