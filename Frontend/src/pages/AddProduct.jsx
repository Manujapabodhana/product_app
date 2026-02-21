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
        <div className="max-w-7xl mx-auto px-4">
            <Navbar />

            <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl mb-6 font-light">
                    Add New <span className="font-bold text-[--color-primary]">Product</span>
                </h2>

                <ProductForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default AddProduct;
