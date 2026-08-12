"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

/* ─── Types ─────────────────────────────────────────────── */
export interface LightboxImage {
  id: string;
  url: string;
  title: string;
  description?: string | null;
  category?: string | null;
}

interface ThumbnailsProps {
  index: number;
  setIndex: (i: number) => void;
  images: LightboxImage[];
}

interface GalleryLightboxProps {
  images: LightboxImage[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

/* ─── Constants ─────────────────────────────────────────── */
const FULL_WIDTH_PX = 110;
const COLLAPSED_WIDTH_PX = 32;
const GAP_PX = 4;
const MARGIN_PX = 4;

/* ─── Thumbnails sub-component ──────────────────────────── */
function Thumbnails({ index, setIndex, images }: ThumbnailsProps) {
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!thumbnailsRef.current) return;

    let scrollPosition = 0;
    for (let i = 0; i < index; i++) {
      scrollPosition += COLLAPSED_WIDTH_PX + GAP_PX;
    }
    scrollPosition += MARGIN_PX;

    const containerWidth = thumbnailsRef.current.offsetWidth;
    const centerOffset = containerWidth / 2 - FULL_WIDTH_PX / 2;
    scrollPosition -= centerOffset;

    thumbnailsRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
  }, [index]);

  return (
    <div
      ref={thumbnailsRef}
      className="overflow-x-auto"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
    >
      <style>{`.lb-thumbs::-webkit-scrollbar{display:none}`}</style>
      <div
        className="lb-thumbs flex h-[72px] pb-1"
        style={{ gap: GAP_PX, width: "fit-content" }}
      >
        {images.map((item, i) => (
          <motion.button
            key={item.id}
            onClick={() => setIndex(i)}
            initial={false}
            animate={i === index ? "active" : "inactive"}
            variants={{
              active: {
                width: FULL_WIDTH_PX,
                marginLeft: MARGIN_PX,
                marginRight: MARGIN_PX,
                opacity: 1,
              },
              inactive: {
                width: COLLAPSED_WIDTH_PX,
                marginLeft: 0,
                marginRight: 0,
                opacity: 0.5,
              },
            }}
            whileHover={{ opacity: 0.85 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative shrink-0 h-full overflow-hidden rounded-lg"
            style={
              i === index
                ? { border: "2px solid rgba(201,148,58,0.9)" }
                : { border: "2px solid transparent" }
            }
            aria-label={`Buka foto ${item.title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-full object-cover pointer-events-none select-none"
              draggable={false}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Lightbox Component ───────────────────────────── */
export default function GalleryLightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
}: GalleryLightboxProps) {
  const [index, setIndex] = React.useState(initialIndex);
  const [isDragging, setIsDragging] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  /* Sync index when the modal opens or initialIndex changes */
  useEffect(() => {
    if (isOpen) setIndex(initialIndex);
  }, [isOpen, initialIndex]);

  /* Animate carousel to current slide */
  useEffect(() => {
    if (!isDragging && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth || 1;
      animate(x, -index * containerWidth, {
        type: "spring",
        stiffness: 300,
        damping: 30,
      });
    }
  }, [index, x, isDragging]);

  /* Keyboard navigation */
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")
        setIndex((prev) => Math.max(0, prev - 1));
      if (e.key === "ArrowRight")
        setIndex((prev) => Math.min(images.length - 1, prev + 1));
    },
    [isOpen, images.length, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  /* Lock body scroll while open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[index];

  return (
    <motion.div
      key="lightbox-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "rgba(5, 14, 10, 0.6)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Lightbox galeri foto"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full text-white transition-colors"
        style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}
        aria-label="Tutup lightbox"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Counter */}
      <div
        className="absolute top-4 left-4 z-10 text-xs font-semibold tracking-widest"
        style={{ color: "rgba(255,255,255,0.5)", fontVariantNumeric: "tabular-nums" }}
      >
        {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </div>

      {/* Inner wrapper — stops click from bubbling to backdrop */}
      <div
        className="flex flex-col w-full max-w-4xl px-4"
        style={{ maxHeight: "95dvh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main image carousel */}
        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-xl"
          style={{ height: "clamp(300px, 60vh, 620px)", background: "rgba(255,255,255,0.04)" }}
        >
          <motion.div
            className="flex h-full"
            drag="x"
            dragElastic={0.15}
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(_e, info) => {
              setIsDragging(false);
              const containerWidth = containerRef.current?.offsetWidth || 1;
              const { offset, velocity } = info;

              let newIndex = index;
              if (Math.abs(velocity.x) > 500) {
                newIndex = velocity.x > 0 ? index - 1 : index + 1;
              } else if (Math.abs(offset.x) > containerWidth * 0.28) {
                newIndex = offset.x > 0 ? index - 1 : index + 1;
              }
              setIndex(Math.max(0, Math.min(images.length - 1, newIndex)));
            }}
            style={{ x }}
          >
            {images.map((item) => (
              <div
                key={item.id}
                className="shrink-0 w-full h-full flex items-center justify-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.title}
                  className="max-w-full max-h-full object-contain rounded-lg select-none pointer-events-none"
                  style={{ maxHeight: "clamp(280px, 58vh, 600px)" }}
                  draggable={false}
                />
              </div>
            ))}
          </motion.div>

          {/* Prev arrow */}
          {index > 0 && (
            <button
              onClick={() => setIndex(index - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full transition-all"
              style={{ background: "rgba(255,255,255,0.14)", backdropFilter: "blur(8px)", color: "#fff" }}
              aria-label="Foto sebelumnya"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {/* Next arrow */}
          {index < images.length - 1 && (
            <button
              onClick={() => setIndex(index + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full transition-all"
              style={{ background: "rgba(255,255,255,0.14)", backdropFilter: "blur(8px)", color: "#fff" }}
              aria-label="Foto berikutnya"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}
        </div>

        {/* Caption */}
        <div className="mt-3 mb-2 px-1 flex items-center gap-3 min-h-[44px]">
          {currentImage.category && (
            <span
              className="shrink-0 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
              style={{ background: "rgba(201,148,58,0.9)", color: "#fff" }}
            >
              {currentImage.category}
            </span>
          )}
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm truncate leading-tight">
              {currentImage.title}
            </p>
            {currentImage.description && (
              <p
                className="text-xs mt-0.5 line-clamp-1"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {currentImage.description}
              </p>
            )}
          </div>
        </div>

        {/* Thumbnails */}
        <Thumbnails index={index} setIndex={setIndex} images={images} />
      </div>
    </motion.div>
  );
}
