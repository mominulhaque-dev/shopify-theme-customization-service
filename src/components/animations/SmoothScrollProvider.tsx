"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, motionEnabled, registerGsap } from "@/lib/gsap";

/**
 * Lenis smooth scroll, synced to GSAP's ticker so ScrollTrigger stays
 * frame-accurate. Off entirely under reduced motion / no-JS (see
 * `motionEnabled`), where the browser's native scrolling is used.
 *
 * Other components pause it with `window.dispatchEvent(new Event("lenis:stop"))`
 * — the mobile menu does this while its panel is open so the page behind a
 * full-screen overlay cannot be wheel-scrolled.
 */
export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!motionEnabled()) return;

    registerGsap();

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.1,
    });

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Keep in-page anchors (e.g. the header's Services → /#scope) inside the
    // smooth-scroll model and clear of the sticky header.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest?.<HTMLAnchorElement>("a[href]");
      if (!link || event.metaKey || event.ctrlKey || event.shiftKey || link.target === "_blank") return;
      const url = new URL(link.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash || url.hash === "#") return;
      const target = document.querySelector(url.hash);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -84 });
      window.history.pushState(null, "", url.hash);
    };
    document.addEventListener("click", onClick);

    const stop = () => lenis.stop();
    const start = () => lenis.start();
    window.addEventListener("lenis:stop", stop);
    window.addEventListener("lenis:start", start);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("lenis:stop", stop);
      window.removeEventListener("lenis:start", start);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
