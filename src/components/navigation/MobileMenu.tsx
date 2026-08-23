"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap, motionEnabled, registerGsap } from "@/lib/gsap";
import { footerColumns, mainNav, siteConfig } from "@/data/site";

/**
 * Mobile navigation panel.
 *
 * Three things the first version got wrong and this one handles: focus is
 * trapped inside the panel while it is open (previously it could tab through to
 * the page behind), Escape closes it, and Lenis is paused so a wheel or trackpad
 * gesture cannot scroll the page underneath a full-screen overlay.
 *
 * The panel also carries the secondary links rather than only the primary nav —
 * on a phone, a single list of six items hides the depth of the site.
 */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const close = useCallback(() => setOpen(false), []);

  // Close on navigation — the panel is fixed, so it would otherwise stay open
  // over the new page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (!open) {
      panel.style.display = "none";
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("lenis:start"));
      return;
    }

    panel.style.display = "block";
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new Event("lenis:stop"));

    if (motionEnabled()) {
      registerGsap();
      const items = panel.querySelectorAll("a");
      gsap.fromTo(panel, { autoAlpha: 0, y: -8 }, { autoAlpha: 1, y: 0, duration: 0.28, ease: "power2.out" });
      gsap.fromTo(
        items,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.025, ease: "power3.out", delay: 0.05 }
      );
    }

    const focusable = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      ).filter((el) => el.offsetParent !== null);

    focusable()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        burgerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;

      // Cycle within the panel; the burger stays reachable as the last stop.
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("lenis:start"));
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={burgerRef}
        type="button"
        className="burger"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <span />
      </button>

      <div
        id="mobile-menu-panel"
        className="mobile-panel"
        ref={panelRef}
        style={{ display: "none" }}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <nav aria-label="Primary">
          <ul>
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={close}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/hire/" className="btn btn-lg" onClick={close}>
          Get a quote
        </Link>

        {footerColumns.slice(0, 4).map((column) => (
          <div className="mobile-sub" key={column.heading}>
            <h4>{column.heading}</h4>
            <ul>
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={close}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="mobile-contact">
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <a href={`tel:${siteConfig.phoneE164}`}>{siteConfig.phoneDisplay}</a>
          <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
