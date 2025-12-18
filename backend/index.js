// app.js (backend)
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

// Middleware
app.use(cors()); // Izinkan request dari frontend (localhost:3001)
app.use(express.json()); // Untuk parsing body request JSON

// ===== ENDPOINT DUMMY /api/analyze =====
app.post('/api/analyze', (req, res) => {
  console.log('📩 Request diterima:', req.body); // Log request untuk debugging
  
  // Data yang dikirim dari frontend
  const { assets, days } = req.body;
  
  // 1. Validasi input sederhana
  if (!assets || !Array.isArray(assets) || assets.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Parameter "assets" (array) diperlukan.'
    });
  }
  
  // 2. Buat data dummy (harga historis 30 hari terakhir)
  const dummyChartData = [];
  const today = new Date();
  
  // Generate data untuk 30 hari terakhir
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    const dataPoint = {
      date: date.toISOString().split('T')[0], // Format: YYYY-MM-DD
    };
    
    // Beri harga dummy untuk setiap aset dalam request
    assets.forEach(assetId => {
      // Harga dasar berbeda per aset
      let basePrice = 50000; // Bitcoin
      if (assetId.includes('ethereum')) basePrice = 3000;
      if (assetId.includes('solana')) basePrice = 150;
      if (assetId.includes('cardano')) basePrice = 0.5;
      
      // Tambahkan variasi random agar grafik tidak datar
      const variation = Math.sin(i * 0.5) * 0.1 * basePrice; // Pola sinus
      const randomNoise = (Math.random() - 0.5) * 0.05 * basePrice; // Noise kecil
      
      dataPoint[assetId] = Math.round(basePrice + variation + randomNoise);
    });
    
    dummyChartData.push(dataPoint);
  }
  
  // 3. Buat informasi aset untuk dikirim ke frontend
  const assetNames = {
    'bitcoin': 'Bitcoin (BTC)',
    'ethereum': 'Ethereum (ETH)',
    'solana': 'Solana (SOL)',
    'cardano': 'Cardano (ADA)'
  };
  
  const assetInfo = assets.map(id => ({
    id: id,
    name: assetNames[id] || `${id.charAt(0).toUpperCase() + id.slice(1)}`
  }));
  
  // 4. Kirim response
  res.json({
    success: true,
    message: `Analisis untuk ${assets.length} aset (${days} hari) berhasil!`,
    assets: assetInfo,
    chartData: dummyChartData,
    // Data dummy untuk hasil optimasi (akan digunakan nanti)
    optimizationResults: {
      optimalWeights: assets.map(() => (1 / assets.length).toFixed(2)), // Bagi rata
      expectedReturn: '12.5',
      expectedRisk: '18.2',
      sharpeRatio: '0.69'
    }
  });
});

// Route GET sederhana (jika sudah ada, biarkan saja)
app.get('/', (req, res) => {
  res.json({ message: 'API Crypto Portfolio Optimizer siap!' });
});

// Jalankan server
app.listen(port, () => {
  console.log(`✅ Server backend berjalan di http://localhost:${port}`);
});