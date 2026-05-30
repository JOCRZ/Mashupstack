import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const API_URL = 'https://worksheet-catalogue.mashupstack.com/products';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    quantity: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          name: data.name || '',
          price: data.price?.toString() || '',
          category: data.category || '',
          quantity: data.quantity?.toString() || ''
        });
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load product.');
        setLoading(false);
      });
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.price || !form.category || !form.quantity) {
      setError('All fields are required.');
      return;
    }
    const payload = {
      name: form.name,
      price: parseFloat(form.price),
      category: form.category,
      quantity: parseInt(form.quantity, 10)
    };
    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (res.ok) {
          navigate('/');
        } else {
          setError('Failed to update product.');
        }
      })
      .catch(() => setError('Network error.'));
  }

  if (loading) return <div className="loading">Loading product...</div>;

  return (
    <div className="container">
      <div className="header-row">
        <h1>Edit Product</h1>
        <Link to="/" className="btn btn-back">Back to List</Link>
      </div>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit} className="product-form">
        <label>Name:
          <input name="name" value={form.name} onChange={handleChange} />
        </label>
        <label>Price:
          <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} />
        </label>
        <label>Category:
          <input name="category" value={form.category} onChange={handleChange} />
        </label>
        <label>Quantity:
          <input name="quantity" type="number" value={form.quantity} onChange={handleChange} />
        </label>
        <button type="submit" className="btn btn-submit">Update Product</button>
      </form>
    </div>
  );
}

export default EditProduct;
