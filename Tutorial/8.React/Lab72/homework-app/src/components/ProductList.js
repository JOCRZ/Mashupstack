import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = 'https://worksheet-catalogue.mashupstack.com/products';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  function fetchProducts() {
    setLoading(true);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this product?')) {
      fetch(`${API_URL}/${id}`, { method: 'DELETE' })
        .then(() => fetchProducts());
    }
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div className="container">
      <div className="header-row">
        <h1>Product Catalog</h1>
        <Link to="/add" className="btn btn-add">+ Add Product</Link>
      </div>
      <input
        type="text"
        className="search-box"
        placeholder="Search products by name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {filtered.length === 0 ? (
        <p className="no-results">No products found.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>${parseFloat(p.price).toFixed(2)}</td>
                <td>{p.category}</td>
                <td>{p.quantity}</td>
                <td className="actions">
                  <Link to={`/edit/${p.id}`} className="btn btn-edit">Edit</Link>
                  <button onClick={() => handleDelete(p.id)} className="btn btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductList;
