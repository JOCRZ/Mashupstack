import { useState, useEffect } from 'react';
import { fetchBooks, createBook, updateBook, deleteBook } from './api';
import './App.css';

const emptyForm = { title: '', author: '', published_year: '', genre: '' };

function BookForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialData || emptyForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title: form.title,
      author: form.author,
      published_year: Number(form.published_year),
      genre: form.genre,
    });
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>{initialData ? 'Edit Book' : 'Add New Book'}</h2>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <input name="author" placeholder="Author" value={form.author} onChange={handleChange} required />
      <input name="published_year" type="number" placeholder="Published Year" value={form.published_year} onChange={handleChange} required />
      <input name="genre" placeholder="Genre" value={form.genre} onChange={handleChange} required />
      <div className="form-actions">
        <button type="submit" className="btn-primary">{initialData ? 'Update' : 'Create'}</button>
        <button type="button" className="btn-ghost" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchBooks();
      setBooks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(formData) {
    try {
      await createBook(formData);
      setShowForm(false);
      await loadBooks();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleUpdate(formData) {
    try {
      await updateBook(editingBook.id, formData);
      setEditingBook(null);
      await loadBooks();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteBook(id);
      await loadBooks();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="app">
      <nav className="nav">
        <span className="nav-brand">Book Manager</span>
        <button className="btn-primary" onClick={() => setShowForm(true)}>+ Add Book</button>
      </nav>

      <main className="main">
        {error && <div className="error-banner">{error}</div>}

        {showForm && (
          <BookForm
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
          />
        )}

        {editingBook && (
          <BookForm
            initialData={editingBook}
            onSubmit={handleUpdate}
            onCancel={() => setEditingBook(null)}
          />
        )}

        {loading ? (
          <p className="loading-text">Loading books...</p>
        ) : books.length === 0 ? (
          <p className="empty-text">No books found. Add one to get started.</p>
        ) : (
          <div className="book-grid">
            {books.map((book) => (
              <div className="card" key={book.id}>
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">{book.author}</p>
                <p className="book-meta">{book.genre} &middot; {book.published_year}</p>
                <div className="card-actions">
                  <button className="btn-ghost" onClick={() => setEditingBook(book)}>Edit</button>
                  <button className="btn-primary" onClick={() => handleDelete(book.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
