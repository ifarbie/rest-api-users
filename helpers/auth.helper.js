const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  //   const { bearer } = req.headers;
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization header missing or invalid" });
  }
  const token = authorization.split(" ")[1];
  jwt.verify(token, "secret", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
    req.body = data;
    next();
  });
};

module.exports = { verifyUser };
