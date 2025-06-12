import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import Sidebar from './sidebar';
import './Product.css';
import ModalProduct from '../components/modal/ModalProduct';
import ProductDetail from './ProductDetail';

const Product = () => {
  const [productData, setProductData] = useState([]);
  const [kategoriList, setKategoriList] = useState([]);
  const [gudangList, setGudangList] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [formData, setFormData] = useState({
    nama: '',
    idkategori: '',
    stock: '',
    keterangan: '',
    idgudang: '',
    foto_produk: null,
    masukkan_ke_barang_masuk: false,
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(productData.length / itemsPerPage);

  // Load products, kategori, gudang on mount
  useEffect(() => {
    fetchProducts();
    fetchKategori();
    fetchGudang();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/product');
      if (res.data.success) {
        setProductData(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchKategori = async () => {
    try {
      const response = await axios.get('/kategori');
      const data = response.data;
       if (Array.isArray(data)) {
        setKategoriList(data);
      } else if (Array.isArray(data.data)) {
        setKategoriList(data.data);
      } else {
        console.error('Format data kategori tidak valid:', data);
        setKategoriList([]);
      }
    } catch (error) {
      console.error('Gagal memuat data kategori:', error);
    }
  };

  const fetchGudang = async () => {
  try {
      const response = await axios.get('/gudang');
      const data = response.data;

      if (Array.isArray(data)) {
        setGudangList(data);
      } else if (Array.isArray(data.data)) {
        setGudangList(data.data);
      } else {
        console.error('Format data gudang tidak valid:', data);
        setGudangList([]);
      }
    } catch (error) {
      console.error('Gagal memuat data gudang:', error);
    }
  };

  // Form handlers
  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      foto_produk: file
    }));
  };

  // Submit create/update
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('nama', formData.nama);
      data.append('idkategori', formData.idkategori);
      data.append('stock', formData.stock);
      data.append('keterangan', formData.keterangan);
      data.append('idgudang', formData.idgudang);
       data.append('masukkan_ke_barang_masuk', formData.masukkan_ke_barang_masuk ? '1' : '0');
      if (formData.foto_produk) {
        data.append('foto_produk', formData.foto_produk);
      }
if (isEditMode && editId) {
  data.append('_method', 'PUT'); // tambahkan _method untuk override jadi PUT
  await axios.post(`/product/${editId}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
} else {
  await axios.post('/product', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
}

      fetchProducts();
      resetForm();
      setShowAddModal(false);
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message || 'Error submitting form');
      } else {
        alert('Error submitting form');
      }
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({
      nama: '',
      idkategori: '',
      stock: '',
      keterangan: '',
      idgudang: '',
      foto_produk: null,
      masukkan_ke_barang_masuk: false,
    });
    setIsEditMode(false);
    setEditId(null);
  };

  // Add / Edit product
  const handleAddProduct = () => {
    resetForm();
    setShowAddModal(true);
  };

  const handleEditProduct = (product) => {
  console.log('Product to edit:', product);
  console.log('Kategori ID:', product.kategori?.idkategori);
  console.log('Gudang ID:', product.kategori?.gudang?.id);

  setFormData({
    nama: product.nama || '',
    idkategori: product.idkategori || '',
    stock: product.stock?.toString() || '',
    keterangan: product.keterangan || '',
    idgudang: product.kategori?.gudang?.id || '',
    foto_produk: null,
    masukkan_ke_barang_masuk: false,
  });

  setIsEditMode(true);
  setEditId(product.id);
  setShowAddModal(true);
};
  const handleDeleteProduct = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      try {
        await axios.delete(`/product/${id}`);
        fetchProducts();
      } catch (error) {
        alert('Gagal menghapus produk');
        console.error(error);
      }
    }
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowDetail(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    resetForm();
  };

  const handleBackFromDetail = () => {
    setShowDetail(false);
    setSelectedProduct(null);
  };

  // Pagination handlers
  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return productData.slice(startIndex, startIndex + itemsPerPage);
  };

  // Overview stats
  const overviewStats = {
    categories: [...new Set(productData.map(p => p.kategori?.nama_kategori))].length,
    totalProducts: productData.length,
    totalStock: productData.reduce((sum, p) => sum + (p.stock || 0), 0),
    lowStocks: productData.filter(p => (p.stock || 0) < 10).length,
  };

  if (showDetail && selectedProduct) {
    return (
      <ProductDetail 
        product={selectedProduct}
        onBack={handleBackFromDetail}
        onEdit={handleEditProduct}
      />
    );
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        {/* Inventory Overview */}
        <div className="inventory-overview">
          <div className="overview-card categories">
            <h3>Categories</h3>
            <div className="overview-number">{overviewStats.categories}</div>
            <div className="overview-subtitle">Last 7 days</div>
          </div>
          <div className="overview-card total-products">
            <h3>Total Products</h3>
            <div className="overview-number">{overviewStats.totalProducts}</div>
            <div className="overview-subtitle">Last 7 days</div>
          </div>
          <div className="overview-card top-selling">
            <h3>Total Stock</h3>
            <div className="overview-number">{overviewStats.totalStock}</div>
            <div className="overview-subtitle">Last 7 days</div>
          </div>
          <div className="overview-card low-stocks">
            <h3>Low Stocks</h3>
            <div className="overview-number">{overviewStats.lowStocks}</div>
            <div className="overview-subtitle">Low stock items</div>
          </div>
        </div>

        {/* Content Header */}
        <div className="content-header">
          <h1>Products</h1>
          <div className="header-actions">
            <button className="filter-btn">
              <span className="filter-icon">⚙️</span>
              Filters
            </button>
            <button className="add-btn" onClick={handleAddProduct}>
              + Add New Product
            </button>
          </div>
        </div>

        {/* Product Table */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nama Produk</th>
                <th>Kategori</th>
                <th>Gudang</th>
                <th>Stock</th>
                <th>Keterangan</th>
                <th>Foto Produk</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getCurrentPageData().map(product => (
                <tr key={product.id}>
                  <td>{product.nama}</td>
                  <td>{product.kategori?.nama_kategori || '-'}</td>
                  <td>{product.kategori?.gudang?.nama_gudang || '-'}</td> 
                  <td>{product.stock}</td>
                  <td>{product.keterangan}</td>
                 <td>
  {product.foto_produk ? (
    <img
      src={`http://localhost:8000/storage/${product.foto_produk}`}
      alt={product.nama}
      className="product-photo"
    />
  ) : (
    'No Image'
  )}
</td>
                  <td>
                    <button onClick={() => handleViewProduct(product)}>View</button>
                    <button onClick={() => handleEditProduct(product)}>Edit</button>
                    <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {productData.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center' }}>Tidak ada produk di temukan</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            &lt; Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next &gt;
          </button>
        </div>

        {/* Modal Add/Edit Product */}
         <ModalProduct
        show={showAddModal}
        onClose={handleCloseModal}
        formData={formData}
        onChange={handleInputChange}
        onFileChange={handleFileChange}
        onSubmit={handleSubmit}
        isEditMode={false}
        kategoriList={kategoriList}
        gudangList={gudangList}
      />
      </div>
    </div>
  );
};

export default Product;
