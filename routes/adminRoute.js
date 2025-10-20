const express = require("express");

const AdminController = require("../controller/AdminController.js");
const verifyAdminToken = require("../middleware/authMiddleware.js");
const router = express.Router();

// Admin login route
router.post("/login", (req, res) => AdminController.login(req, res));

// Sample protected route example
router.get("/dashboard", verifyAdminToken, (req, res) => {
  res.json({
    success: true,
    message: `Welcome ${req.admin.username} to the dashboard`,
  });
});

// update or change password route
router.post("/change-password", verifyAdminToken, (req, res) =>
  AdminController.changePassword(req, res)
);

// Create calong employee (Admin only)
router.post("/employees", verifyAdminToken, (req, res) =>
  AdminController.createEmployee(req, res)
);

// Update employee
router.put("/employees/:id", verifyAdminToken, (req, res) =>
  AdminController.updateEmployee(req, res)
);

// Delete employee
router.delete("/employees/:id", verifyAdminToken, (req, res) =>
  AdminController.deleteEmployee(req, res)
);

// Get all employees
router.get("/employees", verifyAdminToken, (req, res) =>
  AdminController.getAllEmployees(req, res)
);

// Get employee by pin
router.get("/employees/pin/:pin_code", verifyAdminToken, (req, res) =>
  AdminController.getEmployeeByPin(req, res)
);

module.exports = router;
