const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server is Running to Accept API Requests");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
