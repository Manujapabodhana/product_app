import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa';

const productSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    price: z.number().min(0, "Price must be positive"),
    category: z.string().min(1, "Category is required"),
    description: z.string().optional(),
    inStock: z.boolean().default(true),
    image: z.any().optional(),
});

const ProductForm = ({ defaultValues, onSubmit, isEdit }) => {
    const [preview, setPreview] = useState(defaultValues?.image || null);

    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: defaultValues || {
            name: '',
            price: '',
            category: '',
            description: '',
            inStock: true,
            image: null
        }
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setValue('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setValue('image', null);
        setPreview(null);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Product Name</label>
                <input
                    {...register('name')}
                    className="form-input"
                    placeholder="Ex. Gaming Laptop"
                />
                {errors.name && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.name.message}</p>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Price ($)</label>
                    <input
                        type="number"
                        step="0.01"
                        {...register('price', { valueAsNumber: true })}
                        className="form-input"
                        placeholder="0.00"
                    />
                    {errors.price && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.price.message}</p>}
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Category</label>
                    <select {...register('category')} className="form-input">
                        <option value="">Select Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Home">Home & Garden</option>
                        <option value="Sports">Sports</option>
                        <option value="Toys">Toys</option>
                    </select>
                    {errors.category && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.category.message}</p>}
                </div>
            </div>

            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Description</label>
                <textarea
                    {...register('description')}
                    className="form-input"
                    rows="4"
                    placeholder="Product details..."
                    style={{ resize: 'vertical' }}
                />
            </div>

            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Product Image</label>
                <div style={{ border: '2px dashed var(--border)', borderRadius: '0.5rem', padding: '2rem', textAlign: 'center', position: 'relative' }}>
                    {preview ? (
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <img src={preview.startsWith('data:') || preview.startsWith('http') ? preview : `http://localhost:8000${preview}`} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '0.5rem' }} />
                            <button type="button" onClick={removeImage} style={{ position: 'absolute', top: -10, right: -10, background: '#ef4444', color: 'white', borderRadius: '50%', padding: '0.25rem', display: 'flex' }}>
                                <FaTimes />
                            </button>
                        </div>
                    ) : (
                        <label style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                            <FaCloudUploadAlt size={32} />
                            <span>Click to upload image</span>
                            <input type="file" onChange={handleImageChange} accept="image/*" style={{ display: 'none' }} />
                        </label>
                    )}
                </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                <input
                    type="checkbox"
                    {...register('inStock')}
                    style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--primary)' }}
                />
                <span>Available in Stock</span>
            </label>

            <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
                style={{ marginTop: '1rem', opacity: isSubmitting ? 0.7 : 1 }}
            >
                {isSubmitting ? (isEdit ? 'Updating...' : 'Creating...') : (isEdit ? 'Update Product' : 'Create Product')}
            </button>
        </form>
    );
};

export default ProductForm;
