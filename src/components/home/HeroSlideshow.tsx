"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SLIDES = [
  "/images/WhatsApp Image 2026-08-02 at 19.49.32.jpeg",        // 1280×960
  "/images/WhatsApp Image 2026-08-02 at 19.49.34 (1).jpeg",   // 1280×960
  "/images/WhatsApp Image 2026-08-02 at 19.49.34 (2).jpeg",   // 1280×960
  "/images/WhatsApp Image 2026-08-02 at 19.49.35 (1).jpeg",   // 1280×960
  "/images/WhatsApp Image 2026-08-02 at 19.49.35.jpeg",       // 1280×720
  "/images/WhatsApp Image 2026-08-02 at 19.49.36 (2).jpeg",   // 1280×960
  "/images/WhatsApp Image 2026-08-02 at 19.49.36.jpeg",       // 1280×960
];

const INTERVAL_MS = 5000;

export function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrev(current);
      setFading(true);
      const next = (current + 1) % SLIDES.length;

      // Small delay before switching — lets fade-out finish
      setTimeout(() => {
        setCurrent(next);
        setFading(false);
        setPrev(null);
      }, 800);
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, [current]);

  const goTo = (i: number) => {
    if (i === current) return;
    setPrev(current);
    setFading(true);
    setTimeout(() => {
      setCurrent(i);
      setFading(false);
      setPrev(null);
    }, 800);
  };

  return (
    <>
      {/* ── CSS for cross-fade ── */}
      <style>{`
        @keyframes hero-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes hero-fade-out {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        .hero-slide-enter {
          animation: hero-fade-in 0.85s ease forwards;
        }
        .hero-slide-exit {
          animation: hero-fade-out 0.75s ease forwards;
        }
        .hero-dot {
          transition: width 0.3s ease, background 0.3s ease, opacity 0.3s ease;
        }
      `}</style>

      {/* ── Outgoing slide (fade-out) ── */}
      {prev !== null && (
        <div
          key={`exit-${prev}`}
          className="hero-slide-exit"
          style={{ position: "absolute", inset: 0, zIndex: 0 }}
        >
          <Image
            src={SLIDES[prev]}
            alt=""
            fill
            priority={false}
            style={{ objectFit: "cover", objectPosition: "center 40%" }}
            sizes="100vw"
          />
        </div>
      )}

      {/* ── Active slide (fade-in) ── */}
      <div
        key={`enter-${current}`}
        className={fading ? "" : "hero-slide-enter"}
        style={{ position: "absolute", inset: 0, zIndex: 1 }}
      >
        <Image
          src={SLIDES[current]}
          alt="Pemandangan Nagari Simawang"
          fill
          priority={current === 0}
          style={{ objectFit: "cover", objectPosition: "center 40%" }}
          sizes="100vw"
        />
      </div>

      {/* ── Dot indicators ── */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "6px",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="hero-dot"
            aria-label={`Slide ${i + 1}`}
            style={{
              height: "4px",
              width: i === current ? "24px" : "6px",
              borderRadius: "4px",
              background: i === current ? "#ffffff" : "rgba(255,255,255,0.35)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              opacity: i === current ? 1 : 0.6,
            }}
          />
        ))}
      </div>
    </>
  );
}
