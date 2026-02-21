import { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../services/api';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { FaSearch, FaFilter } from 'react-icons/fa';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filters
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('createdAt_desc');

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchProducts();
        }, 500);
        return () => clearTimeout(timer);
    }, [search, category, sort]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const { data } = await getProducts({
                search,
                category,
                sort
            });
            setProducts(data.products || []);
            setError(null);
        } catch (err) {
            setError('Failed to fetch products. Check backend connection.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                fetchProducts(); // Refresh list
            } catch (err) {
                alert('Failed to delete product');
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4">
            <Navbar />

            {/* Controls */}
            <div className="bg-slate-800/70 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-lg p-4 mb-8 flex flex-wrap gap-4 items-center">
                <div className="flex-1 min-w-[200px] relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-3 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-50 transition-colors focus:outline-none focus:border-[--color-primary]"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <select
                    className="w-auto min-w-[150px] px-3 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-50 transition-colors focus:outline-none focus:border-[--color-primary]"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home">Home & Garden</option>
                    <option value="Sports">Sports</option>
                    <option value="Toys">Toys</option>
                </select>

                <select
                    className="w-auto min-w-[150px] px-3 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-50 transition-colors focus:outline-none focus:border-[--color-primary]"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="createdAt_desc">Newest First</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="name_asc">Name: A-Z</option>
                </select>
            </div>

            {loading && products.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                    Loading products...
                </div>
            ) : error ? (
                <div className="text-center py-16 text-red-500">
                    {error}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8 pb-8">
                        {products.map(product => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                onDelete={handleDelete}
                            />
                        ))}

                        {products.length === 0 && (
                            <div className="col-span-full text-center p-16 bg-white/5 rounded-2xl">
                                <p>No products found matching your criteria.</p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
