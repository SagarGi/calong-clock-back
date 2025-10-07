const express = require("express");
const cors = require("cors");
const db = require("./config/db");
require("dotenv").config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server is Running to Accept API Requests");
});

// testing database connection
async function testDatabaseConnection() {
  try {
    const result = await db.query("SELECT NOW() AS currentTime");
    console.log("✅ Database connected successfully!");
    console.log("Current Time from DB:", result[0].currentTime);
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
}

app.get("/database", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW() AS currentTime");
    res.send(
      "Database is also running, Current time: " + result[0].currentTime
    );
  } catch (error) {
    res.status(500).json({ error: "Database is not connected!" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
