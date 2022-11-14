const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { prizeService } = require("../services");

const createPrize = catchAsync(async (req, res) => {
  const prize = await prizeService.createPrize(req.body);
  res.status(httpStatus.CREATED).send(prize);
});

const getPrizes = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await prizeService.queryPrizes(filter, options);
  res.send(result);
});

const getPrize = catchAsync(async (req, res) => {
  const prize = await prizeService.getPrizeById(req.params.prizeId);
  if (!prize) {
    throw new ApiError(httpStatus.NOT_FOUND, "Prize not found");
  }
  res.send(prize);
});

const updatePrize = catchAsync(async (req, res) => {
  const prize = await prizeService.updatePrizeById(
    req.params.prizeId,
    req.body
  );
  res.send(prize);
});

const deletePrize = catchAsync(async (req, res) => {
  await prizeService.deletePrizeById(req.params.prizeId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPrize,
  getPrizes,
  getPrize,
  updatePrize,
  deletePrize,
};
