import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.youthmanagment.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Youth Management",
    template: "%s — Youth Management",
  },
  description:
    "Youth Management is a workspace for youth associations and self help groups to manage member contributions, pooled savings, and loans.",
  // Note: `keywords` is deliberately omitted. Google has ignored the meta
  // keywords tag since 2009 and Bing treats it as a spam signal; rankings come
  // from page content, titles and internal links instead.
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "AY5TRdB_6x7MiItB8decKl_C5vs0zdqLJt8XJi9ANCM",
  },
  openGraph: {
    type: "website",
    siteName: "Youth Management",
    title: "Youth Management",
    description:
      "A workspace for youth associations and self help groups to manage member contributions, pooled savings, and loans.",
    url: siteUrl,
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: "Youth Management",
    description:
      "A workspace for youth associations and self help groups to manage member contributions, pooled savings, and loans.",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Youth Management",
  url: siteUrl,
  logo: `${siteUrl}/icon-512.png`,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Youth Management",
  url: siteUrl,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="ld-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-252M30YFZZ"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-252M30YFZZ');
          `}
        </Script>
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ximfnleanb");
          `}
        </Script>
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
