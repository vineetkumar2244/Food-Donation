import React from "react";
import "../styles.css"; // Ensure styles are applied

const FoodList = ({ foodItems, onFoodDeleted }) => {
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/donor/delete/${id}`, { method: "DELETE" });

    if (response.ok) {
      alert("Food item deleted successfully!");
      onFoodDeleted(); // Refresh the list
    } else {
      alert("Error deleting food item");
    }
  };

  return (
    <div className="food-list">
      <h3>Food Listings</h3>
      {foodItems.length === 0 ? (
        <p>No food items available.</p>
      ) : (
        <ul>
          {foodItems.map((item) => (
            <li key={item.id} className="food-item">
              <span>{item.foodName} - {item.quantity} - {item.expiryDate} - {item.location}</span>
              <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FoodList;
