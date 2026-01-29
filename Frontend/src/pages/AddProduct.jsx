import { useNavigate } from 'react-router-dom';
import { createProduct } from '../services/api';
import Navbar from '../components/Navbar';
import ProductForm from '../components/ProductForm';

const AddProduct = () => {
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        try {
            // Create FormData object
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('price', data.price);
            formData.append('category', data.category);
            formData.append('description', data.description || '');
            formData.append('inStock', data.inStock);
            if (data.image) {
                formData.append('image', data.image);
            }

            await createProduct(formData);
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Failed to create product. Please check your inputs.');
        }
    };

    return (
        <div className="container">
            <Navbar />

            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: '300' }}>
                    Add New <span style={{ fontWeight: '700', color: 'var(--primary)' }}>Product</span>
                </h2>

                <ProductForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default AddProduct;
