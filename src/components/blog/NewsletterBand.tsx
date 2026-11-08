import NewsletterForm from "@/components/forms/NewsletterForm";

export default function NewsletterBand() {
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
