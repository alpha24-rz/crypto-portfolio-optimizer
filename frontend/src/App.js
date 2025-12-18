// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import AssetSelector from './components/AssetSelector';
import PortfolioChart from './components/PortfolioChart';
import axios from 'axios';

function App() {
  // State untuk menyimpan daftar ID aset yang dipilih (misal: ['bitcoin', 'ethereum'])
  const [selectedAssets, setSelectedAssets] = useState(['bitcoin', 'ethereum']);
  
  // State untuk menyimpan data grafik yang akan dikirim ke PortfolioChart
  const [chartData, setChartData] = useState([]);
  
  // State untuk menyimpan informasi lengkap aset (nama, simbol)
  const [assetInfo, setAssetInfo] = useState([
    { id: 'bitcoin', name: 'Bitcoin (BTC)' },
    { id: 'ethereum', name: 'Ethereum (ETH)' }
  ]);
  
  // State untuk loading dan error
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fungsi untuk mengambil data dari backend ketika selectedAssets berubah
  const fetchData = async (assets) => {
    if (!assets || assets.length === 0) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Kirim request ke backend
      // CATATAN: Anda perlu menyesuaikan URL ini dengan endpoint backend Anda
      const response = await axios.post('http://localhost:3000/api/analyze', {
        assets: assets,
        days: 30 // Ambil data 30 hari terakhir
      });
      
      // Format data untuk Recharts
      // Response dari backend harus berupa array objek dengan format:
      // [{ date: '2024-01-01', bitcoin: 45000, ethereum: 3000 }, ...]
      if (response.data.success && response.data.chartData) {
        setChartData(response.data.chartData);
        
        // Update assetInfo dengan data dari backend (jika ada)
        if (response.data.assets) {
          setAssetInfo(response.data.assets);
        }
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Gagal mengambil data. Pastikan backend berjalan di port 3000.');
      setChartData([]); // Kosongkan data jika error
    } finally {
      setIsLoading(false);
    }
  };

  // Gunakan useEffect untuk mengambil data saat pertama kali komponen dimuat
  useEffect(() => {
    fetchData(selectedAssets);
  }, []); // Hanya jalankan sekali saat pertama render

  // Fungsi ini akan dipanggil oleh AssetSelector saat pengguna mengubah pilihan aset
  const handleAssetSelectionChange = (newSelection) => {
    setSelectedAssets(newSelection);
    fetchData(newSelection); // Ambil data baru untuk aset yang dipilih
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Crypto Portfolio Optimizer</h1>
        <p className="subtitle">
          Analisis dan optimasi portofolio aset kripto dengan Modern Portfolio Theory
        </p>
      </header>
      
      <main className="App-main">
        {/* Komponen AssetSelector */}
        <AssetSelector onSelectionChange={handleAssetSelectionChange} />
        
        {/* Status Loading dan Error */}
        {isLoading && (
          <div className="status-message loading">
            <div className="spinner"></div>
            <p>Sedang menganalisis data kripto...</p>
          </div>
        )}
        
        {error && !isLoading && (
          <div className="status-message error">
            <p>⚠️ {error}</p>
          </div>
        )}
        
        {/* Komponen PortfolioChart */}
        <PortfolioChart 
          chartData={chartData} 
          assets={assetInfo} 
        />
        
        {/* Informasi tambahan */}
        <div className="info-box">
          <h4>ℹ️ Cara Menggunakan:</h4>
          <ol>
            <li>Pilih aset kripto yang ingin Anda analisis dari dropdown di atas.</li>
            <li>Sistem akan otomatis mengambil data harga 30 hari terakhir.</li>
            <li>Grafik akan menampilkan perbandingan pergerakan harga.</li>
            <li>(Kedepannya) Hasil optimasi portofolio akan ditampilkan di sini.</li>
          </ol>
        </div>
      </main>
      
      <footer className="App-footer">
        <p>
          <strong>Proyek Portfolio:</strong> Aplikasi analisis kripto ini dibangun dengan React, Node.js, dan Modern Portfolio Theory.
        </p>
      </footer>
    </div>
  );
}

export default App;