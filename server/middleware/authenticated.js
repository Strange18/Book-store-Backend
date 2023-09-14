const jwt = require("jsonwebtoken");
const JWT_Secret = process.env.JWT_Secret;

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, JWT_Secret);
      res.id = user.id;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized User" });
    }
  } catch (error) {
    console.log(`Error Occurred: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
