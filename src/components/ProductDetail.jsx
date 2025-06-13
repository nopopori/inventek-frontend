
import React from 'react';
import Sidebar from './sidebar';
import './Product.css';

const ProductDetail = ({ product, onBack, onEdit }) => {
  if (!product) return null;

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <div className="detail-header">
          <button className="back-btn" onClick={onBack}>
            ← Kembali
          </button>
          <button className="edit-product-btn" onClick={() => onEdit(product)}>
            ✏️ Edit
          </button>
        </div>

        <div className="detail-content">
          <div className="detail-main">
            <h2>{product.nama_produk}</h2>
            
            <div className="detail-section">
              <h3>Detail Produk</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <div className="detail-label">Nama Produk</div>
                  <div className="detail-value">{product.nama_produk}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">ID Produk</div>
                  <div className="detail-value">{product.id}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Kategori</div>
                  <div className="detail-value">{product.kategori || 'Tidak tersedia'}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Tanggal Masuk</div>
                  <div className="detail-value">{product.tanggal_masuk}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Stok Produk</div>
                  <div className="detail-value">{product.stock}</div>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>Gudang</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <div className="detail-label">Nama Gudang</div>
                  <div className="detail-value">{product.gudang?.nama || 'Tidak tersedia'}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Lokasi Gudang</div>
                  <div className="detail-value">{product.gudang?.lokasi || 'Tidak tersedia'}</div>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>Deskripsi</h3>
              <div className="detail-item">
                <div className="detail-label">Deskripsi Produk</div>
                <div className="detail-value">{product.keterangan || '-'}</div>
              </div>
            </div>
          </div>

          <div className="detail-sidebar">
            <div className="product-image-card">
              <div className="product-image">
                {product.foto_produk ? (
                  <img 
                    src={product.foto_produk} 
                    alt={product.nama_produk}
                    style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                  />
                ) : (
                  <p>Foto tidak tersedia</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
