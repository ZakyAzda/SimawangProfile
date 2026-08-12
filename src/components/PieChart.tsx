import React from 'react';

export interface PieChartData {
  label: string;
  value: number;
  color?: string;
}

const DEFAULT_COLORS = [
  '#ff5722', // orange
  '#b9375e', // maroon
  '#00a86b', // teal
  '#f72585', // pink
  '#386641', // dark green
  '#52b788', // muted green
  '#d8f3dc', // light green
  '#ffb703', '#fb8500', '#8ecae6', '#219ebc', '#023047'
];

export function PieChart({ data }: { data: PieChartData[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  if (total === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "var(--gray-500)" }}>
        Data Kosong
      </div>
    );
  }

  // Assign colors if not provided
  const chartData = data.map((item, i) => ({
    ...item,
    color: item.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length]
  }));

  let currentAngle = 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '48px', padding: '20px' }}>
      {/* Legend */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px 32px', width: '100%', maxWidth: '600px' }}>
        {chartData.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '16px', background: item.color, flexShrink: 0 }} />
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--gray-600)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div style={{ position: 'relative', width: '320px', height: '320px' }}>
        <svg viewBox="-1 -1 2 2" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%', overflow: 'visible' }}>
          {chartData.map((item, i) => {
            if (item.value === 0) return null;
            
            const sliceAngle = (item.value / total) * 2 * Math.PI;
            
            // If it's a full circle (100%), we need two paths or a circle element
            if (item.value === total) {
               return <circle cx="0" cy="0" r="1" fill={item.color} key={i} />;
            }

            const startAngle = currentAngle;
            const endAngle = startAngle + sliceAngle;
            currentAngle = endAngle;

            const startX = Math.cos(startAngle);
            const startY = Math.sin(startAngle);
            const endX = Math.cos(endAngle);
            const endY = Math.sin(endAngle);
            const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;

            const pathData = [
              `M 0 0`,
              `L ${startX} ${startY}`,
              `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
              `Z`
            ].join(' ');

            return (
              <path
                key={i}
                d={pathData}
                fill={item.color}
                stroke="#ffffff"
                strokeWidth="0.015"
                strokeLinejoin="round"
                style={{ transition: 'all 0.3s ease' }}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
