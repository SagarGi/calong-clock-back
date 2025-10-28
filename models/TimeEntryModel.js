const db = require("../config/db.js");
class TimeEntry {
  async create(
    employee_id,
    hour,
    minute,
    day,
    month,
    break_minutes,
    total_hours
  ) {
    const result = await db.query(
      `INSERT INTO time_entries (employee_id, hour, minute, day, month, break_minutes ,total_hours)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [employee_id, hour, minute, day, month, break_minutes, total_hours]
    );
    return result.insertId;
  }

  async findByEmployeePin(pin_code) {
    const [employee] = await db.query(
      "SELECT id FROM employees WHERE pin_code = ?",
      [pin_code]
    );
    return employee || null;
  }

  async getEntriesByEmployeeId(employee_id) {
    const rows = await db.query(
      `SELECT hour, minute, day, month, break_minutes, total_hours, created_at
       FROM time_entries
       WHERE employee_id = ?`,
      [employee_id]
    );
    return rows;
  }
}

module.exports = new TimeEntry();
