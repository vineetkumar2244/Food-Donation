import React, { useState } from "react";
import "../styles.css"; // Ensure styles are applied

const AddFoodForm = ({ onFoodAdded }) => {
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const donorName = "John Doe"; // Replace with logged-in user's name

    const response = await fetch("http://localhost:5000/donor/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ donorName, foodName, quantity, expiryDate, location }),
    });

    if (response.ok) {
      alert("Food item added successfully!");
      onFoodAdded(); // Refresh the food list
      setFoodName("");
      setQuantity("");
      setExpiryDate("");
      setLocation("");
    } else {
      alert("Error adding food item");
    }
  };

  return (
    <form className="food-form" onSubmit={handleSubmit}>
      <h3>Add Food Item</h3>
      <input type="text" placeholder="Food Name" value={foodName} onChange={(e) => setFoodName(e.target.value)} required />
      <input type="text" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
      <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
      <button type="submit" className="submit-btn">Add Food</button>
    </form>
  );
};

export default AddFoodForm;
