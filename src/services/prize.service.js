const httpStatus = require("http-status");
const { Prize } = require("../models");
const ApiError = require("../utils/ApiError");

const createPrize = async (prizeBody) => {
  return Prize.create(prizeBody);
};

const queryPrizes = async (filter, options) => {
  const prizes = await Prize.paginate(filter, options);
  return prizes;
};

const getPrizeById = async (id) => {
  return Prize.findById(id);
};

const updatePrizeById = async (prizeId, updateBody) => {
  const prize = await getPrizeById(prizeId);
  if (!prize) {
    throw new ApiError(httpStatus.NOT_FOUND, "Prize not found");
  }

  Object.assign(prize, updateBody);
  await prize.save();
  return prize;
};

const deletePrizeById = async (prizeId) => {
  const prize = await getPrizeById(prizeId);
  if (!prize) {
    throw new ApiError(httpStatus.NOT_FOUND, "Prize not found");
  }
  await prize.remove();
  return prize;
};

module.exports = {
  createPrize,
  queryPrizes,
  getPrizeById,
  updatePrizeById,
  deletePrizeById,
};
