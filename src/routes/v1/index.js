const express = require("express");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const prizeRoute = require("./prize.route");
const contestRoute = require("./contest.route");
const joinRoute = require("./join.route");
const docsRoute = require("./docs.route");
const config = require("../../config/config");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/prizes",
    route: prizeRoute,
  },
  {
    path: "/contest",
    route: contestRoute,
  },
  {
    path: "/join",
    route: joinRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: "/docs",
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
