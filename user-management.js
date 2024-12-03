const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory storage for users
const users = [];

// Register a new user
app.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
    }

    users.push({ username, password });
    res.status(201).json({ message: "User registered successfully" });
});

// Get password (for demonstration purposes)
app.get("/get-password/:username", (req, res) => {
    const { username } = req.params;

    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.json({ username: user.username, password: user.password });
});

// Login
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({ message: "Login successful", username: user.username });
});

// Start the server
app.listen(port, () => {
    console.log(`User management API running on http://localhost:${port}`);
});
