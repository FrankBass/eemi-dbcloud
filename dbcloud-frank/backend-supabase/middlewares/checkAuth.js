const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = function (options = {}) {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      if (options.block === false) return next();
      return res.sendStatus(401);
    }
    const [type, token] = authHeader.split(" ");
    if (type !== "Bearer") {
      if (options.block === false) return next();
      return res.sendStatus(401);
    }
    try {
      const userFromToken = jwt.verify(token, "secret-key");
      const user = await User.findByPk(userFromToken.user_id);
      req.user = user;
      next();
    } catch (error) {
      return res.sendStatus(401);
    }
  };
};
