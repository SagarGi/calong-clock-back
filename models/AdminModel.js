const db = require("../config/db.js");
class AdminModel {
  async findById(id) {
    const rows = await db.query("SELECT * FROM admins WHERE id = ?", [id]);
    return rows[0];
  }

  async findByUsername(username) {
    const rows = await db.query("SELECT * FROM admins WHERE username = ?", [
      username,
    ]);
    return rows[0];
  }

  async updatePassword(id, newHashedPassword) {
    await db.query("UPDATE admins SET password = ? WHERE id = ?", [
      newHashedPassword,
      id,
    ]);
  }
}

module.exports = new AdminModel();
