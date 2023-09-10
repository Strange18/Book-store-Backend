const express = require("express");
const User = require("../database/schema/user");
// const Book = require("../database/schema/books");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hey");
});

router.post("/user", async (req, res) => {
  try {
    // let { name, email, password } = req.body;
    console.log(req.body);
    const user = await User.create({
      name: name,
      email: email,
      password: password,
    });
    res.status(200).send({ message: "done" });
  } catch (error) {
    console.log(`Error Occured ${error}`);
  }
});

module.exports = router;
