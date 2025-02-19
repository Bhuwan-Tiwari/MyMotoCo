import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/products') // Adjust the URL if needed
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch products');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="product-list">
      <h2>All Products</h2>
      <table>
        <thead>
          <tr>
            <th>SKU Code</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>HSN Code</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.sku_code}</td>
              <td>{product.product_name}</td>
              <td>{product.product_description}</td>
              <td>{product.price}</td>
              <td>{product.hsn_code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;