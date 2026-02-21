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
        <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-800/70 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-lg p-8 flex flex-col gap-6">
            <div>
                <label className="block mb-2 text-slate-400">Product Name</label>
                <input
                    {...register('name')}
                    className="w-full px-3 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-50 transition-colors focus:outline-none focus:border-[--color-primary]"
                    placeholder="Ex. Gaming Laptop"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block mb-2 text-slate-400">Price ($)</label>
                    <input
                        type="number"
                        step="0.01"
                        {...register('price', { valueAsNumber: true })}
                        className="w-full px-3 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-50 transition-colors focus:outline-none focus:border-[--color-primary]"
                        placeholder="0.00"
                    />
                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                </div>

                <div>
                    <label className="block mb-2 text-slate-400">Category</label>
                    <select {...register('category')} className="w-full px-3 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-50 transition-colors focus:outline-none focus:border-[--color-primary]">
                        <option value="">Select Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Home">Home & Garden</option>
                        <option value="Sports">Sports</option>
                        <option value="Toys">Toys</option>
                    </select>
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                </div>
            </div>

            <div>
                <label className="block mb-2 text-slate-400">Description</label>
                <textarea
                    {...register('description')}
                    className="w-full px-3 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-50 transition-colors focus:outline-none focus:border-[--color-primary] resize-y"
                    rows="4"
                    placeholder="Product details..."
                />
            </div>

            <div>
                <label className="block mb-2 text-slate-400">Product Image</label>
                <div className="border-2 border-dashed border-slate-700/50 rounded-lg p-8 text-center relative">
                    {preview ? (
                        <div className="relative inline-block">
                            <img src={preview.startsWith('data:') || preview.startsWith('http') ? preview : `http://localhost:8000${preview}`} alt="Preview" className="max-w-full max-h-[200px] rounded-lg" />
                            <button type="button" onClick={removeImage} className="absolute -top-2.5 -right-2.5 bg-red-500 text-white rounded-full p-1 flex">
                                <FaTimes />
                            </button>
                        </div>
                    ) : (
                        <label className="cursor-pointer flex flex-col items-center gap-2 text-slate-400">
                            <FaCloudUploadAlt size={32} />
                            <span>Click to upload image</span>
                            <input type="file" onChange={handleImageChange} accept="image/*" className="hidden" />
                        </label>
                    )}
                </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
                <input
                    type="checkbox"
                    {...register('inStock')}
                    className="w-5 h-5"
                    style={{ accentColor: 'var(--color-primary)' }}
                />
                <span>Available in Stock</span>
            </label>

            <button
                type="submit"
                className="bg-gradient-to-br from-[--color-primary] to-[--color-primary-hover] text-white px-6 py-3 rounded-lg font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_15px_-3px_rgba(139,92,246,0.3)] mt-4 disabled:opacity-70"
                disabled={isSubmitting}
            >
                {isSubmitting ? (isEdit ? 'Updating...' : 'Creating...') : (isEdit ? 'Update Product' : 'Create Product')}
            </button>
        </form>
    );
};

export default ProductForm;
