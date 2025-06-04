import React, { useEffect, useState } from 'react';

const ModalProduct = ({
  show,
  onClose,
  formData,
  onChange,
  onFileChange,
  onSubmit,
  isEditMode,
  kategoriList,
  gudangList,
}) => {
  const [filteredKategori, setFilteredKategori] = useState([]);

  // Filter kategori setiap kali formData.idgudang berubah
  useEffect(() => {
    if (formData.idgudang) {
      const filtered = kategoriList.filter(k => k.idgudang?.toString() === formData.idgudang.toString());
      setFilteredKategori(filtered);
    } else {
      setFilteredKategori([]);
    }
  }, [formData.idgudang, kategoriList]);

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditMode ? 'Edit Produk' : 'Tambah Produk'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={onSubmit} encType="multipart/form-data" className="product-form">
          <div className="form-group">
            <label htmlFor="nama">Nama Produk</label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={onChange}
              placeholder="Masukkan nama produk"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="idgudang">Gudang</label>
            <select
              id="idgudang"
              name="idgudang"
              value={formData.idgudang || ''}
              onChange={onChange}
              required
            >
              <option value="">Pilih Gudang</option>
              {gudangList.map((g, index) => (
                <option key={g.id ?? index} value={g.id?.toString() ?? ''}>
                  {g.nama_gudang || 'Gudang Tidak Diketahui'}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="idkategori">Kategori</label>
            <select
              id="idkategori"
              name="idkategori"
              value={formData.idkategori || ''}
              onChange={onChange}
              required
              disabled={!formData.idgudang} // Disable kalau belum pilih gudang
            >
              <option value="">Pilih Kategori</option>
              {filteredKategori.length > 0 ? (
                filteredKategori.map((k, index) => (
                  <option key={k.idkategori ?? index} value={k.idkategori?.toString() ?? ''}>
                    {k.nama_kategori || 'Kategori Tidak Diketahui'}
                  </option>
                ))
              ) : (
                <option value="" disabled>Tidak ada kategori untuk gudang ini</option>
              )}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={onChange}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="keterangan">Keterangan</label>
            <textarea
              id="keterangan"
              name="keterangan"
              value={formData.keterangan}
              onChange={onChange}
              rows={3}
              placeholder="Deskripsi produk (opsional)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="foto_produk">Foto Produk</label>
            <input
              type="file"
              id="foto_produk"
              name="foto_produk"
              onChange={onFileChange}
              accept="image/*"
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="masukkan_ke_barang_masuk"
                checked={formData.masukkan_ke_barang_masuk || false}
                onChange={onChange}
              />
              Masukkan ke Barang Masuk
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="submit-btn">
              {isEditMode ? 'Update Produk' : 'Tambah Produk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalProduct;
