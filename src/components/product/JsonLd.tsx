import type { ProductData } from "@/lib/products";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.marersigorta.com";

interface JsonLdProps {
  product: ProductData;
}

export const ProductJsonLd = ({ product }: JsonLdProps) => {
  const url = `${SITE_URL}/${product.slug}`;

  const insuranceSchema = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "@id": `${url}#agency`,
    name: "Marer Sigorta",
    url: SITE_URL,
    telephone: "+90 (501) 101 47 25",
    email: "info@marersigorta.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Doğu Mah. Ihlamur Sk. No:34 D:2",
      addressLocality: "Pendik",
      addressRegion: "İstanbul",
      postalCode: "34890",
      addressCountry: "TR",
    },
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: product.short,
        description: product.seo.description,
        url,
        provider: { "@id": `${url}#agency` },
        areaServed: { "@type": "Country", name: "Türkiye" },
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Hizmetlerimiz",
        item: `${SITE_URL}/#branches`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.short,
        item: url,
      },
    ],
  };

  const faqSchema = product.faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: product.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(insuranceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
};
