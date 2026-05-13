import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage } from "@/components/product/ProductPage";
import { getAllSlugs, getProduct } from "@/lib/products";

export const dynamicParams = false;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.marersigorta.com";

interface RouteParams {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: RouteParams): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};

  const canonical = `${SITE_URL}/${product.slug}`;

  return {
    title: product.seo.title,
    description: product.seo.description,
    keywords: product.seo.keywords,
    alternates: { canonical },
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      url: canonical,
      siteName: "Marer Sigorta",
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.seo.title,
      description: product.seo.description,
    },
  };
}

export default function Page({ params }: RouteParams) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  return <ProductPage product={product} />;
}
