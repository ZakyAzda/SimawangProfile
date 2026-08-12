"use client";

import React, { useState, useCallback } from "react";
import GalleryLightbox, { LightboxImage } from "@/components/GalleryLightbox";

interface GalleryItem {
  id: string;
  image: string;
  title: string;
  description?: string | null;
  category?: string | null;
}

interface GalleryClientViewProps {
  filteredItems: GalleryItem[];
}

const isTall = (i: number) => {
  const pos = i % 10;
  return pos === 0 || pos === 5;
};

export default function GalleryClientView({ filteredItems }: GalleryClientViewProps) {
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    images: LightboxImage[];
    initialIndex: number;
  }>({ isOpen: false, images: [], initialIndex: 0 });

  const openLightbox = useCallback(
    (clickedItem: GalleryItem, allItems: GalleryItem[]) => {
      // Only show photos in the same category as the clicked one
      const sameCategory = clickedItem.category
        ? allItems.filter((item) => item.category === clickedItem.category)
        : allItems;

      const images: LightboxImage[] = sameCategory.map((item) => ({
        id: item.id,
        url: item.image,
        title: item.title,
        description: item.description,
        category: item.category,
      }));

      const clickedIndexInCategory = sameCategory.findIndex(
        (item) => item.id === clickedItem.id
      );

      setLightbox({
        isOpen: true,
        images,
        initialIndex: Math.max(0, clickedIndexInCategory),
      });
    },
    []
  );

  const closeLightbox = useCallback(() => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return (
    <>
      {/* ── Masonry Grid ── */}
      <div className="gal-grid">
        {filteredItems.map((item, i) => (
          <div key={item.id} className={`gal-cell ${isTall(i) ? "gal-r2" : ""}`}>
            <div
              className="gal-img-wrap"
              role="button"
              tabIndex={0}
              aria-label={`Buka foto: ${item.title}`}
              onClick={() => openLightbox(item, filteredItems)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLightbox(item, filteredItems);
                }
              }}
            >
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--gray-100)",
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "36px", color: "var(--gray-400)" }}
                  >
                    image
                  </span>
                </div>
              )}

              {/* Hover overlay */}
              <div className="gal-overlay">
                <div className="gal-overlay-icon">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "16px", color: "#fff" }}
                  >
                    zoom_in
                  </span>
                </div>
                {item.category && (
                  <span className="gal-overlay-category">{item.category}</span>
                )}
                <p className="gal-overlay-title">{item.title}</p>
                {item.description && (
                  <p className="gal-overlay-desc">{item.description}</p>
                )}
              </div>
            </div>

            {/* Caption below */}
            <div className="gal-caption">
              <span className="gal-caption-num">
                {String(i + 1).padStart(3, "0")}
              </span>
              <span className="gal-caption-title">{item.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Lightbox Modal ── */}
      <GalleryLightbox
        images={lightbox.images}
        initialIndex={lightbox.initialIndex}
        isOpen={lightbox.isOpen}
        onClose={closeLightbox}
      />
    </>
  );
}
