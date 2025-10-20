const AdminService = require("../services/AdminService.js");

class AdminController {
  async login(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ success: false, message: "Username and password required" });
      }

      const result = await AdminService.authenticate(username, password);

      if (!result.success) {
        return res.status(401).json(result);
      }

      res.json({
        success: true,
        message: "Login successful",
        admin: result.admin,
        token: result.token,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const adminId = req.admin.id;

      await AdminService.changePassword(adminId, oldPassword, newPassword);

      res.json({ success: true, message: "Password updated successfully" });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async createEmployee(req, res) {
    try {
      const { first_name, last_name, gender, nationality, position } = req.body;

      const employee = await AdminService.createEmployee(
        first_name,
        last_name,
        gender,
        nationality,
        position
      );

      res.status(201).json({
        success: true,
        message: "Calong employee created successfully",
        employee,
      });
    } catch (err) {
      console.error("Error creating employee:", err.message);
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async updateEmployee(req, res) {
    try {
      const { id } = req.params;
      const { first_name, last_name, gender, nationality, position } = req.body;

      const employee = await AdminService.updateEmployee(
        id,
        first_name,
        last_name,
        gender,
        nationality,
        position
      );
      res.json({
        success: true,
        message: "Employee updated successfully",
        employee,
      });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async deleteEmployee(req, res) {
    try {
      const { id } = req.params;
      const result = await AdminService.deleteEmployee(id);
      res.json({ success: true, message: result.message });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async getAllEmployees(req, res) {
    try {
      const employees = await AdminService.getAllEmployees();
      res.json({ success: true, employees });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getEmployeeByPin(req, res) {
    try {
      const { pin_code } = req.params;
      const employee = await AdminService.getEmployeeByPin(pin_code);
      res.json({ success: true, employee });
    } catch (err) {
      res.status(404).json({ success: false, message: err.message });
    }
  }
}
module.exports = new AdminController();
