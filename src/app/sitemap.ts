import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.youthmanagment.com";

/**
 * Bump a page's date only when its content actually changes.
 * Using `new Date()` here would claim every page changed on every build,
 * which makes lastmod meaningless and search engines ignore it.
 */
const lastModified = {
  home: "2026-07-21",
  solutions: "2026-07-21",
  legal: "2026-05-05",
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: lastModified.home,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/self-help-group-management-software`,
      lastModified: lastModified.solutions,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/member-contribution-tracking`,
      lastModified: lastModified.solutions,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/chit-fund-management-software`,
      lastModified: lastModified.solutions,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: lastModified.legal,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: lastModified.legal,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
