const jwt = require("jsonwebtoken");

const loginUser = (req, res) => {
  // FAKE DATA
  const user = {
    email: "test@example.com",
    password: "test",
  };
  const { email, password } = req.body;
  if (user.email === email && user.password === password) {
    jwt.sign(user, "secret", (err, token) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: err,
        });
      }
      const Token = token;
      return res.status(200).json({    
        token: Token,
      });
    });
  } else {      // Jika tidak menggunakan else, kode dibawah tetap running
    return res.status(400).json({
      message: "Login failed",
    });
  }
};

module.exports = { loginUser };
