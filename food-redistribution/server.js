const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;
const usersFile = "./data/users.json";

// Root Route to check if server is running
app.get("/", (req, res) => {
    res.send("Food Redistribution API is running!");
});

// Sign Up Route
app.post("/register", (req, res) => {
    const { name, email, password, role } = req.body; // role: 'donor' or 'ngo'

    const users = JSON.parse(fs.readFileSync(usersFile));

    if (users.some(user => user.email === email)) {
        return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = { id: uuidv4(), name, email, password, role };
    users.push(newUser);

    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

    res.json({ message: "User registered successfully!" });
});

// Login Route
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const users = JSON.parse(fs.readFileSync(usersFile));

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
