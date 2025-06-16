import React, { useRef } from "react";
import "./ModalDownload.css";

const ModalDownload = ({ isOpen, onClose, data, activeTab }) => {
  const printRef = useRef();

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Preview</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background: #f4f4f4; }
          </style>
        </head>
        <body>
          <h2>Laporan Barang ${activeTab === "masuk" ? "Masuk" : "Keluar"}</h2>
          ${printContents}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">
          Preview Laporan Barang {activeTab === "masuk" ? "Masuk" : "Keluar"}
        </h2>
        <div ref={printRef} className="print-content">
          <table>
            <thead>
              <tr>
                {activeTab === "masuk" ? (
                  <>
                    <th>Nama Produk</th>
                    <th>Stock Masuk</th>
                    <th>Tanggal Masuk</th>
                    <th>Gudang</th>
                    <th>Kategori</th>
                    <th>Keterangan</th>
                  </>
                ) : (
                  <>
                    <th>Nama Produk</th>
                    <th>Stock Keluar</th>
                    <th>Tanggal Keluar</th>
                    <th>Alasan</th>
                    <th>Gudang</th>
                    <th>Kategori</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  {activeTab === "masuk" ? (
                    <>
                      <td>{item.nama_produk || item.produk?.nama || "—"}</td>
                      <td>{item.stock_masuk}</td>
                      <td>
                        {new Date(item.tanggal_masuk).toLocaleDateString()}
                      </td>
                      <td>
                        {item.product?.kategori?.gudang?.nama_gudang || "—"}
                      </td>
                      <td>{item.product?.kategori?.nama_kategori || "—"}</td>

                      <td>{item.keterangan || "—"}</td>
                    </>
                  ) : (
                    <>
                      <td>{item.nama_produk || item.produk?.nama || "—"}</td>
                      <td>{item.stock_keluar}</td>
                      <td>
                        {new Date(item.tanggal_keluar).toLocaleDateString()}
                      </td>
                      <td>{item.alasan_keluar || "—"}</td>
                      <td>
                        {item.product?.kategori?.gudang?.nama_gudang || "—"}
                      </td>
                      <td>{item.product?.kategori?.nama_kategori || "—"}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="modal-actions">
          <button onClick={handlePrint} className="btn-print">
            Print
          </button>
          <button onClick={onClose} className="btn-close">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDownload;
