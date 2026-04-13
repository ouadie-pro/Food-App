const jwt = require('jsonwebtoken');

const verifyToken = (request) => {
  const authHeader = request.headers.get('authorization');
  console.log('Auth header received:', authHeader);
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { error: true, status: 401, message: "Access denied. No token provided." };
  }

  const token = authHeader.split(" ")[1];
  console.log('Token extracted:', token);

  if (!token) {
    return { error: true, status: 401, message: "Access denied. No token provided." };
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log('Token decoded:', decoded);
    return { error: false, user: decoded };
  } catch (err) {
    console.log('Token verification error:', err.message);
    return { error: true, status: 400, message: "Invalid token" };
  }
};

module.exports = verifyToken;
