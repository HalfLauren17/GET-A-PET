const jwt = require("jsonwebtoken");
const User = require("../models/User");

const getUserByToken = async (token) => {
  if (!token) {
    return res.status(401).json({ message: "Acesso negado." });
  }

  const decoded = jwt.verify(token, "Segr3doD0token");
  const userId = decoded.id;

  const user = await User.findById(userId);

  return user;
};

module.exports = getUserByToken;
