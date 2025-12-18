// src/components/AssetSelector.js
import React, { useState } from 'react';

function AssetSelector({ onSelectionChange }) {
  // Daftar aset kripto default. Anda bisa menambah atau mengambilnya dari API nanti.
  const [assets] = useState([
    { id: 'bitcoin', name: 'Bitcoin (BTC)', symbol: 'btc' },
    { id: 'ethereum', name: 'Ethereum (ETH)', symbol: 'eth' },
    { id: 'solana', name: 'Solana (SOL)', symbol: 'sol' },
    { id: 'cardano', name: 'Cardano (ADA)', symbol: 'ada' },
  ]);

  // State untuk menyimpan aset yang saat ini dipilih
  const [selectedAssets, setSelectedAssets] = useState(['bitcoin', 'ethereum']);

  // Fungsi yang dijalankan saat pengguna mengubah pilihan di dropdown
  const handleAssetChange = (event, index) => {
    const newSelection = [...selectedAssets];
    newSelection[index] = event.target.value;
    setSelectedAssets(newSelection);
    
    // Kirimkan pilihan terbaru ke komponen induk (App.js)
    if (onSelectionChange) {
      onSelectionChange(newSelection);
    }
  };

  // Fungsi untuk menambah dropdown pilihan aset baru
  const addAssetSlot = () => {
    if (selectedAssets.length < 4) { // Batasi maksimal 4 aset untuk contoh ini
      const newSelection = [...selectedAssets, 'bitcoin']; // Default pilihan baru Bitcoin
      setSelectedAssets(newSelection);
      if (onSelectionChange) {
        onSelectionChange(newSelection);
      }
    }
  };

  // Fungsi untuk menghapus dropdown pilihan aset
  const removeAssetSlot = (index) => {
    if (selectedAssets.length > 1) { // Minimal harus ada 1 aset
      const newSelection = selectedAssets.filter((_, i) => i !== index);
      setSelectedAssets(newSelection);
      if (onSelectionChange) {
        onSelectionChange(newSelection);
      }
    }
  };

  return (
    <div className="asset-selector">
      <h3>📊 Pilih Aset Kripto untuk Dianalisis</h3>
      <p className="helper-text">Pilih minimal 2 aset untuk optimasi portofolio.</p>
      
      {/* Render dropdown untuk setiap aset yang dipilih */}
      {selectedAssets.map((assetId, index) => (
        <div key={index} className="asset-dropdown-wrapper">
          <label>Aset {index + 1}:</label>
          <select 
            value={assetId}
            onChange={(e) => handleAssetChange(e, index)}
            className="asset-dropdown"
          >
            {assets.map(asset => (
              <option key={asset.id} value={asset.id}>
                {asset.name}
              </option>
            ))}
          </select>
          {/* Tombol hapus, tampilkan hanya jika ada lebih dari 1 aset */}
          {selectedAssets.length > 1 && (
            <button 
              type="button" 
              onClick={() => removeAssetSlot(index)}
              className="btn-remove"
              aria-label="Hapus aset"
            >
              ✕
            </button>
          )}
        </div>
      ))}
      
      {/* Tombol untuk menambah aset baru, tampilkan hanya jika kurang dari batas maksimum */}
      {selectedAssets.length < 4 && (
        <button 
          type="button" 
          onClick={addAssetSlot}
          className="btn-add"
        >
          + Tambah Aset Lain
        </button>
      )}
      
      <style jsx>{`
        .asset-selector {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 25px;
          border: 1px solid #e9ecef;
        }
        h3 {
          margin-top: 0;
          color: #2c3e50;
        }
        .helper-text {
          color: #6c757d;
          font-size: 0.9rem;
          margin-bottom: 15px;
        }
        .asset-dropdown-wrapper {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
          gap: 10px;
        }
        label {
          font-weight: 600;
          min-width: 60px;
        }
        .asset-dropdown {
          flex: 1;
          padding: 10px 15px;
          border: 1px solid #ced4da;
          border-radius: 6px;
          background-color: white;
          font-size: 1rem;
          cursor: pointer;
        }
        .asset-dropdown:focus {
          outline: 2px solid #4dabf7;
          border-color: transparent;
        }
        .btn-remove {
          background: #dc3545;
          color: white;
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          cursor: pointer;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .btn-remove:hover {
          background: #c82333;
        }
        .btn-add {
          background: #007bff;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 10px 20px;
          cursor: pointer;
          font-size: 1rem;
          margin-top: 10px;
          transition: background 0.2s;
        }
        .btn-add:hover {
          background: #0056b3;
        }
      `}</style>
    </div>
  );
}

export default AssetSelector;