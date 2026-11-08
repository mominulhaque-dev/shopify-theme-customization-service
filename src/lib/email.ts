import { createHash } from "node:crypto";
import { Resend } from "resend";

/**
 * Shared Resend setup for the API routes.
 *
 * RESEND_FROM is only set once a sending domain is verified in Resend. Until
 * then mail goes out from Resend's shared test sender, which can only deliver
 * to the address that owns the Resend account — fine for contact-form
 * notifications to our own inbox, useless for mail to customers. Anything that
 * emails a customer therefore checks `canEmailCustomers()` first.
 */
export const TEST_SENDER = "Shopify Theme Customization Services <onboarding@resend.dev>";

export function resendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  return key ? new Resend(key) : null;
}

export function sender(): string {
  return process.env.RESEND_FROM || TEST_SENDER;
}

export function canEmailCustomers(): boolean {
  return Boolean(process.env.RESEND_FROM);
}

/** Stable key so a retried request does not send the same email twice. */
export function idempotencyKey(prefix: string, ...parts: string[]): string {
  return `${prefix}/${createHash("sha256").update(parts.join("\u0000")).digest("hex").slice(0, 40)}`;
}

export const isEmail = (value: unknown): value is string =>
  typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
