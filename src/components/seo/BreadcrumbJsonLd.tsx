import Script from "next/script";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.youthmanagment.com";

export function BreadcrumbJsonLd({ id, name, path }: { id: string; name: string; path: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: `${siteUrl}${path}`,
      },
    ],
  };

  return (
    <Script
      id={id}
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
