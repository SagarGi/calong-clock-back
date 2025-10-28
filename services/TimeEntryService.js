const TimeEntry = require("../models/TimeEntryModel.js");

class TimeEntryService {
  async createTimeEntry({
    pin_code,
    hour,
    minute,
    day,
    month,
    break_minutes = 0,
  }) {
    // Find employee by pin
    // done for as to foreign key relationship
    const employee = await TimeEntry.findByEmployeePin(pin_code);
    if (!employee) throw new Error("Invalid PIN code");

    const employee_id = employee.id;

    // Calculate total hours as decimal
    const total_hours = hour + minute / 60 - break_minutes / 60;

    // Create time entry using model
    const entryId = await TimeEntry.create(
      employee_id,
      hour,
      minute,
      day,
      month,
      break_minutes,
      total_hours
    );

    return {
      id: entryId,
      employee_id,
      hour,
      minute,
      day,
      month,
      break_minutes,
      total_hours,
    };
  }

  async getEntriesByPin(pin_code) {
    const employee = await TimeEntry.findByEmployeePin(pin_code);
    if (!employee) throw new Error("Invalid PIN code");

    const entries = await TimeEntry.getEntriesByEmployeeId(employee.id);
    return {
      employee_id: employee.id,
      entries,
    };
  }
}

module.exports = new TimeEntryService();
