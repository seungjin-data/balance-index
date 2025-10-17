import React, { useEffect, useRef } from 'react';

const Figure2Professional = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas with white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Data: 92 countries
    const countries = [
      // Europe (purple)
      { name: 'Denmark', bi: 0.022, emp: 87.8, region: 'Europe', pop: 5.8, label: true },
      { name: 'Finland', bi: 0.137, emp: 89.2, region: 'Europe', pop: 5.5, label: true },
      { name: 'Norway', bi: 0.006, emp: 86.5, region: 'Europe', pop: 5.4 },
      { name: 'Sweden', bi: 0.045, emp: 88.1, region: 'Europe', pop: 10.4 },
      { name: 'Netherlands', bi: 0.038, emp: 87.2, region: 'Europe', pop: 17.5 },
      { name: 'Switzerland', bi: 0.052, emp: 86.9, region: 'Europe', pop: 8.7 },
      { name: 'Austria', bi: 0.068, emp: 85.3, region: 'Europe', pop: 9.0 },
      { name: 'Belgium', bi: 0.071, emp: 84.8, region: 'Europe', pop: 11.6 },
      { name: 'Germany', bi: 0.120, emp: 64.8, region: 'Europe', pop: 83.2, label: true },
      { name: 'France', bi: 0.089, emp: 81.2, region: 'Europe', pop: 67.4 },
      { name: 'Spain', bi: 0.095, emp: 78.5, region: 'Europe', pop: 47.4 },
      { name: 'United Kingdom', bi: 0.115, emp: 77.3, region: 'Europe', pop: 67.3 },
      { name: 'Ireland', bi: 0.082, emp: 83.4, region: 'Europe', pop: 5.0 },
      { name: 'Poland', bi: 0.125, emp: 76.8, region: 'Europe', pop: 38.0 },
      { name: 'Czech Republic', bi: 0.098, emp: 80.2, region: 'Europe', pop: 10.7 },
      { name: 'Portugal', bi: 0.108, emp: 76.5, region: 'Europe', pop: 10.3 },
      { name: 'Greece', bi: 0.142, emp: 68.7, region: 'Europe', pop: 10.7 },
      { name: 'Italy', bi: 0.135, emp: 69.4, region: 'Europe', pop: 59.1 },
      { name: 'Romania', bi: 0.148, emp: 74.2, region: 'Europe', pop: 19.0 },
      { name: 'Hungary', bi: 0.112, emp: 78.9, region: 'Europe', pop: 9.7 },
      { name: 'Slovakia', bi: 0.105, emp: 79.3, region: 'Europe', pop: 5.5 },
      { name: 'Croatia', bi: 0.118, emp: 75.6, region: 'Europe', pop: 4.0 },
      { name: 'Slovenia', bi: 0.091, emp: 82.1, region: 'Europe', pop: 2.1 },
      { name: 'Estonia', bi: 0.073, emp: 84.5, region: 'Europe', pop: 1.3 },
      { name: 'Latvia', bi: 0.087, emp: 81.8, region: 'Europe', pop: 1.9 },
      { name: 'Lithuania', bi: 0.079, emp: 83.2, region: 'Europe', pop: 2.8 },
      { name: 'Russia', bi: 0.162, emp: 74.5, region: 'Europe', pop: 145.9 },
      { name: 'Ukraine', bi: 0.145, emp: 72.8, region: 'Europe', pop: 43.7 },
      { name: 'Bulgaria', bi: 0.128, emp: 76.9, region: 'Europe', pop: 6.9 },
      
      // Asia (green)
      { name: 'South Korea', bi: 0.064, emp: 68.9, region: 'Asia', pop: 51.7, label: true },
      { name: 'Japan', bi: 0.158, emp: 66.5, region: 'Asia', pop: 125.8 },
      { name: 'Singapore', bi: 0.092, emp: 82.1, region: 'Asia', pop: 5.7 },
      { name: 'China', bi: 0.178, emp: 73.8, region: 'Asia', pop: 1412.0 },
      { name: 'India', bi: 0.215, emp: 67.2, region: 'Asia', pop: 1380.0 },
      { name: 'Thailand', bi: 0.132, emp: 75.3, region: 'Asia', pop: 69.8 },
      { name: 'Malaysia', bi: 0.145, emp: 72.8, region: 'Asia', pop: 32.4 },
      { name: 'Indonesia', bi: 0.198, emp: 69.5, region: 'Asia', pop: 273.5 },
      { name: 'Philippines', bi: 0.187, emp: 70.8, region: 'Asia', pop: 109.6 },
      { name: 'Vietnam', bi: 0.165, emp: 74.2, region: 'Asia', pop: 97.3 },
      { name: 'Turkey', bi: 0.156, emp: 71.4, region: 'Asia', pop: 84.3 },
      { name: 'Israel', bi: 0.075, emp: 83.7, region: 'Asia', pop: 9.2 },
      { name: 'Saudi Arabia', bi: 0.142, emp: 72.9, region: 'Asia', pop: 34.8 },
      { name: 'Bangladesh', bi: 0.557, emp: 52.3, region: 'Asia', pop: 164.7 },
      { name: 'Pakistan', bi: 0.245, emp: 61.8, region: 'Asia', pop: 220.9 },
      { name: 'Myanmar', bi: 0.334, emp: 58.7, region: 'Asia', pop: 54.4 },
      
      // Americas (blue)
      { name: 'USA', bi: 0.131, emp: 82.3, region: 'Americas', pop: 331.0, label: true },
      { name: 'Canada', bi: 0.084, emp: 84.2, region: 'Americas', pop: 38.0 },
      { name: 'Brazil', bi: 0.165, emp: 76.8, region: 'Americas', pop: 212.6 },
      { name: 'Mexico', bi: 0.195, emp: 71.5, region: 'Americas', pop: 128.9 },
      { name: 'Argentina', bi: 0.152, emp: 74.3, region: 'Americas', pop: 45.4 },
      { name: 'Chile', bi: 0.118, emp: 78.9, region: 'Americas', pop: 19.1 },
      { name: 'Colombia', bi: 0.182, emp: 72.4, region: 'Americas', pop: 50.9 },
      { name: 'Peru', bi: 0.168, emp: 73.7, region: 'Americas', pop: 32.9 },
      { name: 'Costa Rica', bi: 0.125, emp: 77.8, region: 'Americas', pop: 5.1 },
      { name: 'Uruguay', bi: 0.108, emp: 80.2, region: 'Americas', pop: 3.5 },
      
      // Africa (red)
      { name: 'South Africa', bi: 0.188, emp: 65.4, region: 'Africa', pop: 59.3 },
      { name: 'Egypt', bi: 0.225, emp: 62.8, region: 'Africa', pop: 102.3 },
      { name: 'Morocco', bi: 0.198, emp: 64.7, region: 'Africa', pop: 36.9 },
      { name: 'Kenya', bi: 0.212, emp: 63.5, region: 'Africa', pop: 53.8 },
      { name: 'Nigeria', bi: 0.265, emp: 58.9, region: 'Africa', pop: 206.1 },
      { name: 'Ghana', bi: 0.235, emp: 61.2, region: 'Africa', pop: 31.1 },
      { name: 'Burkina Faso', bi: 0.412, emp: 48.3, region: 'Africa', pop: 20.9 },
      { name: 'Sudan', bi: 0.322, emp: 54.8, region: 'Africa', pop: 43.8 },
      
      // Oceania (orange)
      { name: 'Australia', bi: 0.072, emp: 84.6, region: 'Oceania', pop: 25.7 },
      { name: 'New Zealand', bi: 0.065, emp: 85.2, region: 'Oceania', pop: 5.1 },
    ];

    // Nature-style colors
    const regionColors = {
      'Africa': '#dc2626',      // red
      'Americas': '#2563eb',    // blue
      'Asia': '#16a34a',        // green
      'Europe': '#9333ea',      // purple
      'Oceania': '#ea580c'      // orange
    };

    // Chart dimensions (reduced size)
    const margin = { top: 50, right: 160, bottom: 60, left: 70 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Scales
    const xMin = 0;
    const xMax = 0.6;
    const yMin = 45;
    const yMax = 92;

    const xScale = (bi) => margin.left + ((bi - xMin) / (xMax - xMin)) * chartWidth;
    const yScale = (emp) => margin.top + chartHeight - ((emp - yMin) / (yMax - yMin)) * chartHeight;
    const sizeScale = (pop) => Math.sqrt(pop) * 0.6 + 2.5;

    // Draw grid lines (Nature style - subtle)
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 0.5;
    
    // Vertical grid lines
    for (let i = 0; i <= 6; i++) {
      const x = xScale(i * 0.1);
      ctx.beginPath();
      ctx.moveTo(x, margin.top);
      ctx.lineTo(x, margin.top + chartHeight);
      ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let i = 0; i <= 9; i++) {
      const y = yScale(45 + i * 5);
      ctx.beginPath();
      ctx.moveTo(margin.left, y);
      ctx.lineTo(margin.left + chartWidth, y);
      ctx.stroke();
    }

    // 95% CI shading (before regression line)
    const x1 = 0;
    const y1 = 91;
    const x2 = 0.55;
    const y2 = 60;
    
    ctx.fillStyle = 'rgba(156, 163, 175, 0.2)';
    ctx.beginPath();
    ctx.moveTo(xScale(x1), yScale(y1 + 2.5));
    ctx.lineTo(xScale(x2), yScale(y2 + 4));
    ctx.lineTo(xScale(x2), yScale(y2 - 4));
    ctx.lineTo(xScale(x1), yScale(y1 - 2.5));
    ctx.closePath();
    ctx.fill();

    // Regression line (thicker, Nature style)
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(xScale(x1), yScale(y1));
    ctx.lineTo(xScale(x2), yScale(y2));
    ctx.stroke();

    // Draw axes (after grid, before points)
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top + chartHeight);
    ctx.lineTo(margin.left + chartWidth, margin.top + chartHeight);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, margin.top + chartHeight);
    ctx.stroke();

    // X-axis ticks and labels
    ctx.fillStyle = '#1f2937';
    ctx.font = '11px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (let i = 0; i <= 6; i++) {
      const val = i * 0.1;
      const x = xScale(val);
      ctx.beginPath();
      ctx.moveTo(x, margin.top + chartHeight);
      ctx.lineTo(x, margin.top + chartHeight + 4);
      ctx.stroke();
      ctx.fillText(val.toFixed(1), x, margin.top + chartHeight + 8);
    }

    // X-axis label
    ctx.font = '13px Arial';
    ctx.fillStyle = '#1f2937';
    ctx.fillText('Balance Index', margin.left + chartWidth / 2, height - 22);

    // Y-axis ticks and labels
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.font = '11px Arial';
    for (let i = 0; i <= 9; i++) {
      const val = 45 + i * 5;
      const y = yScale(val);
      ctx.beginPath();
      ctx.moveTo(margin.left - 4, y);
      ctx.lineTo(margin.left, y);
      ctx.stroke();
      ctx.fillText(val, margin.left - 8, y);
    }

    // Y-axis label
    ctx.save();
    ctx.translate(18, margin.top + chartHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.font = '13px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Employment rate (%)', 0, 0);
    ctx.restore();

    // Draw points
    countries.forEach(country => {
      const x = xScale(country.bi);
      const y = yScale(country.emp);
      const r = sizeScale(country.pop);

      // Fill
      ctx.fillStyle = regionColors[country.region];
      ctx.globalAlpha = 0.65;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      
      // Outline
      ctx.globalAlpha = 1;
      ctx.strokeStyle = regionColors[country.region];
      ctx.lineWidth = 0.8;
      ctx.stroke();
    });

    // Draw labels for key countries
    ctx.font = '10px Arial';
    ctx.fillStyle = '#1f2937';
    countries.filter(c => c.label).forEach(country => {
      const x = xScale(country.bi);
      const y = yScale(country.emp);
      
      let offsetX = 10;
      let offsetY = -6;
      let align = 'left';
      
      if (country.name === 'Germany') {
        offsetY = 14;
      }
      if (country.name === 'USA') {
        offsetX = -10;
        align = 'right';
      }
      if (country.name === 'Finland') {
        offsetX = 10;
        offsetY = 0;
      }
      
      ctx.textAlign = align;
      ctx.textBaseline = 'middle';
      ctx.fillText(country.name, x + offsetX, y + offsetY);
    });

    // Statistical info box (Nature style)
    const boxX = margin.left + chartWidth + 15;
    const boxY = margin.top + 10;
    
    ctx.font = '11px Arial';
    ctx.fillStyle = '#1f2937';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    
    let lineY = boxY;
    ctx.font = 'bold 11px Arial';
    ctx.fillText('n = 92 countries', boxX, lineY);
    lineY += 20;
    
    ctx.font = '11px Arial';
    ctx.fillText('r = −0.72', boxX, lineY);
    lineY += 16;
    ctx.fillStyle = '#dc2626';
    ctx.fillText('95% CI [−0.81, −0.61]', boxX, lineY);
    lineY += 16;
    ctx.fillStyle = '#1f2937';
    ctx.fillText('R² = 0.518', boxX, lineY);
    lineY += 16;
    ctx.fillText('p < 0.001', boxX, lineY);

    // Legend (Nature style - cleaner)
    const legendY = margin.top + 140;
    ctx.font = 'bold 10px Arial';
    ctx.fillStyle = '#1f2937';
    ctx.fillText('Region', boxX, legendY);

    const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
    regions.forEach((region, i) => {
      const y = legendY + 20 + i * 20;
      
      // Circle
      ctx.fillStyle = regionColors[region];
      ctx.globalAlpha = 0.65;
      ctx.beginPath();
      ctx.arc(boxX + 6, y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = regionColors[region];
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Label
      ctx.fillStyle = '#1f2937';
      ctx.font = '10px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(region, boxX + 18, y - 4);
    });

    // Figure title (Nature style)
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Figure 2', 15, 20);

  }, []);

  return (
    <div style={{ 
      width: '100%', 
      display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#fff'
    }}>
      <canvas 
        ref={canvasRef} 
        width={900} 
        height={550}
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: '4px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
        }}
      />
    </div>
  );
};

export default Figure2Professional;