const db = require("../config/db.js");

class DatabaseInitializer {
  constructor(database) {
    this.db = database;
  }

  async initializeTables() {
    console.log("🔹 Initializing database tables...");

    await this.createAdminTable();
    await this.createEmployeeTable();
    await this.createTimeEntryTable();

    console.log("✅ Database initialization complete!");
  }

  async createAdminTable() {
    try {
      await this.db.query(`
        CREATE TABLE IF NOT EXISTS admins (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(50) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log("✅ 'Admins' table ready");
    } catch (err) {
      console.error("❌ Failed to create 'admins' table:", err.message);
    }
  }

  async createEmployeeTable() {
    try {
      await db.query(`
      CREATE TABLE IF NOT EXISTS employees (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        gender VARCHAR(10) NOT NULL,
        nationality VARCHAR(100) NOT NULL,
        pin_code VARCHAR(4) UNIQUE NOT NULL,
        position VARCHAR(100) NOT NULL DEFAULT 'Employee',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
      console.log("✅ 'Employee' table ready");
    } catch (err) {
      console.error("❌ Failed to create 'employees' table:", err.message);
    }
  }

  async createTimeEntryTable() {
    try {
      await this.db.query(`
        CREATE TABLE IF NOT EXISTS time_entries (
          id INT AUTO_INCREMENT PRIMARY KEY,
          employee_id INT NOT NULL,
          start_time DATETIME NOT NULL,
          end_time DATETIME,
          FOREIGN KEY (employee_id) REFERENCES employees(id)
        )
      `);
      console.log("✅ 'Time Entry' table ready");
    } catch (err) {
      console.error("❌ Failed to create 'time_entries' table:", err.message);
    }
  }
}

module.exports = new DatabaseInitializer(db);
