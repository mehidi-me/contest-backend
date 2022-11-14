const express = require("express");
const auth = require("../../middlewares/auth");
const joinController = require("../../controllers/join.controller");

const router = express.Router();

router.route("/").post(joinController.createJoin);

router.route("/:contestId/:userId").get(joinController.getOneJoin);

router.route("/:id").get(auth("getUsers"), joinController.getJoinAll);

router
  .route("/:joinId")
  // .get(auth("getUsers"), prizeController.getPrize)
  .patch(auth("manageDelivery"), joinController.updateJoin)
  .delete(auth("manageUsers"), joinController.deleteJoin);

module.exports = router;
