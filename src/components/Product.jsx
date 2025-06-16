// src/pages/Product.jsx
import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import Sidebar from "./sidebar";
import ProductDetail from "./ProductDetail";
import "./Product.css";

const Product = () => {
  const [productData, setProductData] = useState([]);
  const [kategoriList, setKategoriList] = useState([]);
  const [gudangList, setGudangList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    idkategori: "",
    stock: "",
    keterangan: "",
    idgudang: "",
    foto_produk: null,
    masukkan_ke_barang_masuk: false,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchProducts();
    fetchKategori();
    fetchGudang();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/product");
      if (res.data.success) setProductData(res.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchKategori = async () => {
    try {
      const res = await axios.get("/kategori");
      const data = res.data;
      setKategoriList(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error("Gagal memuat data kategori:", error);
    }
  };

  const fetchGudang = async () => {
    try {
      const res = await axios.get("/gudang");
      const data = res.data;
      setGudangList(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error("Gagal memuat data gudang:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, foto_produk: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val !== null) data.append(key, val);
    });
    if (formData.masukkan_ke_barang_masuk) {
      data.set("masukkan_ke_barang_masuk", "1");
    }
    try {
      if (isEditMode && editId) {
        data.append("_method", "PUT");
        await axios.post(`/product/${editId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("/product", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      fetchProducts();
      resetForm();
      setShowAddModal(false);
    } catch (error) {
      alert(error.response?.data?.message || "Error submitting form");
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({
      nama: "",
      idkategori: "",
      stock: "",
      keterangan: "",
      idgudang: "",
      foto_produk: null,
      masukkan_ke_barang_masuk: false,
    });
    setIsEditMode(false);
    setEditId(null);
  };

  const handleAddProduct = () => {
    resetForm();
    setShowAddModal(true);
  };

  const handleEditProduct = (product) => {
    setFormData({
      nama: product.nama || "",
      idkategori: product.idkategori || "",
      stock: product.stock?.toString() || "",
      keterangan: product.keterangan || "",
      idgudang: product.kategori?.gudang?.id || "",
      foto_produk: null,
      masukkan_ke_barang_masuk: false,
    });
    setIsEditMode(true);
    setEditId(product.id);
    setShowAddModal(true);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      try {
        await axios.delete(`/product/${id}`);
        fetchProducts();
      } catch (error) {
        alert("Gagal menghapus produk");
        console.error(error);
      }
    }
  };

  const handleViewProduct = (product) => {
    const productDetail = {
      id: product.id,
      nama_produk: product.nama,
      kategori: product.kategori?.nama_kategori || "Tidak tersedia",
      tanggal_masuk: product.created_at
        ? new Date(product.created_at).toLocaleDateString()
        : "-",
      stock: product.stock,
      keterangan: product.keterangan,
      gudang: {
        nama: product.kategori?.gudang?.nama_gudang || "Tidak tersedia",
        lokasi: product.kategori?.gudang?.lokasi || "Tidak tersedia",
      },
      foto_produk: product.foto_produk
        ? `http://localhost:8000/storage/${product.foto_produk}`
        : null,
    };
    setSelectedProduct(productDetail);
    setShowDetail(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    resetForm();
  };

  const overviewStats = {
    categories: [...new Set(productData.map((p) => p.kategori?.nama_kategori))]
      .length,
    totalProducts: productData.length,
    totalStock: productData.reduce((sum, p) => sum + (p.stock || 0), 0),
    lowStocks: productData.filter((p) => (p.stock || 0) < 10).length,
  };

  const totalPages = Math.ceil(productData.length / itemsPerPage);
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return productData.slice(startIndex, startIndex + itemsPerPage);
  };

  if (showDetail && selectedProduct) {
    return (
      <ProductDetail
        product={selectedProduct}
        onBack={() => {
          setShowDetail(false);
          setSelectedProduct(null);
        }}
        onEdit={handleEditProduct}
      />
    );
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        {/* Overview Cards */}
        <div className="inventory-overview">
          {[
            ["Categories", overviewStats.categories],
            ["Total Products", overviewStats.totalProducts],
            ["Total Stock", overviewStats.totalStock],
            ["Low Stocks", overviewStats.lowStocks],
          ].map(([label, value], i) => (
            <div
              className={`overview-card ${label
                .toLowerCase()
                .replace(/ /g, "-")}`}
              key={i}
            >
              <h3>{label}</h3>
              <div className="overview-number">{value}</div>
              <div className="overview-subtitle">Last 7 days</div>
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="content-header">
          <h1>Products</h1>
          <div className="header-actions">
            <button className="filter-btn">⚙️ Filters</button>
            <button className="add-btn" onClick={handleAddProduct}>
              + Add New Product
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="table-container-scrollable">
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
              {getCurrentPageData().map((product) => (
                <tr key={product.id}>
                  <td>{product.nama}</td>
                  <td>{product.kategori?.nama_kategori || "-"}</td>
                  <td>{product.kategori?.gudang?.nama_gudang || "-"}</td>
                  <td>{product.stock}</td>
                  <td>{product.keterangan}</td>
                  <td>
                    {product.foto_produk ? (
                      <img
                        src={`http://localhost:8000/storage/${product.foto_produk}`}
                        alt={product.nama}
                        style={{
                          width: 80,
                          height: 80,
                          objectFit: "cover",
                          borderRadius: 6,
                        }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="action-buttons">
                    <button
                      title="View"
                      onClick={() => handleViewProduct(product)}
                    >
                      👁️
                    </button>
                    <button
                      title="Edit"
                      onClick={() => handleEditProduct(product)}
                    >
                      ✏️
                    </button>
                    <button
                      title="Delete"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
              {productData.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            &lt; Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next &gt;
          </button>
        </div>

        {/* Modal Form */}
        {showAddModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>{isEditMode ? "Edit Produk" : "Tambah Produk"}</h2>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                {["nama", "stock", "keterangan"].map((field, idx) => (
                  <div className="form-group" key={idx}>
                    <label>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    {field === "keterangan" ? (
                      <textarea
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <input
                        type={field === "stock" ? "number" : "text"}
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        required
                      />
                    )}
                  </div>
                ))}

                {[
                  {
                    name: "idkategori",
                    label: "Kategori",
                    data: kategoriList,
                    valueKey: "idkategori",
                    labelKey: "nama_kategori",
                  },
                  {
                    name: "idgudang",
                    label: "Gudang",
                    data: gudangList,
                    valueKey: "id",
                    labelKey: "nama_gudang",
                  },
                ].map((select, idx) => (
                  <div className="form-group" key={idx}>
                    <label>{select.label}</label>
                    <select
                      name={select.name}
                      value={formData[select.name]}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">-- Pilih {select.label} --</option>
                      {select.data.map((item) => (
                        <option
                          key={item[select.valueKey]}
                          value={item[select.valueKey]}
                        >
                          {item[select.labelKey]}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

                <div className="form-group">
                  <label>Foto Produk</label>
                  <input
                    type="file"
                    name="foto_produk"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="masukkan_ke_barang_masuk"
                      checked={formData.masukkan_ke_barang_masuk}
                      onChange={handleInputChange}
                    />
                    Masukkan ke barang masuk
                  </label>
                </div>

                <div className="modal-actions">
                  <button type="submit" className="btn-submit">
                    {isEditMode ? "Update" : "Simpan"}
                  </button>
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={handleCloseModal}
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
