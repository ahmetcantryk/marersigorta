import Image from "next/image";
import type { ReactNode } from "react";

export interface IconProps {
  size?: number;
  sw?: number;
  color?: string;
}

interface StrokeProps extends IconProps {
  children: ReactNode;
}

const Stroke = ({ children, size = 24, sw = 1.6, color = "currentColor" }: StrokeProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

export const I = {
  Phone: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </Stroke>
  ),
  Whatsapp: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M21 12a9 9 0 1 1-3.4-7.05L21 4l-1 3.4A9 9 0 0 1 21 12Z" />
      <path d="M8.5 9.5c0-.6.5-1.1 1.1-1.1H10l1 2.2-.9.7c.6 1.4 1.7 2.5 3.1 3.1l.7-.9 2.2 1v.4c0 .6-.5 1.1-1.1 1.1A6.6 6.6 0 0 1 8.5 9.5Z" />
    </Stroke>
  ),
  Mail: (p: IconProps) => (
    <Stroke {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </Stroke>
  ),
  Pin: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M12 22s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Stroke>
  ),
  Clock: (p: IconProps) => (
    <Stroke {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Stroke>
  ),
  Check: (p: IconProps) => (
    <Stroke {...p}>
      <path d="m5 12 5 5L20 7" />
    </Stroke>
  ),
  CheckCircle: (p: IconProps) => (
    <Stroke {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 3 3 5-6" />
    </Stroke>
  ),
  ChevronDown: (p: IconProps) => (
    <Stroke {...p}>
      <path d="m6 9 6 6 6-6" />
    </Stroke>
  ),
  ChevronRight: (p: IconProps) => (
    <Stroke {...p}>
      <path d="m9 6 6 6-6 6" />
    </Stroke>
  ),
  ChevronLeft: (p: IconProps) => (
    <Stroke {...p}>
      <path d="m15 6-6 6 6 6" />
    </Stroke>
  ),
  ArrowRight: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M5 12h14m-5-5 5 5-5 5" />
    </Stroke>
  ),
  Menu: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Stroke>
  ),
  Close: (p: IconProps) => (
    <Stroke {...p}>
      <path d="m6 6 12 12M18 6 6 18" />
    </Stroke>
  ),
  Shield: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M12 3 5 6v6c0 4.5 3 8 7 9 4-1 7-4.5 7-9V6l-7-3Z" />
    </Stroke>
  ),
  Search: (p: IconProps) => (
    <Stroke {...p}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.3-4.3" />
    </Stroke>
  ),
  Doc: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </Stroke>
  ),
  AlertTriangle: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M12 4 2.5 20h19L12 4Z" />
      <path d="M12 10v4M12 18v.01" />
    </Stroke>
  ),
  Star: (p: IconProps) => (
    <Stroke {...p}>
      <path d="m12 3 2.7 5.7 6.3.9-4.5 4.4 1 6.3L12 17.3 6.5 20.3l1-6.3L3 9.6l6.3-.9L12 3Z" />
    </Stroke>
  ),
  Sparkle: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M12 4v4M12 16v4M4 12h4M16 12h4M6.4 6.4l2.8 2.8M14.8 14.8l2.8 2.8M6.4 17.6l2.8-2.8M14.8 9.2l2.8-2.8" />
    </Stroke>
  ),
  Bolt: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M13 3 4 14h7l-1 7 9-11h-7l1-7Z" />
    </Stroke>
  ),
  Coins: (p: IconProps) => (
    <Stroke {...p}>
      <circle cx="9" cy="9" r="6" />
      <path d="M15 9a6 6 0 1 1-6 6" />
    </Stroke>
  ),
  Handshake: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M3 12 8 7l3 3 4-4 6 6-3 3-2-2-2 2-2-2-3 3-3-3-1-1Z" />
    </Stroke>
  ),
  Car: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M5 17h14M6 17v-4l2-5h8l2 5v4" />
      <circle cx="8" cy="17" r="1.5" />
      <circle cx="16" cy="17" r="1.5" />
      <path d="M8 13h8" />
    </Stroke>
  ),
  CarShield: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M4 16h16M5 16v-4l2-5h10l2 5v4" />
      <circle cx="8" cy="18" r="1.3" />
      <circle cx="16" cy="18" r="1.3" />
      <path d="M12 9v3M10.5 10.5h3" />
    </Stroke>
  ),
  Quake: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M3 12h2l1.5-3 2 6 2-9 2 12 2-6 1.5 3H21" />
    </Stroke>
  ),
  Home: (p: IconProps) => (
    <Stroke {...p}>
      <path d="m3 11 9-7 9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-6h4v6" />
    </Stroke>
  ),
  Heart: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M12 20s-7-4.5-7-10a4.5 4.5 0 0 1 8-3 4.5 4.5 0 0 1 8 3c0 5.5-7 10-7 10Z" />
    </Stroke>
  ),
  Hospital: (p: IconProps) => (
    <Stroke {...p}>
      <rect x="4" y="6" width="16" height="14" rx="1.5" />
      <path d="M12 9v6M9 12h6M4 10h16" />
    </Stroke>
  ),
  Plane: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M3 14 21 8l-3 9-4-2-2 4-2-4-7-1Z" />
    </Stroke>
  ),
  Building: (p: IconProps) => (
    <Stroke {...p}>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3" />
    </Stroke>
  ),
  HandHeart: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M3 14h3l3 3 6-1 5-3-1-2-4 1-3-1c-1 0-2-1-3-1H4l-1 4Z" />
      <path d="M12 4s2-2 4 0-2 4-4 6c-2-2-6-4-4-6s4 0 4 0Z" />
    </Stroke>
  ),
  Send: (p: IconProps) => (
    <Stroke {...p}>
      <path d="m4 11 16-7-7 16-2-7-7-2Z" />
    </Stroke>
  ),
  Plus: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M12 5v14M5 12h14" />
    </Stroke>
  ),
  Minus: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M5 12h14" />
    </Stroke>
  ),
  Lock: (p: IconProps) => (
    <Stroke {...p}>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </Stroke>
  ),
  Facebook: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14V8.5c0-.3.2-.5.5-.5H14Z" />
    </Stroke>
  ),
  Instagram: (p: IconProps) => (
    <Stroke {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </Stroke>
  ),
  Twitter: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M4 4h3.5l4 5.5L16.5 4H20l-6 8 6.5 8H17l-4.5-6L7 20H4l7-9-7-7Z" />
    </Stroke>
  ),
  Linkedin: (p: IconProps) => (
    <Stroke {...p}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 1 1 4 0v4M12 10v7" />
    </Stroke>
  ),
  PhoneRing: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" />
      <path d="M16 4c2 .3 3.7 2 4 4M15.5 7.5c1 .2 1.8 1 2 2" />
    </Stroke>
  ),
} as const;

