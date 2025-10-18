const express = require("express");

const AdminController = require("../controller/AdminController.js");
const router = express.Router();

// Admin login route
router.post("/login", (req, res) => AdminController.login(req, res));

module.exports = router;
