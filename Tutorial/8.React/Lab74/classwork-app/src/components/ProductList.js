import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

function ProductList() {
    const user = useSelector(store => store.auth.user);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://worksheet-product.mashupstack.com/product', {
            headers: { 'Authorization': 'Bearer ' + user.token }
        }).then(response => {
            setProducts(response.data);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    }, [user]);

    if (loading) {
        return <div>
            <Navbar />
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-12 text-center">
                        <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3 text-muted">Fetching products...</p>
                    </div>
                </div>
            </div>
        </div>;
    }

    return <div>
        <Navbar />
        <div className="container py-4">
            <div className="row mb-4">
                <div className="col-12">
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <h2 className="fw-bold mb-1">Product Inventory</h2>
                            <p className="text-muted mb-0">{products.length} products available</p>
                        </div>
                        <span className="badge bg-primary rounded-pill px-3 py-2">
                            <i className="bi bi-box-seam me-1"></i>
                            {products.length} items
                        </span>
                    </div>
                </div>
            </div>
            <div className="card shadow-sm border-0 rounded-lg">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th className="ps-4">#</th>
                                    <th>Product Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th className="text-center">Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={product.id}>
                                        <td className="ps-4 fw-bold text-muted">{index + 1}</td>
                                        <td className="fw-semibold">{product.name}</td>
                                        <td className="text-muted">{product.description}</td>
                                        <td>
                                            <span className="badge bg-success rounded-pill px-3 py-2">
                                                ${product.price}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <span className={`badge rounded-pill px-3 py-2 ${parseInt(product.quantity) > 0 ? 'bg-info text-dark' : 'bg-danger'}`}>
                                                {product.quantity}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default ProductList;
