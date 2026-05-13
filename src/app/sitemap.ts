import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/products";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.marersigorta.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const products = getAllSlugs().map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  const marketing = [
    "hakkimizda",
    "anlasmali-sirketler",
    "sikca-sorulan-sorular",
    "iletisim",
  ].map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    ...marketing,
    ...products,
  ];
}
