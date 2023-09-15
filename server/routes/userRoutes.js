const express = require("express");
const router = express.Router();
const { signup, login, verify_user } = require("../controllers/users");


router.post("/signup", signup);
router.post("/login", login);

router.get("/users/:id/verify/:token/", verify_user);

module.exports = router;
