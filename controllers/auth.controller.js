const jwt = require("jsonwebtoken");
const { Users } = require("../models/");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

  const user = await Users.findOne({
    where: {
      email,
      password,
    },
  });
  if (!user) return res.status(400).json({ message: "Your email/password is wrong!" });

  jwt.sign({ fullname: user.fullname, email, password }, "secret", { expiresIn: "1h" }, (err, token) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        user,
        message: err,
      });
    }

    res.setHeader("Authorization", `Bearer ${token}`);

    return res.status(200).json({
      message: "User login!",
      user,
    });
  });
};

module.exports = { loginUser };
