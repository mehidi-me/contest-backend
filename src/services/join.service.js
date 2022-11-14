const httpStatus = require("http-status");
const { Join, User, Contest, Prize } = require("../models");
const ApiError = require("../utils/ApiError");

const createJoin = async (joinBody) => {
  return Join.create(joinBody);
};

const getOneJoin = async (v) => {
  return Join.findOne({ contest_id: v.contestId, site_user_id: v.userId });
};
const getOneJoin2 = async (v) => {
  const join = await Join.findOne({
    ticket_id: v.contestId,
    user_id: v.userId,
  });
  if (!join) {
    throw new ApiError(httpStatus.NOT_FOUND, "not found");
  }
  const user = await User.findById(join.site_user_id);
  return { join, user };
};

const getJoinAll = async (v) => {
  const joins = await Join.find({ contest_id: v });

  const contest = await Contest.findOne({ _id: v });

  const prizes = await Prize.find({ _id: { $in: contest.other_prize_ids } });

  const user_ids = [];
  joins.map((v) => {
    user_ids.push(v.site_user_id);
  });
  const users = await User.find({ _id: { $in: user_ids } });
  return { joins, users, contest, prizes };
};

// const queryPrizes = async (filter, options) => {
//   const prizes = await Prize.paginate(filter, options);
//   return prizes;
// };

const getJoinById = async (id) => {
  return Join.findById(id);
};

const updateJoinById = async (joinId, updateBody) => {
  const join = await getJoinById(joinId);
  if (!join) {
    throw new ApiError(httpStatus.NOT_FOUND, "Join not found");
  }

  Object.assign(join, updateBody);
  await join.save();
  return join;
};

const deletejoinById = async (joinId) => {
  const join = await getJoinById(joinId);
  if (!join) {
    throw new ApiError(httpStatus.NOT_FOUND, "Join not found");
  }
  await join.remove();
  return join;
};

module.exports = {
  createJoin,
  getOneJoin,
  getOneJoin2,
  getJoinAll,
  updateJoinById,
  deletejoinById,
};
