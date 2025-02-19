import React, { useState } from "react";
import { toast } from "react-toastify";

const DeleteProducts = () => {
  const [skuCodes, setSkuCodes] = useState(""); // State to store SKU codes as a string
  const [isLoading, setIsLoading] = useState(false); // State to handle loading state

  // Handle input change
  const handleInputChange = (e) => {
    setSkuCodes(e.target.value);
  };

  // Handle form submission
  const handleDelete = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Convert the input string into an array of SKU codes
      const skuArray = skuCodes
        .split(",")
        .map((sku) => sku.trim())
        .filter((sku) => sku !== "");

      // Send a DELETE request to the server
      const response = await fetch("http://localhost:5000/api/products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sku_codes: skuArray }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message); // Show success message
        setSkuCodes(""); // Clear the input field
      } else {
        toast.error(data.error || "Failed to delete products"); // Show error message
      }
    } catch (error) {
      toast.error("An error occurred while deleting products"); // Show error message
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="delete-products-container">
      <h2>Delete Products by SKU Codes</h2>
      <form onSubmit={handleDelete}>
        <input
          type="text"
          placeholder="Enter SKU codes, separated by commas"
          value={skuCodes}
          onChange={handleInputChange}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Deleting..." : "Delete Products"}
        </button>
      </form>
    </div>
  );
};

export default DeleteProducts;