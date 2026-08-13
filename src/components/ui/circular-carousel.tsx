"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export interface CarouselItem {
  id: string;
  title: string;
  description: string;
  tag?: string;
  icon?: string;
  href?: string;
}

export interface CircularCarouselProps {
  items: CarouselItem[];
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

const VISIBLE_COUNT = 5;
const CARD_W = 260;
const CARD_H = 116;
const CARD_GAP = 16;

function getSlotOffset(index: number, activeIndex: number, total: number) {
  let offset = index - activeIndex;
  const half = Math.floor(VISIBLE_COUNT / 2);

  if (offset > half) offset -= total;
  if (offset < -half) offset += total;
  if (Math.abs(offset) > half) return null;

  const distance = Math.abs(offset);

  // Pure pixel offset from slot 0 (center).
  // slot +1 = CARD_W + CARD_GAP to the right, slot -1 = same to the left.
  const x = offset * (CARD_W + CARD_GAP);

  const scale = distance === 0 ? 1 : Math.max(0.72, 0.88 - distance * 0.08);
  const zIndex = 50 - distance;

  return { x, scale, zIndex };
}

export function CircularCarousel({
  items,
  activeIndex: controlledIndex,
  onActiveChange,
  autoPlay = true,
  autoPlayInterval = 2000,
  className,
}: CircularCarouselProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const activeIndex = controlledIndex ?? internalIndex;
  const total = items.length;

  const goTo = useCallback(
    (index: number) => {
      const newIndex = ((index % total) + total) % total;
      if (controlledIndex === undefined) setInternalIndex(newIndex);
      onActiveChange?.(newIndex);
    },
    [total, controlledIndex, onActiveChange],
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (!autoPlay) return;
    intervalRef.current = setInterval(next, autoPlayInterval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, autoPlayInterval, next]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    const el = containerRef.current;
    el?.addEventListener("keydown", handler);
    return () => el?.removeEventListener("keydown", handler);
  }, [next, prev]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Circular carousel"
      onClick={() => next()}
      className={cn("relative w-full cursor-pointer outline-none overflow-visible", className)}
      style={{ height: CARD_H + 20 }}
    >
      {/*
        Zero-width anchor div sitting at left: 50%.
        All cards are positioned absolutely inside this, with left:-CARD_W/2 so their
        center aligns with the anchor. Framer's `x` then moves them by slot * pitch.
        Because the anchor uses CSS `left:50%`, it always recomputes on resize/zoom.
        Framer's `x` values are pure pixels — no % math, no conflicts.
      */}
      <div
        className="absolute top-0 h-full"
        style={{ left: "50%", width: 0 }}
      >
        <AnimatePresence>
          {items.map((item, i) => {
            const pos = getSlotOffset(i, activeIndex, total);
            if (!pos) return null;

            const isActive = i === activeIndex;

            return (
              <motion.div
                key={item.id}
                style={{
                  position: "absolute",
                  top: 0,
                  left: -CARD_W / 2,   // CSS: card center = anchor center (50% of container)
                  width: CARD_W,
                  height: CARD_H,
                  transformOrigin: "center center",
                }}
                initial={{ opacity: 0, x: 0, scale: 0.85 }}
                animate={{
                  x: pos.x,            // Framer: pure pixel slot offset
                  scale: pos.scale,
                  zIndex: pos.zIndex,
                  opacity: 1,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isActive && item.href) router.push(item.href);
                  else goTo(i);
                }}
                role="button"
                aria-label={item.title}
                className={cn(
                  "flex cursor-pointer flex-row items-center rounded-[20px] bg-white gap-4",
                  "pl-[22px] pr-[14px] py-[12px]",
                  isActive
                    ? "border border-black/[0.08] shadow-[0_8px_28px_rgba(0,0,0,0.11)]"
                    : "border border-black/[0.04] shadow-[0_2px_10px_rgba(0,0,0,0.05)]",
                )}
              >
                {/* Dim overlay on inactive – only background, text stays sharp */}
                {!isActive && (
                  <div className="pointer-events-none absolute inset-0 rounded-[20px] bg-white/55" />
                )}

                {/* Icon */}
                {item.icon && (
                  <div
                    className={cn(
                      "relative z-10 flex h-[40px] w-[40px] flex-shrink-0 items-center justify-center rounded-full",
                      isActive ? "bg-black text-white" : "bg-zinc-100 text-zinc-700",
                    )}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 19 }}>
                      {item.icon}
                    </span>
                  </div>
                )}

                {/* Text */}
                <div className="relative z-10 flex min-w-0 flex-col">
                  <h3
                    className="serif"
                    style={{
                      fontSize: 14,
                      fontWeight: isActive ? 600 : 400,
                      color: "#000",
                      lineHeight: 1.2,
                      letterSpacing: "-0.01em",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: CARD_W - 40 - 22 - 14 - 16,
                      marginBottom: 2,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 11,
                      color: isActive ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.35)",
                      lineHeight: 1.35,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item.description}
                  </p>
                  <div
                    style={{
                      marginTop: 5,
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: isActive ? "#000" : "rgba(0,0,0,0.28)",
                    }}
                  >
                    Lihat Data
                    <span className="material-symbols-outlined" style={{ fontSize: 12 }}>
                      arrow_forward
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CircularCarousel;
