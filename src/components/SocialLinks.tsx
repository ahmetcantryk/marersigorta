"use client";

import type { CSSProperties, ComponentType } from "react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa6";

type IconType = ComponentType<{ size?: number; color?: string; style?: CSSProperties }>;

export interface SocialItem {
  key: string;
  label: string;
  href: string;
  Icon: IconType;
  color: string;
  /** Optional CSS background override (e.g. Instagram gradient). */
  background?: string;
}

export const SOCIAL_ITEMS: SocialItem[] = [
  {
    key: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/marer_sigorta/",
    Icon: FaInstagram,
    color: "#E4405F",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/marer-sigorta",
    Icon: FaLinkedinIn,
    color: "#0A66C2",
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/905011014725",
    Icon: FaWhatsapp,
    color: "#25D366",
  },
];

export type SocialVariant = "solid" | "mono";

interface SocialLinksProps {
  /** Subset of social keys to render. Defaults to all. */
  only?: string[];
  /** "solid" = brand-colored pills, "mono" = monochrome icons in a single tone. */
  variant?: SocialVariant;
  /** Size of the icon square (px). */
  size?: number;
  /** Space between icons (px). */
  gap?: number;
  /** Icon color when variant === "mono". */
  monoColor?: string;
}

export const SocialLinks = ({
  only,
  variant = "solid",
  size = 32,
  gap = 8,
  monoColor = "#FFFFFF",
}: SocialLinksProps) => {
  const items = only
    ? SOCIAL_ITEMS.filter((i) => only.includes(i.key))
    : SOCIAL_ITEMS;

  return (
    <div style={{ display: "flex", alignItems: "center", gap }}>
      {items.map(({ key, label, href, Icon, color, background }) => {
        const isSolid = variant === "solid";
        return (
          <a
            key={key}
            href={href}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: size,
              height: size,
              borderRadius: isSolid ? 8 : 999,
              background: isSolid ? background ?? color : "transparent",
              color: isSolid ? "#FFFFFF" : monoColor,
              display: "grid",
              placeItems: "center",
              border: isSolid ? "1px solid rgba(0,0,0,0.06)" : "0",
              transition:
                "transform .15s ease, background .2s ease, box-shadow .2s ease, opacity .15s",
              boxShadow: isSolid
                ? "0 2px 6px -2px rgba(0,0,0,0.18)"
                : "none",
              opacity: isSolid ? 1 : 0.85,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              if (isSolid) {
                e.currentTarget.style.boxShadow =
                  "0 6px 14px -4px rgba(0,0,0,0.25)";
              } else {
                e.currentTarget.style.background = "rgba(255,255,255,0.14)";
                e.currentTarget.style.opacity = "1";
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              if (isSolid) {
                e.currentTarget.style.boxShadow =
                  "0 2px 6px -2px rgba(0,0,0,0.18)";
              } else {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.opacity = "0.85";
              }
            }}
          >
            <Icon size={Math.round(size * (isSolid ? 0.48 : 0.55))} />
          </a>
        );
      })}
    </div>
  );
};
