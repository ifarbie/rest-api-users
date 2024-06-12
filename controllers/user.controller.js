const { Users } = require("../models");

const getUsers = async (req, res) => {
  const users = await Users.findAll();

  if (!users) return res.status(404).json({ message: "Users are empty" });

  return res.status(200).json({
    users,
  });
};

const getUserById = async (req, res) => {
  const user = await Users.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!user) return res.status(404).json({ message: "User not found" });

  return res.status(200).json({
    user,
  });
};

const createUser = async (req, res) => {
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    return res.status(400).json({
      message: "fullname, email, and password are required",
    });
  }

  const existEmail = await Users.findOne({ where: { email } });
  if (existEmail) {
    return res.status(400).json({
      message: "Email already exist",
    });
  }

  const data = await Users.create({
    id: crypto.randomUUID(),
    fullname,
    email,
    password,
  });

  return res.status(201).json({
    message: "User created successfully",
    data,
  });
};

const deleteUser = async (req, res) => {
  const data = await Users.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!data) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  data.destroy();
  return res.status(200).json({
    message: "This user has been deleted:",
    data,
  });
};

const editUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  if (fullname || email || password) {
    const prevData = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!prevData) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (fullname) prevData.fullname = fullname;
    if (email) {
      const existEmail = await Users.findOne({ where: { email: email } });
      if (existEmail && prevData.email !== email) {
        return res.status(400).json({
          message: "Email already exist",
        });
      }
      prevData.email = email;
    }
    if (password) prevData.password = password;
    prevData.save();

    return res.status(200).json({
      message: "User updated",
      data: prevData,
    });
  }

  return res.status(400).json({
    message: "fullname, email, or password are required",
  });
};

module.exports = { getUsers, getUserById, createUser, deleteUser, editUser };
