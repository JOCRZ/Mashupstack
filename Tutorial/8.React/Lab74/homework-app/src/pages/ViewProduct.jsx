import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useSelector((state) =>
    state.product.items.find((p) => String(p.id) === String(id))
  );

  if (!product) {
    return (
      <div className="product-detail not-found">
        <h2>Product not found</h2>
        <button className="btn-back" onClick={() => navigate('/products')}>Back to Products</button>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Quantity:</strong> {product.quantity}</p>
      <button className="btn-back" onClick={() => navigate('/products')}>Back to Products</button>
    </div>
  );
}

export default ViewProduct;
