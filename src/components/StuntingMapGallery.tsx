"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import GalleryLightbox, { LightboxImage } from "@/components/GalleryLightbox";

const MAP_IMAGES: LightboxImage[] = [
  {
    id: "peta-stunting-berisiko",
    url: "/images/peta/PETA PERSEBARAN BEREISIKO STUNTING BALITA.jpg",
    title: "Peta Persebaran Berisiko Stunting",
    category: "Peta Kesehatan",
  },
  {
    id: "peta-stunting-balita",
    url: "/images/peta/PETA PERSEBARAN STUNTING BALITA.jpg",
    title: "Peta Persebaran Stunting Balita",
    category: "Peta Kesehatan",
  }
];

const INTERVAL_MS = 4000;

export function StuntingMapGallery() {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % MAP_IMAGES.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div style={{ background: "#fff", padding: "40px", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 40px rgba(0,0,0,0.03)", marginBottom: "48px" }}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h3 className="serif" style={{ fontSize: "24px", fontWeight: 700, color: "var(--gray-900)" }}>Peta Persebaran Stunting</h3>
        <p style={{ fontSize: "14px", color: "var(--gray-500)", marginTop: "8px" }}>Visualisasi spasial balita stunting dan berisiko stunting di Nagari Simawang</p>
      </div>

      <div style={{ position: "relative", width: "100%", margin: "0 auto" }}>
        {/* Main Slideshow Container */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16/9",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
            backgroundColor: "#e5e5e5",
            cursor: "pointer"
          }}
          onClick={() => openLightbox(current)}
        >
          {MAP_IMAGES.map((img, i) => (
            <div
              key={img.id}
              style={{
                position: "absolute",
                inset: 0,
                opacity: i === current ? 1 : 0,
                transition: "opacity 0.8s ease-in-out",
                zIndex: i === current ? 1 : 0
              }}
            >
              <Image
                src={img.url}
                alt={img.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 1000px) 100vw, 1000px"
              />
              
              {/* Overlay & Title */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "40px 24px 24px",
                background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                color: "white"
              }}>
                <p style={{ fontWeight: 600, fontSize: "1.2rem" }}>{img.title}</p>
              </div>
            </div>
          ))}

          {/* Click Icon Indicator */}
          <div style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(8px)",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            zIndex: 10,
            border: "1px solid rgba(255,255,255,0.3)"
          }}>
            <span className="material-symbols-outlined">zoom_out_map</span>
          </div>
        </div>

        {/* Thumbnails Navigation */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "24px" }}>
          {MAP_IMAGES.map((img, i) => (
            <button
              key={`thumb-${img.id}`}
              onClick={() => setCurrent(i)}
              style={{
                position: "relative",
                width: "160px",
                aspectRatio: "16/9",
                borderRadius: "8px",
                overflow: "hidden",
                border: i === current ? "2px solid var(--accent)" : "2px solid transparent",
                padding: 0,
                cursor: "pointer",
                opacity: i === current ? 1 : 0.6,
                transition: "all 0.3s ease"
              }}
            >
              <Image
                src={img.url}
                alt={`Thumbnail ${i}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="160px"
              />
            </button>
          ))}
        </div>
      </div>

      <GalleryLightbox
        images={MAP_IMAGES}
        isOpen={lightboxOpen}
        initialIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
