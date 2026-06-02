import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts } from '../features/product/productSlice';
import Navbar from '../components/Navbar';

function ProductList() {
  const { items, loaded } = useSelector((state) => state.product);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    if (loaded) return;

    fetch('https://worksheet-product.mashupstack.com/product', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : data.products || data.data || [];
        dispatch(setProducts(list));
      })
      .catch(() => navigate('/login'));
  }, [token, loaded, dispatch, navigate]);

  if (!token) return null;

  return (
    <>
      <Navbar />
      <div className="products-container">
      <h2>Products</h2>
      {items.length === 0 && <p>No products found.</p>}
      {items.map((product) => (
        <div key={product.id} className="product-card">
          <div className="product-info">
            <span className="product-name">{product.name}</span>
            <span className="product-price">${product.price}</span>
          </div>
          <button className="btn-view" onClick={() => navigate(`/product/${product.id}`)}>View</button>
        </div>
      ))}
    </div>
    </>
  );
}

export default ProductList;
