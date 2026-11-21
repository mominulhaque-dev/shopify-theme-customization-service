import NewsletterForm from "@/components/forms/NewsletterForm";

/**
 * Rendered only when sign-ups can be stored — in the database (secret key set)
 * or a Resend audience — so visitors never see a box that can only answer
 * "not available yet".
 */
export default function NewsletterBand() {
  if (!process.env.RESEND_AUDIENCE_ID && !process.env.SUPABASE_SECRET_KEY) return null;
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
