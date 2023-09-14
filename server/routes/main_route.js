const express = require("express");
const User = require("../database/schema/user");
const { signup, login } = require("../controllers/users");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hey");
});

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
