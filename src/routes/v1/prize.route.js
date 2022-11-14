const express = require("express");
const auth = require("../../middlewares/auth");
const prizeController = require("../../controllers/prize.controller");

const router = express.Router();

router
  .route("/")
  .post(auth("manageUsers"), prizeController.createPrize)
  .get(auth("getUsers"), prizeController.getPrizes);

router
  .route("/:prizeId")
  .get(auth("getUsers"), prizeController.getPrize)
  .patch(auth("manageUsers"), prizeController.updatePrize)
  .delete(auth("manageUsers"), prizeController.deletePrize);

module.exports = router;
