import NewsletterForm from "@/components/forms/NewsletterForm";

/**
 * Rendered only when RESEND_AUDIENCE_ID is set (read at build time), so
 * visitors never see a sign-up box that can only answer "not available yet".
 */
export default function NewsletterBand() {
  if (!process.env.RESEND_AUDIENCE_ID) return null;
  return (
    <div className="news-band">
      <div>
        <h2>Get new guides by email</h2>
        <p>One short email when we publish something useful for Shopify store owners. No spam.</p>
      </div>
      <NewsletterForm />
    </div>
  );
}
