import React, { useState, useEffect } from 'react';
import '../../components/Laporan.css';
import axios from '../../api/axios';

const ModalBarangMasuk = ({ isOpen, onClose, refreshData }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    idproduk: '',
    stock_masuk: '',
    tanggal_masuk: new Date().toISOString().slice(0, 10)
  });

  useEffect(() => {
    if (isOpen) {
      fetchProducts();
    }
  }, [isOpen]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/product');
      if (response.data.success) {
        console.log('Products data:', response.data.data);
        setProducts(response.data.data);
      } else {
        setProducts([]);
      }
      setError('');
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
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
      const selectedProduct = products.find(product => product.id.toString() === formData.idproduk.toString());

      const dataToSubmit = {
        ...formData,
        product_name: selectedProduct?.nama,
        category_name: selectedProduct?.kategori?.nama_kategori,
        warehouse_name: selectedProduct?.kategori?.gudang?.nama_gudang
      };

      await axios.post('/barang-masuk', dataToSubmit);
      onClose();
      if (refreshData) refreshData();
      setFormData({
        idproduk: '',
        stock_masuk: '',
        tanggal_masuk: new Date().toISOString().slice(0, 10)
      });
    } catch (err) {
      console.error('Gagal Menambahkan Barang Masuk:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Gagal Menambah Produk');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
    setFormData({
      idproduk: '',
      stock_masuk: '',
      tanggal_masuk: new Date().toISOString().slice(0, 10)
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Tambah Barang Masuk</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
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
                onChange={handleInputChange}
                required
                disabled={loading}
              >
                <option value="">Pilih produk</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.nama}
                  </option>
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
                onChange={handleInputChange}
                required
                placeholder="0"
                min="1"
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
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="modal-actions">
            <button 
              type="button" 
              className="btn-cancel"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-submit"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Tambah Barang Masuk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalBarangMasuk;