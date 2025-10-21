const express = require("express");
const router = express.Router();
const TimeEntryController = require("../controller/TimeEntryController.js");

// Create a new time entry for the employee to track time
router.post("/create-entry", (req, res) =>
  TimeEntryController.createTimeEntry(req, res)
);
// Get all time entries for an employee by PIN
router.get("/get-entries/:pin_code", (req, res) =>
  TimeEntryController.getEntriesByPin(req, res)
);

module.exports = router;
