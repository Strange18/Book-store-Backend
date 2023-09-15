const User = require("../database/schema/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../database/schema/user");
const verification_token = require("../database/schema/token");
const mailSender = require("../helpers/send_email");
const crypto = require("crypto");
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

    const email_verification_token = await new verification_token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `${process.env.BASE_URL}/users/${user.id}/verify/${email_verification_token.token}`;
    await mailSender(user.email, "Verify Email", url);

    res
      .status(201)
      .send({ message: "An Email sent to your account please verify" });
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

const verify_user = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    console.log(user);
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    console.log(token);
    if (!token) return res.status(400).send({ message: "Invalid link" });

    await User.findOneAndUpdate({ _id: user._id }, { verified: true });
    const token_delete = await Token.deleteOne({ _id: token._id });

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { signup, login,verify_user };
