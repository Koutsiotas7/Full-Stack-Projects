const jwt = require('jsonwebtoken');


// ==========================
// VERIFY TOKEN MIDDLEWARE
// ==========================
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const token = authHeader.split(" ")[1]; // Bearer TOKEN
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified; // attach user info to request
    next();

  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};


// ==========================
// ADMIN ONLY MIDDLEWARE
// ==========================
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  next();
};


module.exports = {
  authMiddleware,
  adminMiddleware
};
