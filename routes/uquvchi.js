const express = require("express");
const Rout = express.Router();
const uquvchiController = require("../controllers/uquvchi");

Rout.route("/").get(uquvchiController.getAll).post(uquvchiController.add);
Rout.route("/:id")
  .patch(uquvchiController.edit)
  .delete(uquvchiController.deleteData)
  .get(uquvchiController.getOne);

module.exports = Rout;
