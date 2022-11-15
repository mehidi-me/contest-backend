const httpStatus = require("http-status");
const { OAuth2Client } = require("google-auth-library");
const catchAsync = require("../utils/catchAsync");
const {
  authService,
  userService,
  tokenService,
  emailService,
} = require("../services");
const ApiError = require("../utils/ApiError");

const client_cer =
  "95178071516-tjgbc4t1kt5qasgioblc2f5aglftm2aj.apps.googleusercontent.com";

const client = new OAuth2Client(client_cer);

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const googleLogin = catchAsync(async (req, res) => {
  const { accessToken } = req.body;

  const responce = await client.verifyIdToken({
    idToken: accessToken,
    audience: client_cer,
  });
  const { name, email, email_verified } = responce.payload;
  if (!email_verified)
    throw new ApiError(httpStatus.NOT_FOUND, "Email not verified!");

  const isRegister = await userService.getUserByEmail(email);
  if (isRegister) {
    const user = await authService.loginUserWithEmail(email);
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({ user, tokens });
  } else {
    const user = await userService.createUser({
      name,
      email,
      password: "fklsdjfdslkfjdslkfjdswilfewirh4eoifcdndsndf",
    });
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens });
  }
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    req.body.email
  );
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(
    req.user
  );
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  googleLogin,
};
