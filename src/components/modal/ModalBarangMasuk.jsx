import React, { useState, useEffect } from 'react';
import '../../components/Laporan.css';
import axios from '../../api/axios';

const ModalBarangMasuk = ({ isOpen, onClose, refreshData, editItem }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    idproduk: '',
    stock_masuk: '',
    tanggal_masuk: new Date().toISOString().slice(0, 10)
  });

  // Fetch produk saat modal dibuka
  useEffect(() => {
    if (isOpen) {
      fetchProducts();
      if (editItem) {
        setFormData({
          idproduk: editItem.idproduk?.toString() || '',
          stock_masuk: editItem.stock_masuk || '',
          tanggal_masuk: editItem.tanggal_masuk?.slice(0, 10) || new Date().toISOString().slice(0, 10)
        });
      } else {
        resetForm();
      }
    }
  }, [isOpen, editItem]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/product');
      if (res.data.success) {
        setProducts(res.data.data);
      } else {
        setProducts([]);
      }
      setError('');
    } catch (err) {
      console.error('Error:', err);
      setError('Gagal memuat produk.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      idproduk: '',
      stock_masuk: '',
      tanggal_masuk: new Date().toISOString().slice(0, 10)
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const selectedProduct = products.find(p => p.id.toString() === formData.idproduk.toString());

      const dataToSubmit = {
        ...formData,
        product_name: selectedProduct?.nama,
        category_name: selectedProduct?.kategori?.nama_kategori,
        warehouse_name: selectedProduct?.kategori?.gudang?.nama_gudang
      };

      if (editItem) {
        await axios.put(`/barang-masuk/${editItem.id}`, dataToSubmit);
      } else {
        await axios.post('/barang-masuk', dataToSubmit);
      }

      onClose();
      if (refreshData) refreshData();
      resetForm();
    } catch (err) {
      console.error('Error submit:', err);
      setError(err?.response?.data?.message || 'Gagal menyimpan data.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{editItem ? 'Edit Barang Masuk' : 'Tambah Barang Masuk'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="idproduk">Produk *</label>
              <select
                id="idproduk"
                name="idproduk"
                value={formData.idproduk}
                onChange={handleChange}
                required
                disabled={loading || !!editItem}
              >
                <option value="">Pilih produk</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.nama}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="stock_masuk">Jumlah Stock Masuk *</label>
              <input
                type="number"
                id="stock_masuk"
                name="stock_masuk"
                value={formData.stock_masuk}
                onChange={handleChange}
                required
                min="1"
                placeholder="0"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tanggal_masuk">Tanggal Masuk *</label>
              <input
                type="date"
                id="tanggal_masuk"
                name="tanggal_masuk"
                value={formData.tanggal_masuk}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={handleCancel} disabled={loading}>Cancel</button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Processing...' : editItem ? 'Update Barang Masuk' : 'Tambah Barang Masuk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalBarangMasuk;
