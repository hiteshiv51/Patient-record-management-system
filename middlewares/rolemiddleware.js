exports.authorizeRoles = (roles = []) => {
  // roles can be string or array
  if (typeof roles === 'string') roles = [roles];

  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
    if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden: insufficient role' });
    next();
  };
};
