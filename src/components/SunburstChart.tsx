"use client";

import React, { useState } from 'react';

export interface SunburstData {
  id: string;
  jorong: string;
  productUmkm: string;
  jumlah: number;
}

const COLORS = [
  '#1a3c30', '#2d5a49', '#3f7862', '#c9943a', '#e3b64c',
  '#f59e0b', '#1e40af', '#3b82f6', '#93c5fd', '#991b1b',
  '#ef4444', '#fca5a5'
];

export function SunburstChart({ data }: { data: SunburstData[] }) {
  const total = data.reduce((sum, item) => sum + item.jumlah, 0);

  if (total === 0) {
    return <div style={{ textAlign: "center", padding: "40px", color: "var(--gray-500)" }}>Data Kosong</div>;
  }

  // Sort by Jorong first, then Product
  const sortedData = [...data].sort((a, b) => a.jorong.localeCompare(b.jorong) || a.productUmkm.localeCompare(b.productUmkm));

  // Compute angles for each item (leaf node)
  const leaves = sortedData.map(item => ({
    ...item,
    angle: (item.jumlah / total) * 2 * Math.PI,
  }));

  // Helper to draw an arc slice
  const createArcPath = (startAngle: number, endAngle: number, innerR: number, outerR: number) => {
    if (endAngle - startAngle >= 2 * Math.PI - 0.001) {
      return `M 0 -${outerR} A ${outerR} ${outerR} 0 1 1 0 ${outerR} A ${outerR} ${outerR} 0 1 1 0 -${outerR} M 0 -${innerR} A ${innerR} ${innerR} 0 1 0 0 ${innerR} A ${innerR} ${innerR} 0 1 0 0 -${innerR} Z`;
    }

    const startX = Math.cos(startAngle - Math.PI / 2);
    const startY = Math.sin(startAngle - Math.PI / 2);
    const endX = Math.cos(endAngle - Math.PI / 2);
    const endY = Math.sin(endAngle - Math.PI / 2);
    
    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

    return [
      `M ${startX * innerR} ${startY * innerR}`,
      `L ${startX * outerR} ${startY * outerR}`,
      `A ${outerR} ${outerR} 0 ${largeArcFlag} 1 ${endX * outerR} ${endY * outerR}`,
      `L ${endX * innerR} ${endY * innerR}`,
      `A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${startX * innerR} ${startY * innerR}`,
      `Z`
    ].join(' ');
  };

  const [hoveredInfo, setHoveredInfo] = useState<{jorong: string, product: string, value: number, percent: string, layer: string} | null>(null);

  let currentAngle = 0;
  let jorongMap = new Map<string, { start: number, end: number, color: string }>();
  let productMap = new Map<string, { start: number, end: number, jorong: string }>();

  // Process inner layer (leaves)
  const innerSlices = leaves.map((leaf, i) => {
    const start = currentAngle;
    const end = start + leaf.angle;
    currentAngle = end;

    if (!jorongMap.has(leaf.jorong)) {
      jorongMap.set(leaf.jorong, { start, end, color: COLORS[jorongMap.size % COLORS.length] });
    } else {
      jorongMap.get(leaf.jorong)!.end = end;
    }

    const pKey = `${leaf.jorong}-${leaf.productUmkm}`;
    if (!productMap.has(pKey)) {
      productMap.set(pKey, { start, end, jorong: leaf.jorong });
    } else {
      productMap.get(pKey)!.end = end;
    }

    return { ...leaf, start, end };
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
      
      {/* Legend for Jorong */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', maxWidth: '600px' }}>
        {Array.from(jorongMap.entries()).map(([jorong, data], i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: data.color }} />
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gray-700)' }}>{jorong}</span>
          </div>
        ))}
      </div>

      <div style={{ position: 'relative', width: '380px', height: '380px' }}>
        <svg viewBox="-1 -1 2 2" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          
          {/* Inner Layer (Jumlah) */}
          {innerSlices.map((slice, i) => (
            <path
              key={`inner-${i}`}
              d={createArcPath(slice.start, slice.end, 0.25, 0.50)}
              fill={jorongMap.get(slice.jorong)?.color}
              opacity={0.5}
              stroke="#fff" strokeWidth="0.01"
              onMouseEnter={() => setHoveredInfo({ 
                jorong: slice.jorong, 
                product: slice.productUmkm, 
                value: slice.jumlah, 
                percent: ((slice.jumlah / total) * 100).toFixed(1),
                layer: 'Jumlah' 
              })}
              onMouseLeave={() => setHoveredInfo(null)}
              style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}
            />
          ))}

          {/* Middle Layer (Product) */}
          {Array.from(productMap.entries()).map(([key, data], i) => (
            <path
              key={`mid-${i}`}
              d={createArcPath(data.start, data.end, 0.50, 0.75)}
              fill={jorongMap.get(data.jorong)?.color}
              opacity={0.8}
              stroke="#fff" strokeWidth="0.01"
              onMouseEnter={() => {
                const val = (data.end - data.start)/(2*Math.PI)*total;
                setHoveredInfo({ 
                  jorong: data.jorong, 
                  product: key.split('-')[1], 
                  value: val, 
                  percent: ((val / total) * 100).toFixed(1),
                  layer: 'Produk' 
                });
              }}
              onMouseLeave={() => setHoveredInfo(null)}
              style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}
            />
          ))}

          {/* Outer Layer (Jorong) */}
          {Array.from(jorongMap.entries()).map(([key, data], i) => (
            <path
              key={`out-${i}`}
              d={createArcPath(data.start, data.end, 0.75, 1)}
              fill={data.color}
              stroke="#fff" strokeWidth="0.01"
              onMouseEnter={() => {
                const val = (data.end - data.start)/(2*Math.PI)*total;
                setHoveredInfo({ 
                  jorong: key, 
                  product: 'Total per Jorong', 
                  value: val, 
                  percent: ((val / total) * 100).toFixed(1),
                  layer: 'Jorong' 
                });
              }}
              onMouseLeave={() => setHoveredInfo(null)}
              style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}
            />
          ))}
          
        </svg>

        {/* Center Text (Hover Info) */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          {hoveredInfo ? (
            <div style={{ textAlign: 'center', background: '#fff', borderRadius: '50%', width: '130px', height: '130px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', padding: '12px' }}>
              <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase' }}>{hoveredInfo.layer}</span>
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--gray-900)', margin: '4px 0', lineHeight: 1.1 }}>
                {hoveredInfo.layer === 'Jorong' ? hoveredInfo.jorong : hoveredInfo.product}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--accent)' }}>{hoveredInfo.percent}%</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--gray-500)' }}>({Math.round(hoveredInfo.value)} Unit)</span>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', background: '#fff', borderRadius: '50%', width: '130px', height: '130px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.05)', color: 'var(--gray-400)', fontSize: '12px', fontWeight: 600 }}>
              Hover<br/>potongan<br/>diagram
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
