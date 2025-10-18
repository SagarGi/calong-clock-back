const express = require("express");

const AdminController = require("../controller/AdminController.js");
const verifyAdminToken = require("../middleware/authMiddleware.js");
const router = express.Router();

// Admin login route
router.post("/login", (req, res) => AdminController.login(req, res));

// Sample protected route
router.get("/dashboard", verifyAdminToken, (req, res) => {
  res.json({
    success: true,
    message: `Welcome ${req.admin.username} to the dashboard`,
  });
});

module.exports = router;
