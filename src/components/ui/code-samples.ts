/**
 * Real theme code, not lorem. Every snippet here is something we would
 * actually ship: Liquid that guards for missing objects, schema that produces
 * merchant-editable settings, CSS scoped to a section id, and JS that respects
 * reduced motion. They double as evidence on the customization pages.
 */

export const LIQUID_SNIPPET = `{%- comment -%}
  sections/featured-bundle.liquid
  Renders a bundle offer only when the merchant has picked products,
  so an unconfigured section never prints an empty block.
{%- endcomment -%}

{%- liquid
  assign items = section.settings.collection.products
  assign heading = section.settings.heading | default: 'Frequently bought together'
-%}

{%- if items.size > 0 -%}
  <section class="bundle" id="Bundle-{{ section.id }}">
    <h2 class="bundle__title">{{ heading }}</h2>

    {%- for product in items limit: section.settings.count -%}
      {%- assign variant = product.selected_or_first_available_variant -%}
      <article class="bundle__item">
        {{ product.featured_image | image_url: width: 480 | image_tag:
             loading: 'lazy', alt: product.featured_image.alt | escape }}
        <h3>{{ product.title }}</h3>
        <p>{{ variant.price | money }}</p>
        {%- unless variant.available -%}
          <p class="bundle__sold-out">{{ 'products.product.sold_out' | t }}</p>
        {%- endunless -%}
      </article>
    {%- endfor -%}
  </section>
{%- endif -%}`;

export const SCHEMA_SNIPPET = `{% schema %}
{
  "name": "Featured bundle",
  "tag": "section",
  "class": "section-bundle",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading",
      "default": "Frequently bought together" },
    { "type": "collection", "id": "collection", "label": "Source collection" },
    { "type": "range", "id": "count", "label": "Products shown",
      "min": 2, "max": 6, "step": 1, "default": 3 },
    { "type": "select", "id": "layout", "label": "Layout",
      "options": [
        { "value": "row", "label": "Row" },
        { "value": "grid", "label": "Grid" }
      ], "default": "row" }
  ],
  "presets": [{ "name": "Featured bundle" }]
}
{% endschema %}`;

export const CSS_SNIPPET = `/* assets/custom.css — loaded after the vendor stylesheet so nothing
   here depends on !important to win, and a theme update cannot silently
   revert it. Scoped to the section id the schema generates. */

.section-bundle {
  --bundle-gap: clamp(0.75rem, 2vw, 1.5rem);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(14rem, 100%), 1fr));
  gap: var(--bundle-gap);
  container-type: inline-size;
}

/* Container query, not a viewport query: the card reflows based on the
   space the section was given, so it works in a sidebar too. */
@container (max-width: 30rem) {
  .bundle__item { grid-template-columns: 4rem 1fr; }
}

@media (prefers-reduced-motion: no-preference) {
  .bundle__item { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
  .bundle__item:hover { transform: translateY(-2px); }
}`;

export const JS_SNIPPET = `// assets/bundle.js — a custom element, so it initialises itself when the
// theme editor injects the section and tears down when it is removed.
class BundlePicker extends HTMLElement {
  connectedCallback() {
    this.form = this.querySelector('form');
    this.form?.addEventListener('change', this.onChange);
  }

  disconnectedCallback() {
    this.form?.removeEventListener('change', this.onChange);
  }

  onChange = async (event) => {
    const id = event.target.value;
    const response = await fetch(\`\${window.Shopify.routes.root}variants/\${id}?section_id=\${this.dataset.sectionId}\`);
    if (!response.ok) return;
    this.querySelector('[data-price]').innerHTML = await response.text();
  };
}

customElements.define('bundle-picker', BundlePicker);`;

export const JSON_TEMPLATE_SNIPPET = `{
  "sections": {
    "main": { "type": "main-product", "settings": {} },
    "bundle": {
      "type": "featured-bundle",
      "settings": { "heading": "Complete the set", "count": 3 }
    },
    "reviews": { "type": "apps", "settings": {} }
  },
  "order": ["main", "bundle", "reviews"]
}`;
