import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios.js';

// Component for managing product modal
const ModalProduct = ({ isOpen, onClose, productToEdit = null }) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [namaProduct, setNamaProduct] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        if (isOpen) {
            fetchProducts();

            if (productToEdit) {
                setNamaProduct(productToEdit.nama || '');
                setCurrentId(productToEdit.id);
                setIsEditing(true);
            } else {
                resetForm();
            }
        }
    }, [isOpen, productToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!namaProduct) {
            setMessage('Nama produk harus diisi');
            return;
        }

        setIsLoading(true);

        try {
            if (isEditing && currentId) {
                await updateData(currentId);
            } else {
                await createModal();
            }

            fetchProducts();
            resetForm();

            if (!isEditing) {
                setMessage('Produk berhasil ditambahkan');
            } else {
                setMessage('Produk berhasil diperbarui');
            }

            setTimeout(() => {
                setMessage('');
                onClose();
            }, 2000);

        } catch (error) {
            console.error('Error handling product:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('/api/product');
            setProducts(response.data.data || []);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setMessage('Gagal mengambil data produk');
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setNamaProduct('');
        setCurrentId(null);
        setIsEditing(false);
        setMessage('');
    };

    const createModal = async () => {
        try {
            await axios.post('/modal/product', {
                nama: namaProduct,
            });
            return true;
        } catch (error) {
            handleError(error);
            return false;
        }
    };

    const updateData = async (id) => {
        try {
            await axios.put(`/modal/product/${id}`, {
                nama: namaProduct,
            });
            return true;
        } catch (error) {
            handleError(error);
            return false;
        }
    };

    const deleteData = async (id) => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            return;
        }
        
        setIsLoading(true);
        
        try {
            await axios.delete(`/modal/product/${id}`);
            setMessage('Produk berhasil dihapus');
            fetchProducts();
            setTimeout(() => setMessage(''), 2000);
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleError = (error) => {
        console.error(error);
        if (error.response) {
            const errData = error.response.data;
            if (errData.errors) {
                const errors = Object.values(errData.errors);
                setMessage(errors.join(', '));
            } else {
                setMessage(errData.message || 'Terjadi kesalahan, silahkan coba lagi');
            }
        } else if (error.request) {
            console.log('Tidak ada respons', error.request);
            setMessage('Tidak ada respons, terjadi kesalahan');
        } else {
            console.log('Request Error:', error.message);
            setMessage('Terjadi kesalahan, silahkan coba lagi');
        }
    };

    if (!isOpen) return null;

    return (
        // Table Ui Front end nya di sini
    );


};

export default ModalProduct;