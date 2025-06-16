import React, { useState, useEffect } from "react";
import "../../components/Laporan.css";
import axios from "../../api/axios";

const ModalBarangMasuk = ({ isOpen, onClose, refreshData, editItem }) => {
  const [products, setProducts] = useState([]);
  const [gudangOptions, setGudangOptions] = useState([]);
  const [kategoriOptions, setKategoriOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  

  const initialForm = {
    gudang_id: "",
    kategori_id: "",
    idproduk: "",
    stock_masuk: "",
    tanggal_masuk: new Date().toISOString().slice(0, 10),
  };
  const [formData, setFormData] = useState(initialForm);

  // Helper untuk ambil properti secara aman
  const getSafe = (path, fallback = "") => {
    try {
      return path ?? fallback;
    } catch {
      return fallback;
    }
  };

  const initializeFormData = () => {
    if (editItem) {
      const product = editItem.product || {};
      const kategori = product.kategori || {};
      const gudang = kategori.gudang || {};

      setFormData({
        gudang_id: getSafe(gudang.id.toString()),
        kategori_id: getSafe(kategori.idkategori?.toString()),
        idproduk: getSafe(product.id?.toString()),
        stock_masuk: getSafe(editItem.stock_masuk),
        tanggal_masuk:
          getSafe(editItem.tanggal_masuk)?.slice(0, 10) ||
          new Date().toISOString().slice(0, 10),
      });
    } else {
      setFormData(initialForm);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchProducts();
      initializeFormData();
    }
  }, [isOpen, editItem]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/product");
      if (res.data.success) {
        const list = res.data.data;
        setProducts(list);
        extractOptions(list);
      } else {
        setProducts([]);
      }
      setError("");
    } catch (err) {
      console.error("Error:", err);
      setError("Gagal memuat produk.");
    } finally {
      setLoading(false);
    }
  };

  const extractOptions = (productList) => {
    const uniqueGudang = [];
    const uniqueKategori = [];

    productList.forEach((p) => {
      const gudang = p.kategori?.gudang;
      const kategori = p.kategori;

      if (gudang && !uniqueGudang.some((g) => g.id === gudang.id)) {
        uniqueGudang.push(gudang);
      }

      if (
        kategori &&
        !uniqueKategori.some((k) => k.idkategori === kategori.idkategori)
      ) {
        uniqueKategori.push({
          ...kategori,
          gudang_id:
            kategori.gudang_id || kategori.idgudang || kategori.gudang?.id,
        });
      }
    });

    setGudangOptions(uniqueGudang);
    setKategoriOptions(uniqueKategori);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };

    if (name === "gudang_id") {
      updated.kategori_id = "";
      updated.idproduk = "";
    } else if (name === "kategori_id") {
      updated.idproduk = "";
    }

    setFormData(updated);
  };

  
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const selectedProduct = products.find(
      (p) => p.id.toString() === formData.idproduk.toString()
    );

    if (!selectedProduct) throw new Error("Produk tidak ditemukan.");

    const dataToSubmit = {
      ...formData,
      product_name: selectedProduct.nama,
      category_name: selectedProduct.kategori?.nama_kategori,
      warehouse_name: selectedProduct.kategori?.gudang?.nama_gudang,
    };

    if (editItem) {
      await axios.put(`/barang-masuk/${editItem.id}`, {
        ...dataToSubmit,
        old_stock: editItem.stock_masuk, // penting buat perhitungan di controller
      });
    } else {
      await axios.post("/barang-masuk", dataToSubmit);
    }

    onClose();
    if (refreshData) refreshData();
    setFormData(initialForm);
  } catch (err) {
    console.error("Error submit:", err);
    setError(err?.response?.data?.message || "Gagal menyimpan data.");
  } finally {
    setLoading(false);
  }
};

  const handleCancel = () => {
    onClose();
    setFormData(initialForm);
  };

  const filteredKategori = kategoriOptions.filter(
    (k) => k.gudang_id?.toString() === formData.gudang_id
  );

  const filteredProduk = products.filter(
    (produk) =>
      produk.idkategori == formData.kategori_id &&
      produk.idgudang == formData.gudang_id
  );

  if (!isOpen) return null;

  
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{editItem ? "Edit Barang Masuk" : "Tambah Barang Masuk"}</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label>Gudang *</label>
              <select
                name="gudang_id"
                value={formData.gudang_id}
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="">Pilih gudang</option>
                {gudangOptions.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.nama_gudang}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Kategori *</label>
              <select
                name="kategori_id"
                value={formData.kategori_id}
                onChange={handleChange}
                required
                disabled={!formData.gudang_id || loading}
              >
                <option value="">Pilih kategori</option>
                {filteredKategori.map((k) => (
                  <option key={k.idkategori} value={k.idkategori}>
                    {k.nama_kategori}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Produk *</label>
              <select
                name="idproduk"
                value={formData.idproduk}
                onChange={handleChange}
                required
                disabled={!formData.kategori_id || loading || !!editItem}
              >
                <option value="">Pilih produk</option>
                {filteredProduk.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nama}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Jumlah Stock Masuk *</label>
              <input
                type="number"
                name="stock_masuk"
                value={formData.stock_masuk}
                onChange={handleChange}
                required
                min="1"
                placeholder="0"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Tanggal Masuk *</label>
              <input
                type="date"
                name="tanggal_masuk"
                value={formData.tanggal_masuk}
                onChange={handleChange}
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
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading
                ? "Processing..."
                : editItem
                ? "Update Barang Masuk"
                : "Tambah Barang Masuk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalBarangMasuk;
