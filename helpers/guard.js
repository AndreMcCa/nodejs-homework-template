const passport = require("passport");
require("../config/passports");

const {HttpCode} = require("./constants");

const guard = (req, res, next) => {
  passport.authenticate("jwt", {session: false}, (err, user) => {
    const INDEX_TOKEN = 1;
    const token = req.get("Authorization")?.split(" ")[INDEX_TOKEN];
    if (!user || err || token !== user.token) {
      return res.status(HttpCode.FORBIDDEN).json({
        status: "error",
        code: HttpCode.FORBIDDEN,
        data: "Forbidden",
        message: "Access is denied",
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = guard;
