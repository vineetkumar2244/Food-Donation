import React, { useState, useEffect } from "react";
import AddFoodForm from "../components/AddFoodForm";
import FoodList from "../components/FoodList";
import "../styles.css"; // Ensure styles are applied

const DonorDashboard = () => {
  const [foodItems, setFoodItems] = useState([]);

  // Fetch food listings for the logged-in donor
  useEffect(() => {
    fetch("http://localhost:5000/donor/list")
      .then((res) => res.json())
      .then((data) => setFoodItems(data))
      .catch((err) => console.error("Error fetching food list:", err));
  }, []);

  // Function to update the food list after adding/deleting
  const refreshFoodList = () => {
    fetch("http://localhost:5000/donor/list")
      .then((res) => res.json())
      .then((data) => setFoodItems(data))
      .catch((err) => console.error("Error fetching food list:", err));
  };

  return (
    <div className="dashboard-container">
      <h2>Donor Dashboard</h2>
      
      <AddFoodForm onFoodAdded={refreshFoodList} />
      <FoodList foodItems={foodItems} onFoodDeleted={refreshFoodList} />
    </div>
  );
};

export default DonorDashboard;
