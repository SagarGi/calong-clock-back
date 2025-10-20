const db = require("../config/db.js");
class EmployeeModel {
  async create(firstName, lastName, gender, nationality, pinCode) {
    const result = await db.query(
      "INSERT INTO employees (first_name, last_name, gender, nationality, pin_code) VALUES (?, ?, ?, ?, ?)",
      [firstName, lastName, gender, nationality, pinCode]
    );
    return result.insertId;
  }

  async findByPin(pinCode) {
    const rows = await db.query("SELECT * FROM employees WHERE pin_code = ?", [
      pinCode,
    ]);
    return rows[0];
  }

  async findAll() {
    return await db.query("SELECT * FROM employees ORDER BY created_at DESC");
  }

  async delete(id) {
    await db.query("DELETE FROM employees WHERE id = ?", [id]);
  }

  // pin cannot be updated to maintain integrity of time entries
  async update(id, firstName, lastName, gender, nationality, position) {
    await db.query(
      "UPDATE employees SET first_name = ?, last_name = ?, gender = ?, nationality = ?, position = ? WHERE id = ?",
      [firstName, lastName, gender, nationality, position, id]
    );
  }

  async findById(id) {
    const rows = await db.query("SELECT * FROM employees WHERE id = ?", [id]);
    return rows[0];
  }
}

module.exports = new EmployeeModel();
