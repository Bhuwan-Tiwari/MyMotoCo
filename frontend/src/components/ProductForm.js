import React, { useState } from 'react';
import '../styles/ProductForm.css'; // Optional CSS for form styling

const ProductForm = () => {
    const [formData, setFormData] = useState({
        sku_code: '',
        product_name: '',
        product_description: '',
        price: '',
        hsn_code: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Here you can add validation logic if needed
        if (!formData.sku_code || !formData.product_name || !formData.product_description || !formData.price || !formData.hsn_code) {
            alert("Please fill out all fields.");
            return;
        }

        // You can make an API call here to save the product to your database.
        console.log("Product Data Submitted:", formData);
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <h2>Create Product</h2>
            
            <div className="form-group">
                <label>SKU Code</label>
                <input
                    type="text"
                    name="sku_code"
                    value={formData.sku_code}
                    onChange={handleChange}
                    required
                />
            </div>
            
            <div className="form-group">
                <label>Product Name</label>
                <input
                    type="text"
                    name="product_name"
                    value={formData.product_name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Product Description</label>
                <textarea
                    name="product_description"
                    value={formData.product_description}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Price</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>HSN Code</label>
                <input
                    type="text"
                    name="hsn_code"
                    value={formData.hsn_code}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit" className="submit-btn">Submit</button>
        </form>
    );
};

export default ProductForm;
