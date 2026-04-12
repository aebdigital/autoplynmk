"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";

export default function HeroSection({ children }: { children: React.ReactNode }) {
  const bgRef = useRef<HTMLDivElement>(null);

  useLenis(({ scroll }) => {
    if (bgRef.current) {
      // parallax: bg moves at 40% of scroll speed
      bgRef.current.style.transform = `translateY(${scroll * 0.35}px)`;
    }
  });

  return (
    <section className="sticky top-0 h-screen overflow-hidden z-0">
      {/* Parallax background — oversized so edges never show while translating */}
      <div
        ref={bgRef}
        className="absolute will-change-transform"
        style={{
          inset: "-20% 0",
          backgroundImage: "url('/uploads/2025/01/IMG_20240821_154741-1-1024x768.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.97), rgba(0,0,0,0.25) 70%, rgba(0,0,0,0) 100%)",
        }}
      />
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">{children}</div>
    </section>
  );
}
