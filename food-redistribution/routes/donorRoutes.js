const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const foodFilePath = path.join(__dirname, "../data/foodListings.json");

// Load existing food listings
let foodListings = [];
try {
    if (fs.existsSync(foodFilePath)) {
        foodListings = JSON.parse(fs.readFileSync(foodFilePath, "utf8"));
    }
} catch (error) {
    foodListings = [];
}

// ✅ Add food listing
router.post("/add", (req, res) => {
    const { donorName, foodName, quantity, expiryDate, location } = req.body;

    if (!donorName || !foodName || !quantity || !expiryDate || !location) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newFood = {
        id: Date.now(),
        donorName,
        foodName,
        quantity,
        expiryDate,
        location,
        status: "Available",
    };

    foodListings.push(newFood);
    fs.writeFileSync(foodFilePath, JSON.stringify(foodListings, null, 2));

    res.status(201).json({ message: "Food listed successfully", food: newFood });
});

// ✅ Fetch all food listings
router.get("/list", (req, res) => {
    res.status(200).json(foodListings);
});

// ✅ Delete a food listing
router.delete("/delete/:id", (req, res) => {
    const foodId = parseInt(req.params.id);
    foodListings = foodListings.filter((food) => food.id !== foodId);
    fs.writeFileSync(foodFilePath, JSON.stringify(foodListings, null, 2));

    res.status(200).json({ message: "Food deleted successfully" });
});

module.exports = router;
