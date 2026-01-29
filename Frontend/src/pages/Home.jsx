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
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchProducts();
        }, 500);
        return () => clearTimeout(timer);
    }, [search, category, sort, page]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const { data } = await getProducts({
                search,
                category,
                sort,
                page,
                limit: 8
            });
            setProducts(data.products || []);
            setTotalPages(data.pagination?.pages || 1);
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
        <div className="container">
            <Navbar />

            {/* Controls */}
            <div className="glass-panel" style={{ padding: '1rem', marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
                    <FaSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="form-input"
                        style={{ paddingLeft: '2.5rem' }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <select
                    className="form-input"
                    style={{ width: 'auto', minWidth: '150px' }}
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
                    className="form-input"
                    style={{ width: 'auto', minWidth: '150px' }}
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
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                    Loading products...
                </div>
            ) : error ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#ef4444' }}>
                    {error}
                </div>
            ) : (
                <>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '2rem',
                        paddingBottom: '2rem'
                    }}>
                        {products.map(product => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                onDelete={handleDelete}
                            />
                        ))}

                        {products.length === 0 && (
                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem' }}>
                                <p>No products found matching your criteria.</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '4rem' }}>
                            <button
                                className="btn-primary"
                                disabled={page === 1}
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                style={{ opacity: page === 1 ? 0.5 : 1 }}
                            >
                                Previous
                            </button>
                            <span style={{ display: 'flex', alignItems: 'center', padding: '0 1rem', background: 'var(--bg-card)', borderRadius: '0.5rem' }}>
                                Page {page} of {totalPages}
                            </span>
                            <button
                                className="btn-primary"
                                disabled={page === totalPages}
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                style={{ opacity: page === totalPages ? 0.5 : 1 }}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Home;
