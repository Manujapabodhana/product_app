import { FaEdit, FaTrash, FaBox } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onDelete }) => {
    const navigate = useNavigate();

    const imageUrl = product.image
        ? `http://localhost:8000${product.image}`
        : null;

    return (
        <div className="bg-slate-800/70 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-lg p-0 transition-transform relative overflow-hidden flex flex-col">

            <div className="h-[200px] bg-black/20 flex items-center justify-center relative">
                {imageUrl ? (
                    <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                    <FaBox size={48} className="text-slate-400 opacity-50" />
                )}

                <div className="absolute top-4 right-4 flex gap-2">
                    <button onClick={(e) => { e.stopPropagation(); navigate(`/edit/${product._id}`); }} className="text-amber-400 p-2 bg-black/60 rounded-full backdrop-blur-sm">
                        <FaEdit />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); onDelete(product._id); }} className="text-red-500 p-2 bg-black/60 rounded-full backdrop-blur-sm">
                        <FaTrash />
                    </button>
                </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
                <div className="mb-2">
                    <span className="bg-[--color-accent]/20 text-[--color-accent] px-3 py-1 rounded-full text-xs font-semibold uppercase">
                        {product.category}
                    </span>
                </div>

                <h3 className="text-xl mb-2 font-semibold text-slate-50">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigate(`/products/${product._id}`); }} className="no-underline text-inherit">
                        {product.name}
                    </a>
                </h3>
                <p className="text-slate-400 mb-4 min-h-[3rem] text-sm leading-relaxed">
                    {product.description?.length > 60 ? product.description.substring(0, 60) + '...' : (product.description || 'No description available')}
                </p>

                <div className="flex justify-between items-center mt-auto">
                    <span className="text-2xl font-bold text-[--color-primary]">
                        ${product.price ? product.price.toFixed(2) : '0.00'}
                    </span>
                    <span className={`text-xs flex items-center gap-1 font-medium ${product.inStock ? 'text-emerald-500' : 'text-red-500'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
