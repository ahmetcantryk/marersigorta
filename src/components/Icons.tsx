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
  Whatsapp: ({ size = 24, color = "currentColor" }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 448 512"
      fill={color}
      aria-hidden="true"
    >
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
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
  Truck: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M3 7h11v9H3z" />
      <path d="M14 10h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </Stroke>
  ),
  Boat: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M3 16h18l-2 4H5l-2-4Z" />
      <path d="M5 16V9l7-5 7 5v7" />
      <path d="M12 4v12" />
    </Stroke>
  ),
  Wrench: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M15 3a5 5 0 0 1 4.7 6.7L21 11l-2 2-1.3-1.3A5 5 0 0 1 11 7L4.3 13.7a2 2 0 1 0 2.8 2.8L13.8 9.8" />
    </Stroke>
  ),
  Anchor: (p: IconProps) => (
    <Stroke {...p}>
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v14" />
      <path d="M9 11h6" />
      <path d="M5 15a7 7 0 0 0 14 0" />
    </Stroke>
  ),
  Package: (p: IconProps) => (
    <Stroke {...p}>
      <path d="m12 3 9 5v8l-9 5-9-5V8l9-5Z" />
      <path d="m3 8 9 5 9-5M12 13v8" />
    </Stroke>
  ),
  Globe: (p: IconProps) => (
    <Stroke {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </Stroke>
  ),
  Factory: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M3 21V10l5 3V10l5 3V8l8 3v10H3Z" />
      <path d="M7 17h2M12 17h2M17 17h2" />
    </Stroke>
  ),
  Crane: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M3 4h12l-2 3M5 4v17" />
      <path d="M13 7v5h6" />
      <path d="M19 12v3a2 2 0 0 1-2 2h-2" />
      <rect x="3" y="19" width="6" height="2" />
    </Stroke>
  ),
  Chip: (p: IconProps) => (
    <Stroke {...p}>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
      <rect x="9" y="9" width="6" height="6" />
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
