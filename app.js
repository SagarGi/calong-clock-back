const express = require("express");
const cors = require("cors");
const db = require("./config/db.js");
const dbInitializer = require("./scripts/dbseed.js");
const adminRoute = require("./routes/adminRoute.js");
const timeEntryRoute = require("./routes/timeEntryRoute.js");
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
    console.error("❌ Database connection failed:", error.message);
    res
      .status(500)
      .json({ error: `Database is not connected! ${error.message}` });
  }
});

const PORT = process.env.PORT || 5000;
dbInitializer.initializeTables().then(() => {
  app.use("/api/admin", adminRoute);
  app.use("/api/time", timeEntryRoute);
  app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
  });
});