export interface InfinityMarkProps {
  size?: number;
  /** Pass "white" / "#fff" to render as a white silhouette on dark backgrounds. */
  color?: string;
  /** Kept for backwards compatibility — ignored by the image-based mark. */
  stroke?: number;
}

const INFINITY_ASPECT = 1474 / 740;

const isWhiteColor = (c?: string): boolean => {
  if (!c) return false;
  const v = c.replace(/\s/g, "").toLowerCase();
  return (
    v === "white" ||
    v === "#fff" ||
    v === "#ffffff" ||
    v === "rgb(255,255,255)" ||
    v === "rgba(255,255,255,1)"
  );
};

export const InfinityMark = ({
  size = 32,
  color = "currentColor",
}: InfinityMarkProps) => {
  const width = size;
  const height = Math.round(size / INFINITY_ASPECT);
  return (
    <Image
      src="/logo-icon.svg"
      alt=""
      width={width}
      height={height}
      style={{
        width,
        height,
        filter: isWhiteColor(color) ? "brightness(0) invert(1)" : undefined,
      }}
    />
  );
};

export interface LogoMarerProps {
  inverse?: boolean;
  height?: number;
  iconOnly?: boolean;
}

export const LogoMarer = ({
  inverse = false,
  height = 60,
  iconOnly = false,
}: LogoMarerProps) => {
  const src = iconOnly ? "/logo-icon.svg" : "/logo-marer.svg";
  const aspect = iconOnly ? INFINITY_ASPECT : 2.5;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        height,
        lineHeight: 0,
      }}
    >
      <Image
        src={src}
        alt="Marer Sigorta"
        width={Math.round(height * aspect)}
        height={height}
        priority
        style={{
          height: "100%",
          width: "auto",
          objectFit: "contain",
          filter: inverse ? "brightness(0) invert(1)" : "none",
        }}
      />
    </span>
  );
};
