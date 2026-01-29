import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, updateProduct } from '../services/api';
import Navbar from '../components/Navbar';
import ProductForm from '../components/ProductForm';

const EditProduct = () => {
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
                console.error("Failed to fetch product", err);
                alert("Product not found");
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id, navigate]);

    const handleSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('price', data.price);
            formData.append('category', data.category);
            formData.append('description', data.description || '');
            formData.append('inStock', data.inStock);

            // Only append image if it's a new file (not existing string path)
            if (data.image instanceof File) {
                formData.append('image', data.image);
            }

            await updateProduct(id, formData);
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Failed to update product');
        }
    };

    if (loading) return <div className="container">Loading...</div>;

    return (
        <div className="container">
            <Navbar />

            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: '300' }}>
                    Edit <span style={{ fontWeight: '700', color: 'var(--accent)' }}>Product</span>
                </h2>

                {product && (
                    <ProductForm
                        defaultValues={product}
                        onSubmit={handleSubmit}
                        isEdit={true}
                    />
                )}
            </div>
        </div>
    );
};

export default EditProduct;
