import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    console.log("Loading on page");
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://product.com/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://product.com/api/products', { name, description, price });
      setProducts([...products, response.data]);
      setName('');
      setDescription('');
      setPrice('');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="App">
      <h1>Product Management System</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <button type="submit">Add Product</button>
      </form>
      <div>
        <h2>Products</h2>
        <ul>
          {products.map(product => (
            <li key={product._id}>
              <strong>{product.name}</strong> - {product.description} - ${product.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
