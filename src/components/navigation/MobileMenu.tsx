"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { mainNav } from "@/data/site";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    const items = itemsRef.current?.querySelectorAll("li");
    if (!panel) return;

    registerGsap();

    if (prefersReducedMotion()) {
      panel.style.display = open ? "block" : "none";
      return;
    }

    if (open) {
      panel.style.display = "block";
      const tl = gsap.timeline();
      tl.fromTo(panel, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, ease: "power2.out" });
      if (items?.length) {
        tl.fromTo(
          items,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: "power3.out" },
          "-=0.1"
        );
      }
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(panel, {
        autoAlpha: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          panel.style.display = "none";
        },
      });
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="burger"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "✕" : "☰"}
      </button>
      <div id="mobile-menu-panel" className="mobile-panel" ref={panelRef} style={{ display: "none" }}>
        <ul ref={itemsRef}>
          {mainNav.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/hire/" className="btn btn-lg" onClick={() => setOpen(false)}>
              Get a quote
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
