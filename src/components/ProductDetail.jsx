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
          <button className="edit-product-btn" onClick={() => onEdit(product.nama_produk)}>
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
                  <div className="detail-label">Product name</div>
                  <div className="detail-value">{product.nama_produk}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Product ID</div>
                  <div className="detail-value">{product.productId || '456567'}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Product category</div>
                  <div className="detail-value">{product.kategoriProduk || 'Makanan'}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">tanggal masuk</div>
                  <div className="detail-value">{product.tanggalMasuk || '13/4/23'}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">stok produk</div>
                  <div className="detail-value">{product.stokProduk || '12'}</div>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>Gudang</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <div className="detail-label">Nama Gudang</div>
                  <div className="detail-value">{product.namaGudang || 'Ronald Martin'}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Lokasi</div>
                  <div className="detail-value">{product.lokasiGudang || '98789 86757'}</div>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>Deskripsi</h3>
              <div className="detail-item">
                <div className="detail-label">Deskripsi Produk</div>
                <div className="detail-value">{product.deskripsiProduk || 'Penyedap makanan'}</div>
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
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                  />
                ) : (
                  'No Image Available'
                )}
              </div>
            </div>

            <div className="stock-info-card">
              <h3>Stock Info</h3>
              <div className="stock-item">
                <span className="stock-label">Jumlah Awal</span>
                <span className="stock-value">{product.jumlahAwal || '40'}</span>
              </div>
              <div className="stock-item">
                <span className="stock-label">Sisa Produk</span>
                <span className="stock-value">{product.sisaProduk || '34'}</span>
              </div>
              <div className="stock-item">
                <span className="stock-label">Dalam Perjalanan</span>
                <span className="stock-value">{product.dalamPerjalanan || '15'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;