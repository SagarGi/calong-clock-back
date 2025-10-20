const db = require("../config/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminModel = require("../models/AdminModel.js");
const EmployeeModel = require("../models/EmployeeModel.js");
require("dotenv").config();

class AdminService {
  async authenticate(username, password) {
    try {
      const rows = AdminModel.findByUsername(username);
      if (rows.length === 0) {
        return { success: false, message: "Admin not found" };
      }

      const admin = rows[0];
      const matchPassword = await bcrypt.compare(password, admin.password);
      if (!matchPassword) {
        return { success: false, message: "Invalid password" };
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: admin.id, username: admin.username },
        process.env.JWT_SECRET || "your_jwt_secret",
        { expiresIn: "8h" } // token valid for 8 hours
      );

      return {
        success: true,
        admin: {
          id: admin.id,
          username: admin.username,
        },
        token,
      };
    } catch (err) {
      throw new Error("Authentication failed: " + err.message);
    }
  }

  async changePassword(req, res) {
    try {
      const adminId = req.admin.id; // from verified JWT token
      const { oldPassword, newPassword } = req.body;

      if (!oldPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: "Old and new passwords are required",
        });
      }

      const admin = await AdminModel.findById(adminId);
      if (!admin) {
        return res
          .status(404)
          .json({ success: false, message: "Admin not found" });
      }

      const isMatch = await bcrypt.compare(oldPassword, admin.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, message: "Old password is incorrect" });
      }

      const hashed = await bcrypt.hash(newPassword, 10);
      await AdminModel.updatePassword(adminId, hashed);

      res.json({ success: true, message: "Password updated successfully" });
    } catch (err) {
      console.error("Error changing password:", err.message);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  async createEmployee(firstName, lastName, gender, nationality, position) {
    if (!firstName || !lastName || !gender || !nationality || !position) {
      throw new Error("All fields are required");
    }
    // Generate unique 4-digit pin for each employee registered
    let pinCode;
    let existing;
    do {
      pinCode = crypto.randomInt(1000, 9999).toString();
      existing = await EmployeeModel.findByPin(pinCode);
    } while (existing);

    const id = await EmployeeModel.create(
      firstName,
      lastName,
      gender,
      nationality,
      pinCode,
      position
    );

    return { id, firstName, lastName, gender, nationality, pinCode, position };
  }

  async updateEmployee(id, firstName, lastName, gender, nationality, position) {
    const employee = await EmployeeModel.findById(id);
    if (!employee) throw new Error("Employee not found");

    await EmployeeModel.update(
      id,
      firstName,
      lastName,
      gender,
      nationality,
      position
    );
    return { id, firstName, lastName, gender, nationality, position };
  }

  async deleteEmployee(id) {
    const employee = await EmployeeModel.findById(id);
    if (!employee) throw new Error("Employee not found");

    await EmployeeModel.delete(id);
    return { message: "Employee deleted successfully" };
  }

  async getAllEmployees() {
    return await EmployeeModel.findAll();
  }

  async getEmployeeByPin(pinCode) {
    const employee = await EmployeeModel.findByPin(pinCode);
    if (!employee) throw new Error("Employee not found with that pin code");
    return employee;
  }
}

module.exports = new AdminService();
