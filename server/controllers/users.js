const User = require("../database/schema/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../database/schema/user");
const JWT_Secret = process.env.JWT_Secret;

const signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const findUser = await User.findOne({ username: username });
    if (findUser) {
      res.status(400).json({ message: "Try Different Username" });
    }
    hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      JWT_Secret
    );
    res.status(200).json({ user: user, token: token });
  } catch (error) {
    console.log(`Error Occured ${error}`);
  }
};

const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if either username or email is provided
    if (!username && !email) {
      return res
        .status(400)
        .json({ message: "Please provide either username or email" });
    }

    let existingUser;

    // Find the user based on username or email
    if (username) {
      existingUser = await User.findOne({ username: username });
    } else {
      existingUser = await User.findOne({ email: email });
    }

    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "Username or email is not registered" });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Credentials is incorrect" });
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
      },
      JWT_Secret
    );

    res.status(200).json({ user: existingUser, token: token });
  } catch (error) {
    console.log(`Error Occurred: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signup, login };
