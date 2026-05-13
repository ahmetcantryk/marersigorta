import type { ComponentType } from "react";
import { I } from "@/components/Icons";

interface UndrawComponent {
  primaryColor?: string;
  height?: string | number;
}

export interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  badges?: string[];
  Illustration?: ComponentType<UndrawComponent>;
}

export const PageHero = ({
  eyebrow,
  title,
  subtitle,
  badges = [],
  Illustration,
}: PageHeroProps) => (
  <section
    style={{
      position: "relative",
      background:
        "linear-gradient(135deg, var(--brand-700), var(--brand-500))",
      color: "white",
      overflow: "hidden",
      paddingTop: "clamp(48px, 6vw, 80px)",
      paddingBottom: "clamp(56px, 7vw, 96px)",
    }}
  >
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.18), transparent 55%)",
        pointerEvents: "none",
      }}
    />
    <div
      className="container product-hero"
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: Illustration
          ? "minmax(0,1.2fr) minmax(0,1fr)"
          : "1fr",
        gap: 56,
        alignItems: "center",
      }}
    >
      <div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 12px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.16)",
            border: "1px solid rgba(255,255,255,0.25)",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: ".08em",
            textTransform: "uppercase",
            marginBottom: 18,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: "var(--accent-500)",
            }}
          />
          {eyebrow}
        </div>
        <h1
          style={{
            color: "white",
            fontSize: "clamp(30px, 4vw, 48px)",
            fontWeight: 800,
            marginBottom: 18,
            lineHeight: 1.15,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: 17,
            color: "rgba(255,255,255,0.88)",
            maxWidth: 600,
            marginBottom: badges.length > 0 ? 24 : 0,
            lineHeight: 1.55,
          }}
        >
          {subtitle}
        </p>
        {badges.length > 0 && (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {badges.map((b) => (
              <li
                key={b}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 14.5,
                  color: "rgba(255,255,255,0.92)",
                }}
              >
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.16)",
                    border: "1px solid rgba(255,255,255,0.28)",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <I.Check size={14} sw={2.4} />
                </span>
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>

      {Illustration && (
        <div
          className="product-hero-illu"
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: "-10% -5%",
              borderRadius: "40% 60% 55% 45% / 50% 45% 55% 50%",
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.18), transparent 65%)",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: 420,
            }}
          >
            <Illustration primaryColor="#FFFFFF" height="300px" />
          </div>
        </div>
      )}
    </div>
  </section>
);
