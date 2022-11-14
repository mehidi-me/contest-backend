const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { joinService } = require("../services");

const createJoin = catchAsync(async (req, res) => {
  const join = await joinService.createJoin(req.body);
  res.status(httpStatus.CREATED).send(join);
});

const getOneJoin = catchAsync(async (req, res) => {
  const join = await joinService.getOneJoin(req.params);
  res.send(join);
});

const getJoinAll = catchAsync(async (req, res) => {
  const join = await joinService.getJoinAll(req.params.id);
  res.send(join);
});

// const getPrizes = catchAsync(async (req, res) => {
//   const filter = pick(req.query, ["name", "role"]);
//   const options = pick(req.query, ["sortBy", "limit", "page"]);
//   const result = await prizeService.queryPrizes(filter, options);
//   res.send(result);
// });

// const getPrize = catchAsync(async (req, res) => {
//   const prize = await prizeService.getPrizeById(req.params.prizeId);
//   if (!prize) {
//     throw new ApiError(httpStatus.NOT_FOUND, "Prize not found");
//   }
//   res.send(prize);
// });

const updateJoin = catchAsync(async (req, res) => {
  const join = await joinService.updateJoinById(req.params.joinId, req.body);
  res.send(join);
});

const deleteJoin = catchAsync(async (req, res) => {
  await joinService.deletejoinById(req.params.joinId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createJoin,
  getOneJoin,
  getJoinAll,
  updateJoin,
  deleteJoin,
};
