module.exports = (req, res, next) => {
  // 🔥 safety check (important)
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  // 🔐 role check
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied"
    });
  }

  next();
};