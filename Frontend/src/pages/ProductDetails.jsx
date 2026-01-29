import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductById, deleteProduct } from '../services/api';
import Navbar from '../components/Navbar';
import { FaEdit, FaTrash, FaArrowLeft, FaBox } from 'react-icons/fa';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await getProductById(id);
                setProduct(data.product);
            } catch (err) {
                console.error(err);
                alert('Product not found');
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id, navigate]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                navigate('/');
            } catch (err) {
                alert('Failed to delete product');
            }
        }
    };

    if (loading) return <div className="container" style={{ paddingTop: '2rem' }}>Loading...</div>;
    if (!product) return null;

    const imageUrl = product.image ? `http://localhost:8000${product.image}` : null;

    return (
        <div className="container">
            <Navbar />

            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                <FaArrowLeft /> Back to Products
            </Link>

            <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '0' }}>

                {/* Image Section */}
                <div style={{ background: 'rgba(0,0,0,0.3)', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {imageUrl ? (
                        <img src={imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <FaBox size={100} color="var(--text-secondary)" style={{ opacity: 0.5 }} />
                    )}
                </div>

                {/* Details Section */}
                <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <span style={{
                            background: 'rgba(139, 92, 246, 0.2)',
                            color: 'var(--primary)',
                            padding: '0.5rem 1rem',
                            borderRadius: '2rem',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            textTransform: 'uppercase'
                        }}>
                            {product.category}
                        </span>
                    </div>

                    <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem', lineHeight: 1.2 }}>{product.name}</h1>

                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '2rem' }}>
                        ${product.price.toFixed(2)}
                    </div>

                    <div style={{ marginBottom: '2rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Description</h3>
                        <p>{product.description || 'No description provided.'}</p>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: product.inStock ? '#10b981' : '#ef4444',
                            fontWeight: '600'
                        }}>
                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: product.inStock ? '#10b981' : '#ef4444' }}></span>
                            {product.inStock ? 'In Stock' : 'Currently Unavailable'}
                        </span>
                    </div>

                    <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem' }}>
                        <Link to={`/edit/${product._id}`} className="btn-primary" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', color: 'white' }}>
                            <FaEdit /> Edit Product
                        </Link>
                        <button onClick={handleDelete} className="btn-primary" style={{ flex: 1, background: '#ef4444', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                            <FaTrash /> Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
