const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
  // Register a new user
  async register(req, res) {
    try {
      const { username, email, password, role } = req.body;
      console.log(1, username,email, password, role);

      // Optional: Add role validation or restrictions here
      if (role !== 'user') {
        return res.status(400).json({ message: "Invalid role specified" });
      }
      console.log(2, username,email, password, role);
      
      const existingUser = await User.findOne({ where: { username } });
      console.log(3,username,email, password, role);

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await User.create({ username, email, password: hashedPassword, role });

      const token = jwt.sign({ userId: newUser.id, role: newUser.role }, process.env.JWT_SECRET, {
        expiresIn: "10h",
      });

      res.status(201).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }

  // Login user
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });//thisss

      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "10h",
      });

      // Optionally add role-specific logic here if needed
      if (user.role === 'admin') {
        // Additional admin-specific actions or logs
        console.log('Admin logged in:', user.username);
      }

      res.status(200).json({ 
        message: "Login successful",
        token,
        role: user.role  // Include role in the response if needed
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error", error });
    }
  }
}

module.exports = new UserController();
