const TimeEntryService = require("../services/TimeEntryService.js");
class TimeEntryController {
  async createTimeEntry(req, res) {
    try {
      const { pin_code, hour, minute, day, month } = req.body;

      if (!pin_code || !hour || !minute || !day || !month) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const result = await TimeEntryService.createTimeEntry({
        pin_code,
        hour,
        minute,
        day,
        month,
      });

      res.status(201).json({
        message: "Time entry created successfully",
        data: result,
      });
    } catch (error) {
      console.error("Error creating time entry:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }

  async getEntriesByPin(req, res) {
    try {
      const { pin_code } = req.params;
      if (!pin_code)
        return res.status(400).json({ message: "PIN code is required" });

      const result = await TimeEntryService.getEntriesByPin(pin_code);
      res
        .status(200)
        .json({ message: "Time entries fetched successfully", data: result });
    } catch (error) {
      console.error("Error fetching time entries:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
}

module.exports = new TimeEntryController();
