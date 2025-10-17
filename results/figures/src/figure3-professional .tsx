import React, { useEffect, useRef } from 'react';

const Figure3Elegant = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Data from manuscript
    const categories = [
      {
        name: 'Optimal',
        range: '< 0.05',
        n: 24,
        median: 86.2,
        q1: 83.5,
        q3: 88.4,
        min: 78.9,
        max: 89.5,
        color: '#14b8a6',
        points: [
          89.5, 89.2, 88.9, 88.7, 88.4, 88.1, 87.8, 87.5, 87.2, 86.9,
          86.6, 86.5, 86.3, 86.2, 86.0, 85.8, 85.5, 85.2, 84.8, 84.5,
          84.2, 83.8, 83.5, 78.9
        ]
      },
      {
        name: 'Moderate',
        range: '0.05–0.15',
        n: 38,
        median: 79.8,
        q1: 75.2,
        q3: 83.1,
        min: 64.8,
        max: 87.9,
        color: '#f59e0b',
        points: [
          87.9, 87.2, 86.5, 85.8, 85.2, 84.6, 84.2, 83.7, 83.4, 83.1,
          82.8, 82.3, 82.1, 81.8, 81.5, 81.2, 80.9, 80.5, 80.2, 79.8,
          79.5, 79.3, 79.0, 78.6, 78.3, 77.9, 77.5, 77.0, 76.5, 75.9,
          75.5, 75.2, 74.8, 74.2, 73.5, 68.9, 66.5, 64.8
        ]
      },
      {
        name: 'High',
        range: '0.15–0.30',
        n: 22,
        median: 73.4,
        q1: 68.8,
        q3: 76.2,
        min: 58.9,
        max: 80.2,
        color: '#fb923c',
        points: [
          80.2, 78.9, 77.8, 76.8, 76.5, 76.2, 75.6, 75.3, 74.8, 74.3,
          74.2, 73.8, 73.7, 73.4, 72.9, 72.8, 72.4, 71.9, 71.5, 69.5,
          65.4, 58.9
        ]
      },
      {
        name: 'Severe',
        range: '≥ 0.30',
        n: 8,
        median: 67.1,
        q1: 59.8,
        q3: 72.1,
        min: 48.3,
        max: 74.5,
        color: '#f43f5e',
        points: [74.5, 72.8, 70.8, 67.2, 64.7, 62.8, 54.8, 48.3]
      }
    ];

    // Clean, minimal margins
    const margin = { top: 50, right: 35, bottom: 80, left: 85 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Scales
    const yMin = 45;
    const yMax = 92;
    const yScale = (val) => margin.top + chartHeight - ((val - yMin) / (yMax - yMin)) * chartHeight;

    const categoryWidth = chartWidth / 4;
    const categoryPositions = categories.map((_, i) => 
      margin.left + categoryWidth * (i + 0.5)
    );

    // Subtle grid
    ctx.strokeStyle = '#f5f5f5';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 9; i++) {
      const y = yScale(45 + i * 5);
      ctx.beginPath();
      ctx.moveTo(margin.left, y);
      ctx.lineTo(margin.left + chartWidth, y);
      ctx.stroke();
    }

    // Axes
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

    // Y-axis
    ctx.fillStyle = '#1f2937';
    ctx.font = '11px "Helvetica Neue", Arial, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    
    for (let i = 0; i <= 9; i++) {
      const val = 45 + i * 5;
      const y = yScale(val);
      
      ctx.strokeStyle = '#1f2937';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(margin.left - 5, y);
      ctx.lineTo(margin.left, y);
      ctx.stroke();
      
      ctx.fillText(val.toString(), margin.left - 10, y);
    }

    // Y-axis label
    ctx.save();
    ctx.translate(22, margin.top + chartHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.font = 'bold 12px "Helvetica Neue", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000000';
    ctx.fillText('Employment rate (%)', 0, 0);
    ctx.restore();

    // Box plots
    const boxWidth = 48;
    
    categories.forEach((cat, i) => {
      const x = categoryPositions[i];

      // Whiskers
      ctx.strokeStyle = '#6b7280';
      ctx.lineWidth = 1.5;
      
      ctx.beginPath();
      ctx.moveTo(x, yScale(cat.max));
      ctx.lineTo(x, yScale(cat.q3));
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(x - 10, yScale(cat.max));
      ctx.lineTo(x + 10, yScale(cat.max));
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(x, yScale(cat.min));
      ctx.lineTo(x, yScale(cat.q1));
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(x - 10, yScale(cat.min));
      ctx.lineTo(x + 10, yScale(cat.min));
      ctx.stroke();

      // Box
      const boxHeight = yScale(cat.q1) - yScale(cat.q3);
      
      ctx.fillStyle = cat.color;
      ctx.globalAlpha = 0.65;
      ctx.fillRect(x - boxWidth/2, yScale(cat.q3), boxWidth, boxHeight);
      ctx.globalAlpha = 1;
      
      ctx.strokeStyle = cat.color;
      ctx.lineWidth = 2;
      ctx.strokeRect(x - boxWidth/2, yScale(cat.q3), boxWidth, boxHeight);

      // Median
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(x - boxWidth/2, yScale(cat.median));
      ctx.lineTo(x + boxWidth/2, yScale(cat.median));
      ctx.stroke();

      // Mean
      const mean = cat.points.reduce((a, b) => a + b, 0) / cat.points.length;
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(x, yScale(mean), 4, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Points
      cat.points.forEach(point => {
        const jitter = (Math.random() - 0.5) * 28;
        ctx.fillStyle = cat.color;
        ctx.globalAlpha = 0.65;
        ctx.beginPath();
        ctx.arc(x + jitter, yScale(point), 2.5, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    });

    // X-axis labels
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    
    categories.forEach((cat, i) => {
      const x = categoryPositions[i];
      const labelY = margin.top + chartHeight + 8;
      
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 12px "Helvetica Neue", Arial, sans-serif';
      ctx.fillText(cat.name, x, labelY);
      
      ctx.font = '10px "Helvetica Neue", Arial, sans-serif';
      ctx.fillStyle = '#1f2937';
      ctx.fillText(cat.range, x, labelY + 15);
      
      ctx.fillStyle = '#000000';
      ctx.font = '10px "Helvetica Neue", Arial, sans-serif';
      ctx.fillText(`n=${cat.n}  |  ${cat.median.toFixed(1)}%`, x, labelY + 30);
    });

    // Compact legend
    const legendY = 18;
    const legendSpacing = 68;
    const legendStartX = margin.left + 8;
    
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000000';
    ctx.font = '10px "Helvetica Neue", Arial, sans-serif';
    
    // Median
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(legendStartX, legendY);
    ctx.lineTo(legendStartX + 18, legendY);
    ctx.stroke();
    ctx.fillText('Median', legendStartX + 22, legendY);
    
    // Mean
    const meanX = legendStartX + legendSpacing;
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(meanX + 9, legendY, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    ctx.fillStyle = '#000000';
    ctx.fillText('Mean', meanX + 22, legendY);
    
    // Points
    const pointsX = meanX + legendSpacing;
    ctx.fillStyle = '#6b7280';
    ctx.globalAlpha = 0.65;
    ctx.beginPath();
    ctx.arc(pointsX + 9, legendY, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    
    ctx.fillStyle = '#000000';
    ctx.fillText('Countries', pointsX + 22, legendY);

    // ANOVA info
    const anovaX = width - margin.right - 95;
    const anovaY = 10;
    
    ctx.fillStyle = '#fef2f2';
    ctx.fillRect(anovaX, anovaY, 90, 45);
    
    ctx.strokeStyle = '#fca5a5';
    ctx.lineWidth = 1;
    ctx.strokeRect(anovaX, anovaY, 90, 45);
    
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#000000';
    ctx.font = '11px "Helvetica Neue", Arial, sans-serif';
    ctx.fillText('F(3,88) = 28.4', anovaX + 7, anovaY + 9);
    
    ctx.fillStyle = '#dc2626';
    ctx.font = 'bold 11px "Helvetica Neue", Arial, sans-serif';
    ctx.fillText('p < 0.001', anovaX + 7, anovaY + 27);

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
        width={750} 
        height={480}
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: '2px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
        }}
      />
    </div>
  );
};

export default Figure3Elegant;