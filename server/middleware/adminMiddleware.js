module.exports = (req, res, next) => {
    if (req.user && req.user.is_admin) {
      next();
    } else {
      res.status(403).json({ error: 'Access denied' });
    }
  };