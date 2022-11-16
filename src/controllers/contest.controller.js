const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { contestService } = require("../services");

const createContest = catchAsync(async (req, res) => {
  const uniqueNumber = (length) => {
    let min = 0000000000;
    let max = 9999999999;
    let numbers = [];
    for (let i = 0; i < length; i++) {
      const number = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!numbers.includes(number)) {
        numbers.push(number);
      } else {
        const number = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!numbers.includes(number)) {
          numbers.push(number);
        } else {
          const number = Math.floor(Math.random() * (max - min + 1)) + min;
          if (!numbers.includes(number)) {
            numbers.push(number);
          }
        }
      }
    }

    //console.log(numbers.length);
    return JSON.stringify(numbers);
  };

  const contest = await contestService.createContest({
    ...req.body,
    code_list: uniqueNumber(req.body.code_list),
  });
  res.status(httpStatus.CREATED).send(contest);
});

const getContests = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await contestService.queryContests(filter, options);
  res.send(result);
});
const getAllContest = catchAsync(async (req, res) => {
  const result = await contestService.getAllContest();
  res.send(result);
});

const getContest = catchAsync(async (req, res) => {
  const contest = await contestService.getContestById(req.params.contestId);
  if (!contest) {
    throw new ApiError(httpStatus.NOT_FOUND, "Contest not found");
  }
  res.send(contest);
});

const updateContest = catchAsync(async (req, res) => {
  const contest = await contestService.updateContestById(
    req.params.contestId,
    req.body
  );
  res.send(contest);
});

// const deletePrize = catchAsync(async (req, res) => {
//   await prizeService.deletePrizeById(req.params.prizeId);
//   res.status(httpStatus.NO_CONTENT).send();
// });

module.exports = {
  createContest,
  getContests,
  getAllContest,
  updateContest,
  getContest,
};
