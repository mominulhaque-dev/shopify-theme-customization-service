"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { footerMenu, mainNav } from "@/data/site";

interface Contact {
  email: string;
  phoneDisplay: string;
  phoneE164: string;
  whatsappUrl: string;
}

/**
 * Mobile navigation drawer.
 *
 * Slides in from the right over a dimmed backdrop. It closes on: a tap on the
 * backdrop (anywhere outside the drawer), the ✕ button, Escape, choosing a
 * link, or a route change.
 *
 * It is portalled to <body> and carries its own close button, so it never
 * depends on the sticky header. The previous full-screen panel was positioned
 * under the header; after scrolling, locking the body scroll un-stuck the
 * header, the burger scrolled out of view and the menu could not be closed.
 *
 * While open: focus is trapped inside, the page behind is `inert`, and both
 * native scroll and Lenis are paused (scroll position is preserved).
 */
export default function MobileMenu({ contact }: { contact: Contact }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => setMounted(true), []);

  // Close on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const drawer = drawerRef.current;
    if (!open || !drawer) return;

    const burger = burgerRef.current;
    const root = document.documentElement;
    const main = document.querySelector("main");
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    main?.setAttribute("inert", "");
    window.dispatchEvent(new Event("lenis:stop"));

    const focusable = () =>
      Array.from(
        drawer.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      );
    // Focus the first link rather than the close button, so screen readers
    // land in the menu itself.
    focusable()[1]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
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
      root.style.overflow = prevOverflow;
      main?.removeAttribute("inert");
      window.dispatchEvent(new Event("lenis:start"));
      burger?.focus({ preventScroll: true });
    };
  }, [open]);

  const drawer = (
    <div className={`mnav${open ? " is-open" : ""}`} aria-hidden={!open}>
      <div className="mnav-backdrop" onClick={close} />
      <div
        id="mobile-menu-panel"
        ref={drawerRef}
        className="mnav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <div className="mnav-top">
          <span className="mnav-brand">Menu</span>
          <button type="button" className="mnav-close" onClick={close} aria-label="Close menu" tabIndex={open ? 0 : -1}>
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <nav aria-label="Mobile">
          <ul className="mnav-main">
            {[{ label: "Home", href: "/" }, ...mainNav].map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={close} tabIndex={open ? 0 : -1} aria-current={pathname === link.href ? "page" : undefined}>
                  {link.label}
                </Link>
              </li>
            ))}
            {footerMenu
              .filter((link) => link.href !== "/" && link.href !== "/hire/" && !mainNav.some((m) => m.href === link.href))
              .map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={close} tabIndex={open ? 0 : -1} aria-current={pathname.startsWith(link.href) ? "page" : undefined}>
                    {link.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        <Link href="/hire/" className="btn btn-lg mnav-cta" onClick={close} tabIndex={open ? 0 : -1}>
          Get a quote
        </Link>

        <div className="mnav-contact">
          <a href={`mailto:${contact.email}`} tabIndex={open ? 0 : -1}>
            {contact.email}
          </a>
          <a href={`tel:${contact.phoneE164}`} tabIndex={open ? 0 : -1}>
            {contact.phoneDisplay}
          </a>
          <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        ref={burgerRef}
        type="button"
        className="burger"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        onClick={() => setOpen(true)}
      >
        <span />
      </button>
      {mounted && createPortal(drawer, document.body)}
    </>
  );
}
