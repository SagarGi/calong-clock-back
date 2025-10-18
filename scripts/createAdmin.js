const bcrypt = require("bcrypt");
const crypto = require("crypto");
const db = require("../config/db.js");
require("dotenv").config();

async function main() {
  try {
    console.log("✅ Connected to MySQL database.");

    // Check if an admin already exists
    const rows = await db.query("SELECT COUNT(*) AS count FROM admins");
    if (rows[0].count >= process.env.NO_OF_ADMINS) {
      console.log(
        "⚠️ Admin already exists! Aborting.\n" +
          "❌Cannot have more than 1 Admins for this application."
      );
      return
    }

    // Generate random username and password
    const username = "calong_" + crypto.randomBytes(3).toString("hex");
    const password = crypto.randomBytes(6).toString("hex");

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new admin into the database
    await db.query("INSERT INTO admins (username, password) VALUES (?, ?)", [
      username,
      hashedPassword,
    ]);

    console.log("\n✅ Calong admin created successfully!");
    console.log("========================================");
    console.log(`👤 Username: ${username}`);
    console.log(`🔑 Password: ${password}`);
    console.log("========================================");
    console.log(
      "Now you can log in to Calong Clock as an admin using these credentials."
    );
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
  } finally {
    await db.pool.end();
  }
}

main();
