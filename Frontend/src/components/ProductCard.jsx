import { FaEdit, FaTrash, FaBox } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onDelete }) => {
    const navigate = useNavigate();

    const imageUrl = product.image
        ? `http://localhost:8000${product.image}`
        : null;

    return (
        <div className="glass-panel" style={{ padding: '0', transition: 'transform 0.2s', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

            <div style={{ height: '200px', background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                {imageUrl ? (
                    <img src={imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <FaBox size={48} color="var(--text-secondary)" style={{ opacity: 0.5 }} />
                )}

                <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <button onClick={(e) => { e.stopPropagation(); navigate(`/edit/${product._id}`); }} style={{ color: '#fbbf24', padding: '0.5rem', background: 'rgba(0,0,0,0.6)', borderRadius: '50%', backdropFilter: 'blur(4px)' }}>
                        <FaEdit />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); onDelete(product._id); }} style={{ color: '#ef4444', padding: '0.5rem', background: 'rgba(0,0,0,0.6)', borderRadius: '50%', backdropFilter: 'blur(4px)' }}>
                        <FaTrash />
                    </button>
                </div>
            </div>

            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                    <span style={{
                        background: 'rgba(6, 182, 212, 0.2)',
                        color: 'var(--accent)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        textTransform: 'uppercase'
                    }}>
                        {product.category}
                    </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    <a href="#" onClick={(e) => { e.preventDefault(); navigate(`/products/${product._id}`); }} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {product.name}
                    </a>
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', minHeight: '3rem', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    {/* Truncate description */}
                    {product.description?.length > 60 ? product.description.substring(0, 60) + '...' : (product.description || 'No description available')}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                        ${product.price ? product.price.toFixed(2) : '0.00'}
                    </span>
                    <span style={{
                        fontSize: '0.8rem',
                        color: product.inStock ? '#10b981' : '#ef4444',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontWeight: '500'
                    }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: product.inStock ? '#10b981' : '#ef4444' }}></span>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
