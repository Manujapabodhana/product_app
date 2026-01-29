import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/products',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getProducts = (params) => api.get('/', { params });
export const getProductById = (id) => api.get(`/${id}`);
export const createProduct = (data) => {
    const isFormData = data instanceof FormData;
    return api.post('/', data, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
};
export const updateProduct = (id, data) => {
    const isFormData = data instanceof FormData;
    return api.put(`/${id}`, data, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
};
export const deleteProduct = (id) => api.delete(`/${id}`);

export default api;
