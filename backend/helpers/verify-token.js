const jwt = require("jsonwebtoken");
const getToken = require("./get-token");
//Token validation middleware
const verifyToken = (req, res, next) => {
  const token = getToken(req);

  if (!token) {
    res.status(401).json({ message: "Acesso negado." });
    return;
  }

  try {
    const verified = jwt.verify(token, "Segr3doD0token");
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Token inválido." });
  }
};

module.exports = verifyToken;
