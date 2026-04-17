// backend/middleware/role.middleware.js
const memberOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role === 'member' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied - member/admin required' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied - admin only' });
  }
};

module.exports = { memberOrAdmin, adminOnly };