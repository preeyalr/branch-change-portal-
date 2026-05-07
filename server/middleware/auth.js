const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // 🔥 GET TOKEN FROM COOKIE (NOT HEADERS)
    const token = req.cookies.token;

    console.log("TOKEN FROM COOKIE:", token);

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, "secretkey");

    req.user = decoded;

    next();

  } catch (err) {
    console.log("AUTH ERROR:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};