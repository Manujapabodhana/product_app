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

    if (loading) return <div className="max-w-7xl mx-auto px-4">Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4">
            <Navbar />

            <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl mb-6 font-light">
                    Edit <span className="font-bold text-[--color-accent]">Product</span>
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
