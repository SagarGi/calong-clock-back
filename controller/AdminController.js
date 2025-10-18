const AdminService = require("../services/AdminService.js");

class AdminController {
  async login(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ success: false, message: "Username and password required" });
      }

      const result = await AdminService.authenticate(username, password);

      if (!result.success) {
        return res.status(401).json(result);
      }

      res.json({
        success: true,
        message: "Login successful",
        admin: result.admin,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}
module.exports = new AdminController();
