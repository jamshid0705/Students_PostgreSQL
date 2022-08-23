const express = require("express");
const Rout = express.Router();
const maktabController = require("../controllers/maktab");

Rout.route("/").get(maktabController.getAll).post(maktabController.add);
Rout.route("/:id")
  .patch(maktabController.edit)
  .delete(maktabController.deleteData)
  .get(maktabController.getOne);

module.exports = Rout;
