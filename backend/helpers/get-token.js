const getToken = (req) => {
  const authHeader = req.headers.authorization;
  let token;

  if (authHeader) {
    token = authHeader.split(" ")[1];
  } else {
    token = null;
  }

  return token;
};

module.exports = getToken;
