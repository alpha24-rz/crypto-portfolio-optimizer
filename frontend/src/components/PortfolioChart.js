// src/components/PortfolioChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function PortfolioChart({ chartData, assets }) {
  // Jika belum ada data, tampilkan pesan
  if (!chartData || chartData.length === 0) {
    return (
      <div className="portfolio-chart">
        <h3>📈 Grafik Harga Historis</h3>
        <div className="no-data">
          <p>Belum ada data untuk ditampilkan.</p>
          <p>Pilih aset kripto dan klik "Analisis" untuk memulai.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-chart">
      <h3>📈 Grafik Harga Historis</h3>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(value) => new Date(value).toLocaleDateString('id-ID')}
              stroke="#666"
            />
            <YAxis 
              stroke="#666"
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip 
              formatter={(value) => [`$${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Harga']}
              labelFormatter={(label) => `Tanggal: ${new Date(label).toLocaleDateString('id-ID')}`}
            />
            <Legend />
            
            {/* Render satu Line untuk setiap aset */}
            {assets.map((asset, index) => {
              // Tentukan warna yang berbeda untuk setiap garis
              const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];
              const color = colors[index % colors.length];
              
              return (
                <Line
                  key={asset.id}
                  type="monotone"
                  dataKey={asset.id}
                  name={asset.name}
                  stroke={color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <style jsx>{`
        .portfolio-chart {
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          margin-bottom: 25px;
        }
        h3 {
          margin-top: 0;
          color: #2c3e50;
          margin-bottom: 20px;
        }
        .no-data {
          text-align: center;
          padding: 60px 20px;
          color: #6c757d;
          background: #f8f9fa;
          border-radius: 8px;
          border: 2px dashed #dee2e6;
        }
        .chart-wrapper {
          background: white;
          border-radius: 8px;
          padding: 15px;
          border: 1px solid #e9ecef;
        }
      `}</style>
    </div>
  );
}

export default PortfolioChart;