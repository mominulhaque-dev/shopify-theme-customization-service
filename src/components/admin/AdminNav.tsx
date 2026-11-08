"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

/** Sections are added here as each admin feature ships. */
export const ADMIN_NAV = [
  { href: "/admin/", label: "Dashboard", icon: "◧" },
  { href: "/admin/leads/", label: "Leads", icon: "✉" },
  { href: "/admin/settings/", label: "Settings", icon: "⚙" },
];

export default function AdminNav({ email, signOut }: { email: string; signOut: () => Promise<void> }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === "/admin/" ? pathname === "/admin/" || pathname === "/admin" : pathname.startsWith(href));

  return (
    <>
      <div className="adm-topbar">
        <button type="button" className="adm-menu-btn" onClick={() => setOpen(true)} aria-label="Open menu">
          ☰
        </button>
        <strong>Admin</strong>
      </div>
      {open && <div className="adm-scrim" onClick={() => setOpen(false)} />}
      <aside className={`adm-side${open ? " is-open" : ""}`}>
        <div className="adm-brand">
          <Image src="/icon.svg" alt="" width={32} height={32} unoptimized />
          <div>
            <strong>Admin</strong>
            <span>Theme Customization</span>
          </div>
        </div>
        <nav aria-label="Admin">
          {ADMIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "is-active" : undefined}
              aria-current={isActive(item.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="adm-side-foot">
          <a href="/" target="_blank" rel="noopener noreferrer">
            View website ↗
          </a>
          <span className="adm-muted adm-small">{email}</span>
          <form action={signOut}>
            <button type="submit" className="adm-btn adm-btn-ghost adm-btn-sm">
              Sign out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
