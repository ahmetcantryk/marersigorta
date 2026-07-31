import type { Metadata } from "next";
import "./admin.css";

/**
 * Admin bölümü arama motorlarına kapalıdır. Giriş ekranı da bu layout'u
 * kullandığı için kabuk (topbar) burada değil, korumalı sayfalarda render
 * edilir.
 */
export const metadata: Metadata = {
  title: "Yönetim Paneli",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
