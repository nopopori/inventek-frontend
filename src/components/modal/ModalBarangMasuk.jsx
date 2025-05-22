import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios.js';

const ModalBarangMasuk = ({ isOpen, onClose, modalToEdit = null }) => {
    const navigate = useNavigate();
    const [modals, setModals] = useState([]);
    const [namaModal, setNamaModal] = useState('');
    const [hargaModal, setHargaModal] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        if (isOpen) {
            fetchModals();

            if (modalToEdit) {
                setNamaModal(modalToEdit.nama || '');
                setHargaModal(modalToEdit.harga || '');
                setCurrentId(modalToEdit.id);
                setIsEditing(true);
            } else {
                resetForm();
            }
        }
    }, [isOpen, modalToEdit]);

    const fetchModals = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('/api/modal'); //Https Modal Rest api https//localhost:8000/api/modal pakai ini
            setModals(response.data.data || []);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching modals:', error);
            setMessage('Gagal mengambil data modal');
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setNamaModal('');
        setHargaModal('');
        setCurrentId(null);
        setIsEditing(false);
        setMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!namaModal || !hargaModal) {
            setMessage('Nama dan harga modal harus diisi');
            return;
        }

        setIsLoading(true);
        
        try {
            if (isEditing && currentId) {
                await updateData(currentId);
            } else {
                await createModal();
            }
            
            fetchModals();
            resetForm();
            
            if (!isEditing) {
                setMessage('Modal berhasil ditambahkan');
            } else {
                setMessage('Modal berhasil diperbarui');
            }
            
            setTimeout(() => {
                setMessage('');
                onClose();
            }, 2000);
            
        } catch (error) {
            console.error('Error handling modal:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const createModal = async () => {
        try {
            await axios.post('/modal', {
                nama: namaModal,
                harga: hargaModal
            });
            return true;
        } catch (error) {
            handleError(error);
            return false;
        }
    };

    const updateData = async (id) => {
        try {
            await axios.put(`/modal/${id}`, {
                nama: namaModal,
                harga: hargaModal
            });
            return true;
        } catch (error) {
            handleError(error);
            return false;
        }
    };

    const deleteData = async (id) => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus modal ini?')) {
            return;
        }
        
        setIsLoading(true);
        
        try {
            await axios.delete(`/modal/${id}`);
            setMessage('Modal berhasil dihapus');
            fetchModals();
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
    )
};

export default ModalBarangMasuk;


