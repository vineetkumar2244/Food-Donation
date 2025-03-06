const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ensure the data directory exists
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

const usersFile = path.join(dataDir, "users.json");

// Load users from JSON file
let users = [];
try {
    if (fs.existsSync(usersFile)) {
        const data = fs.readFileSync(usersFile, "utf8");
        users = JSON.parse(data);
        if (!Array.isArray(users)) users = [];
    } else {
        fs.writeFileSync(usersFile, JSON.stringify([])); // Initialize if not exists
    }
} catch (error) {
    users = [];
}

// Test API
app.get("/", (req, res) => {
    res.send("Food Redistribution API is running!");
});

// Registration route
app.post("/register", (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (!Array.isArray(users)) {
        users = []; // Ensure users is an array
    }

    if (users.some((u) => u.email === email)) {
        return res.status(400).json({ message: "User already exists" });
    }

    const newUser = { name, email, password, role };
    users.push(newUser);

    // Save to users.json in the data folder
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

    res.status(201).json({ message: "Registration successful", user: newUser });
});

// Login route
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    if (!Array.isArray(users)) {
        users = []; // Ensure users is an array
    }

    const user = users.find((u) => u.email === email && u.password === password);
    
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
