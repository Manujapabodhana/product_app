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

    if (loading) return <div className="max-w-7xl mx-auto px-4 pt-8">Loading...</div>;
    if (!product) return null;

    const imageUrl = product.image ? `http://localhost:8000${product.image}` : null;

    return (
        <div className="max-w-7xl mx-auto px-4">
            <Navbar />

            <Link to="/" className="inline-flex items-center gap-2 mb-8 text-slate-400">
                <FaArrowLeft /> Back to Products
            </Link>

            <div className="bg-slate-800/70 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-lg p-0 overflow-hidden grid grid-cols-2 gap-0">

                {/* Image Section */}
                <div className="bg-black/30 min-h-[400px] flex items-center justify-center">
                    {imageUrl ? (
                        <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                        <FaBox size={100} className="text-slate-400 opacity-50" />
                    )}
                </div>

                {/* Details Section */}
                <div className="p-12 flex flex-col">
                    <div className="mb-4">
                        <span className="bg-[--color-primary]/20 text-[--color-primary] px-4 py-2 rounded-full text-sm font-semibold uppercase">
                            {product.category}
                        </span>
                    </div>

                    <h1 className="text-4xl font-bold mb-4 leading-tight">{product.name}</h1>

                    <div className="text-3xl font-bold text-[--color-accent] mb-8">
                        ${product.price.toFixed(2)}
                    </div>

                    <div className="mb-8 text-slate-400 leading-relaxed">
                        <h3 className="text-base font-semibold text-slate-50 mb-2">Description</h3>
                        <p>{product.description || 'No description provided.'}</p>
                    </div>

                    <div className="mb-8">
                        <span className={`inline-flex items-center gap-2 font-semibold ${product.inStock ? 'text-emerald-500' : 'text-red-500'}`}>
                            <span className={`w-2.5 h-2.5 rounded-full ${product.inStock ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                            {product.inStock ? 'In Stock' : 'Currently Unavailable'}
                        </span>
                    </div>

                    <div className="mt-auto flex gap-4">
                        <Link to={`/edit/${product._id}`} className="flex-1 bg-gradient-to-br from-[--color-primary] to-[--color-primary-hover] text-white px-6 py-3 rounded-lg font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_15px_-3px_rgba(139,92,246,0.3)] flex justify-center items-center gap-2">
                            <FaEdit /> Edit Product
                        </Link>
                        <button onClick={handleDelete} className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_15px_-3px_rgba(239,68,68,0.3)] flex justify-center items-center gap-2">
                            <FaTrash /> Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
