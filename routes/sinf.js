const express = require("express");
const Rout = express.Router();
const sinfController = require("../controllers/sinf");

Rout.route("/").get(sinfController.getAll).post(sinfController.add);
Rout.route("/:id")
  .patch(sinfController.edit)
  .delete(sinfController.deleteData)
  .get(sinfController.getOne);

module.exports = Rout;
