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
}

module.exports = new EmployeeModel();
