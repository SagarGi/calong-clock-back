const db = require("../config/db.js");
const bcrypt = require("bcrypt");

class AdminService {
  async authenticate(username, password) {
    try {
      const rows = await db.query("SELECT * FROM admins WHERE username = ?", [
        username,
      ]);
      if (rows.length === 0) {
        return { success: false, message: "Admin not found" };
      }

      const admin = rows[0];
      const matchPassword = await bcrypt.compare(password, admin.password);
      if (!matchPassword) {
        return { success: false, message: "Invalid password" };
      }

      return {
        success: true,
        admin: {
          id: admin.id,
          username: admin.username,
        },
      };
    } catch (err) {
      throw new Error("Authentication failed: " + err.message);
    }
  }
}

module.exports = new AdminService();
