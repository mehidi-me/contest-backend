const express = require("express");
const auth = require("../../middlewares/auth");
const contestController = require("../../controllers/contest.controller");

const router = express.Router();

router
  .route("/")
  .post(auth("manageUsers"), contestController.createContest)
  .get(auth("getUsers"), contestController.getContests);

router.route("/all").get(contestController.getAllContest);
router
  .route("/:contestId")
  .get(contestController.getContest)
  .patch(auth("manageUsers"), contestController.updateContest);
//   .delete(auth("manageUsers"), prizeController.deletePrize);

module.exports = router;
