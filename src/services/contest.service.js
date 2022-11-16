const httpStatus = require("http-status");
const { Contest } = require("../models");
const { Prize } = require("../models");
const ApiError = require("../utils/ApiError");

const createContest = async (contestBody) => {
  return Contest.create(contestBody);
};

const queryContests = async (filter, options) => {
  const contests = await Contest.paginate(filter, options);
  const prizes = await Prize.find({});
  return { contests, prizes };
};

const getAllContest = async () => {
  const contests = await Contest.find({}).select("-code_list");
  return contests;
};

const compareDate = (date) => {
  const currentDate = new Date().getTime;
  const endDate = new Date(date).getTime;
  if (endDate < currentDate) {
    return false;
  } else {
    return true;
  }
};

const checkContests = async () => {
  const allContest = await Contest.find({}).select("-code_list");
  const activeContest = allContest.find((v) => compareDate(v.end_date));
};

const getContestById = async (id) => {
  return Contest.findById(id);
};

const updateContestById = async (contestId, updateBody) => {
  const contest = await getContestById(contestId);
  if (!contest) {
    throw new ApiError(httpStatus.NOT_FOUND, "Prize not found");
  }

  Object.assign(contest, updateBody);
  await contest.save();
  return contest;
};

// const deletePrizeById = async (prizeId) => {
//   const prize = await getPrizeById(prizeId);
//   if (!prize) {
//     throw new ApiError(httpStatus.NOT_FOUND, "Prize not found");
//   }
//   await prize.remove();
//   return prize;
// };

module.exports = {
  createContest,
  queryContests,
  getAllContest,
  updateContestById,
  getContestById,
};
