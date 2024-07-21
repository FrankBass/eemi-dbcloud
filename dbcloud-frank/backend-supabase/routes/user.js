
const { Router } = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const checkAuth = require("../middlewares/checkAuth");

const router = new Router();

router.post("/register", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    return res.sendStatus(401);
  }
  if (user.password !== req.body.password) {
    return res.sendStatus(401);
  }

  return res.json({
    token: jwt.sign(
      {
        user_id: user.id,
      },
      "secret-key",
      {
        expiresIn: "24h",
      }
    ),
  });
});

router.get("/me", checkAuth(), (req, res) => {
  res.json(req.user);
});

module.exports = router;
