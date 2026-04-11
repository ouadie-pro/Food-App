const jwt = require('jsonwebtoken');

const verifyToken = (request) => {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader) {
    return { error: true, status: 401, message: "Access denied. No token provided." };
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return { error: false, user: decoded };
  } catch (err) {
    return { error: true, status: 400, message: "Invalid token" };
  }
};

module.exports = verifyToken;
