const express = require("express");
const User = require("../database/schema/user");
const { signup, login, verify_user } = require("../controllers/users");
const Token = require("../database/schema/token");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hey");
});

router.post("/signup", signup);
router.post("/login", login);

router.get("/users/:id/verify/:token/", verify_user);

module.exports = router;
