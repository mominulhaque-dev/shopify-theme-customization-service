"use client";

import { useEffect } from "react";

/**
 * Adds a `.is-scrolled` class to <header> once the page scrolls past a small
 * threshold, driving the header's shadow/backdrop transition in CSS. Kept as
 * a plain scroll listener (not GSAP) since it's a one-off boolean toggle,
 * not a tweened value — no need for ScrollTrigger overhead here.
 */
export default function HeaderScrollState() {
  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;

    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
