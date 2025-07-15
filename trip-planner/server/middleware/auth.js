const jwt = require('jsonwebtoken');
const { isBlacklisted } = require('../utils/blacklist');

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  // בדוק אם הטוקן חסום
  if (isBlacklisted(token)) {
    return res.status(401).json({ message: 'Token has been blacklisted. Please login again.' });
  }

  try {
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};
