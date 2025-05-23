import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import './Product.css';
import ModalProduct from '../components/modal/ModalProduct';
import ProductDetail from './ProductDetail';

const Product = () => {
  const [productData, setProductData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    namaProduct: '',
    kategoriProduct: '',
    jumlah: '',
    deskripsi: '',
    fotoProduct: null,
  });

  // State untuk edit
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // State untuk pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  // Load mock data
  useEffect(() => {
    const mockData = [
      {
        id: 1,
        nama_produk: 'Maggi',
        jumlah: 'Rp.430',
        gudang: '43 Packets',
        kategori: 'Rp.430',
        gambar: 'Rp.430',
        deskripsi: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        productId: '456567',
        kategoriProduk: 'Makanan',
        tanggalMasuk: '13/4/23',
        stokProduk: 12,
        namaGudang: 'Ronald Martin',
        lokasiGudang: '98789 86757',
        deskripsiProduk: 'Penyedap makanan',
        jumlahAwal: 40,
        sisaProduk: 34,
        dalamPerjalanan: 15
      },
      {
        id: 2,
        nama_produk: 'Bru',
        jumlah: 'Rp.257',
        gudang: '22 Packets',
        kategori: 'Rp.257',
        gambar: 'Rp.257',
        deskripsi: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        productId: '456568',
        kategoriProduk: 'Minuman',
        tanggalMasuk: '14/4/23',
        stokProduk: 8,
        namaGudang: 'Ronald Martin',
        lokasiGudang: '98789 86757',
        deskripsiProduk: 'Kopi instan',
        jumlahAwal: 30,
        sisaProduk: 22,
        dalamPerjalanan: 8
      },
      {
        id: 3,
        nama_produk: 'Red Bull',
        jumlah: 'Rp.405',
        gudang: '38 Packets',
        kategori: 'Rp.405',
        gambar: 'Rp.405',
        deskripsi: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        productId: '456569',
        kategoriProduk: 'Minuman',
        tanggalMasuk: '15/4/23',
        stokProduk: 25,
        namaGudang: 'Ronald Martin',
        lokasiGudang: '98789 86757',
        deskripsiProduk: 'Energy drink',
        jumlahAwal: 50,
        sisaProduk: 38,
        dalamPerjalanan: 12
      },
      {
        id: 4,
        nama_produk: 'Bourn Vita',
        jumlah: 'Rp.502',
        gudang: '14 Packets',
        kategori: 'Rp.502',
        gambar: 'Rp.502',
        deskripsi: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        productId: '456570',
        kategoriProduk: 'Minuman',
        tanggalMasuk: '16/4/23',
        stokProduk: 18,
        namaGudang: 'Ronald Martin',
        lokasiGudang: '98789 86757',
        deskripsiProduk: 'Susu coklat',
        jumlahAwal: 35,
        sisaProduk: 14,
        dalamPerjalanan: 21
      },
      {
        id: 5,
        nama_produk: 'Horlicks',
        jumlah: 'Rp.530',
        gudang: '5 Packets',
        kategori: 'Rp.530',
        gambar: 'Rp.530',
        deskripsi: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        productId: '456571',
        kategoriProduk: 'Minuman',
        tanggalMasuk: '17/4/23',
        stokProduk: 5,
        namaGudang: 'Ronald Martin',
        lokasiGudang: '98789 86757',
        deskripsiProduk: 'Susu malt',
        jumlahAwal: 25,
        sisaProduk: 5,
        dalamPerjalanan: 20
      },
      {
        id: 6,
        nama_produk: 'Harpic',
        jumlah: 'Rp.605',
        gudang: '10 Packets',
        kategori: 'Rp.605',
        gambar: 'Rp.605',
        deskripsi: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        productId: '456572',
        kategoriProduk: 'Pembersih',
        tanggalMasuk: '18/4/23',
        stokProduk: 10,
        namaGudang: 'Ronald Martin',
        lokasiGudang: '98789 86757',
        deskripsiProduk: 'Pembersih toilet',
        jumlahAwal: 20,
        sisaProduk: 10,
        dalamPerjalanan: 10
      },
      {
        id: 7,
        nama_produk: 'Ariel',
        jumlah: 'Rp.408',
        gudang: '23 Packets',
        kategori: 'Rp.408',
        gambar: 'Rp.408',
        deskripsi: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        productId: '456573',
        kategoriProduk: 'Pembersih',
        tanggalMasuk: '19/4/23',
        stokProduk: 23,
        namaGudang: 'Ronald Martin',
        lokasiGudang: '98789 86757',
        deskripsiProduk: 'Deterjen cuci',
        jumlahAwal: 45,
        sisaProduk: 23,
        dalamPerjalanan: 22
      },
      {
        id: 8,
        nama_produk: 'Scotch Brite',
        jumlah: 'Rp.359',
        gudang: '43 Packets',
        kategori: 'Rp.359',
        gambar: 'Rp.359',
        deskripsi: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        productId: '456574',
        kategoriProduk: 'Pembersih',
        tanggalMasuk: '20/4/23',
        stokProduk: 43,
        namaGudang: 'Ronald Martin',
        lokasiGudang: '98789 86757',
        deskripsiProduk: 'Spons cuci',
        jumlahAwal: 60,
        sisaProduk: 43,
        dalamPerjalanan: 17
      },
      {
        id: 9,
        nama_produk: 'Coca Cola',
        jumlah: 'Rp.205',
        gudang: '41 Packets',
        kategori: 'Rp.205000',
        gambar: 'Rp.205.000',
        deskripsi: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        productId: '456575',
        kategoriProduk: 'Minuman',
        tanggalMasuk: '21/4/23',
        stokProduk: 41,
        namaGudang: 'Ronald Martin',
        lokasiGudang: '98789 86757',
        deskripsiProduk: 'Minuman bersoda',
        jumlahAwal: 50,
        sisaProduk: 41,
        dalamPerjalanan: 9
      }
    ];
    
    setProductData(mockData);
    setTotalPages(Math.ceil(mockData.length / itemsPerPage));
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      fotoProduct: file
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditMode) {
      // Update existing product
      setProductData(prev => prev.map(product => 
        product.id === editId 
          ? {
              ...product,
              nama_produk: formData.namaProduct,
              kategoriProduk: formData.kategoriProduct,
              stokProduk: parseInt(formData.jumlah),
              deskripsiProduk: formData.deskripsi,
              foto_produk: formData.fotoProduct ? URL.createObjectURL(formData.fotoProduct) : product.foto_produk
            }
          : product
      ));
    } else {
      // Add new product
      const newProduct = {
        id: productData.length + 1,
        nama_produk: formData.namaProduct,
        jumlah: `Rp.${Math.floor(Math.random() * 500) + 200}`,
        gudang: `${formData.jumlah} Packets`,
        kategori: `Rp.${Math.floor(Math.random() * 500) + 200}`,
        gambar: formData.fotoProduct ? URL.createObjectURL(formData.fotoProduct) : null,
        deskripsi: formData.deskripsi,
        productId: `45657${productData.length + 1}`,
        kategoriProduk: formData.kategoriProduct,
        tanggalMasuk: new Date().toLocaleDateString('en-GB'),
        stokProduk: parseInt(formData.jumlah),
        namaGudang: 'Ronald Martin',
        lokasiGudang: '98789 86757',
        deskripsiProduk: formData.deskripsi,
        jumlahAwal: parseInt(formData.jumlah),
        sisaProduk: parseInt(formData.jumlah),
        dalamPerjalanan: 0,
        foto_produk: formData.fotoProduct ? URL.createObjectURL(formData.fotoProduct) : null
      };
      
      setProductData(prev => [...prev, newProduct]);
      setTotalPages(Math.ceil((productData.length + 1) / itemsPerPage));
    }

    // Reset form and close modal
    resetForm();
    setShowAddModal(false);
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      namaProduct: '',
      kategoriProduct: '',
      jumlah: '',
      deskripsi: '',
      fotoProduct: null,
    });
    setIsEditMode(false);
    setEditId(null);
  };

  // Handle add product
  const handleAddProduct = () => {
    resetForm();
    setShowAddModal(true);
  };

  // Handle edit product
  const handleEditProduct = (product) => {
    setFormData({
      namaProduct: product.nama_produk,
      kategoriProduct: product.kategoriProduk,
      jumlah: product.stokProduk.toString(),
      deskripsi: product.deskripsiProduk || product.deskripsi,
      fotoProduct: null,
    });
    setIsEditMode(true);
    setEditId(product.id);
    setShowAddModal(true);
  };

  // Handle delete product
  const handleDeleteProduct = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      setProductData(prev => prev.filter(product => product.id !== id));
      setTotalPages(Math.ceil((productData.length - 1) / itemsPerPage));
    }
  };

  // Handle view product detail
  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowDetail(true);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setShowAddModal(false);
    resetForm();
  };

  // Handle back from detail
  const handleBackFromDetail = () => {
    setShowDetail(false);
    setSelectedProduct(null);
  };

  // Handle pagination
  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  // Get current page data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return productData.slice(startIndex, endIndex);
  };

  // Calculate overview stats
  const getOverviewStats = () => {
    const categories = [...new Set(productData.map(p => p.kategoriProduk))];
    const lowStockProducts = productData.filter(p => p.stokProduk < 10);
    const totalStock = productData.reduce((sum, p) => sum + p.stokProduk, 0);
    
    return {
      categories: categories.length,
      totalProducts: productData.length,
      totalStock,
      lowStocks: lowStockProducts.length
    };
  };

  const overviewStats = getOverviewStats();

  // Show detail view if selected
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
                <th>Products</th>
                <th>Buying Price</th>
                <th>Quantity</th>
                <th>Threshold Value</th>
                <th>Expiry Date</th>
                <th>Availability</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {getCurrentPageData().map((product) => (
                <tr key={product.id}>
                  <td>
                    <span 
                      className="product-name"
                      onClick={() => handleViewProduct(product)}
                    >
                      {product.nama_produk}
                    </span>
                  </td>
                  <td>{product.jumlah}</td>
                  <td>{product.gudang}</td>
                  <td>{product.kategori}</td>
                  <td>{product.tanggalMasuk}</td>
                  <td>{product.gambar}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="action-btn view-btn"
                        onClick={() => handleViewProduct(product)}
                        title="View"
                      >
                        👁️
                      </button>
                      <button 
                        className="action-btn edit-btn"
                        onClick={() => handleEditProduct(product)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => handleDeleteProduct(product.id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button 
            className="pagination-btn" 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button 
            className="pagination-btn" 
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      <ModalProduct
        show={showAddModal}
        onClose={handleCloseModal}
        formData={formData}
        onChange={handleInputChange}
        onFileChange={handleFileChange}
        onSubmit={handleSubmit}
        isEdit={isEditMode}
      />
    </div>
  );
};

export default Product;