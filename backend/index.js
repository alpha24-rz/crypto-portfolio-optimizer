const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

// Middleware dasar untuk parsing JSON (akan berguna nanti)
app.use(express.json());

// Route GET sederhana untuk menguji
app.get('/', (req, res) => {
  res.json({ message: 'API Crypto Portfolio Optimizer siap!' });
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server backend berjalan di http://localhost:${port}`);
});


app.use(cors()); // Aktifkan CORS untuk semua rute