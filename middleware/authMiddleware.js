const jwt = require("jsonwebtoken");

function verifyAdminToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token)
    return res.status(401).json({ success: false, message: "Token missing" });

  jwt.verify(
    token,
    process.env.JWT_SECRET || "your_jwt_secret",
    (err, decoded) => {
      if (err)
        return res
          .status(403)
          .json({ success: false, message: "Invalid token" });

      req.admin = decoded; // attach admin info to request
      next();
    }
  );
}

module.exports = verifyAdminToken;
