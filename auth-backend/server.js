const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');

const app = express();
const port = process.env.port || 7777;

app.use(express.json());
app.use(cors());

const mongo = require('./db/db');

app.listen(port, () => {
     console.log(`Listening on ${port}`);
})

app.post('/api/signup', async (req, res) => {
     try {
          const { email, password } = req.body;
          const existingUser = await User.findOne({ email });
          if (existingUser) {
               return res.status(500).json({ message: "Email already exists" });
          }
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = new User({ email, password: hashedPassword })
          await newUser.save();
          res.status(201).json({ message: "User created successfully" });
     }
     catch (err) {
          console.log("Error during signup", err);
          res.status(500).json({ message: "Error" });
     }
})
app.post('/api/signin', async (req, res) => {
     try {
          const { email, password } = req.body;
          const user = await User.findOne({ email });
          if (!user) {
               return res.status(400).json({ message: "Invalid email or password" });
          }
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
               return res.status(400).json({ message: "Invalid email or password" });
          }
          const token = jwt.sign({
               userId: user._id,
               email: user.email
          }, process.env.JWT_SECRET, ({
               expiresIn: "1hr"
          }));
          res.json({ token, user: { email: user.email } });
     }
     catch (err) {
          console.log("Error during signin", err);
          res.status(500).json({ message: 'Error' });
     }
})

function authenticateToken(req, res, next) {
     const authHeader = req.headers['authorization'];
     const token = authHeader && authHeader.split(' ')[1];
     if (!token) {
          return res.status(401).json({ message: 'No token provided, Authorization denided' });
     }
     try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.user = decoded;
          next();
     }
     catch (err) {
          return res.status(403).json({ message: "Inavlid or expired token" })
     }
}

app.get('/api/profile', authenticateToken, async (req, res) => {
     try {
          const userId = req.user.userId;
          const user = await User.findById(userId).select('-password');
          if (!user) {
               return res.status(404).json({ message: "User not found" });
          }
          return res.json({ user })
     }
     catch (err) {
          console.log("Error fetching profile", err);
          return res.status(500).json({ message: "Server error" })
     }
})