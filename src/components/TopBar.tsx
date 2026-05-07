"use client";

import { I } from "./Icons";

const socialLinks = [
  { Icon: I.Facebook, href: "https://facebook.com", label: "Facebook" },
  { Icon: I.Instagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: I.Twitter, href: "https://twitter.com", label: "Twitter / X" },
  { Icon: I.Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

export const TopBar = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, var(--brand-700), var(--brand-500))",
        color: "white",
        fontSize: 13,
        position: "relative",
        zIndex: 90,
      }}
    >
      <div
        className="container topbar-inner"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 38,
          gap: 16,
        }}
      >
        <div
          className="topbar-left"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            minWidth: 0,
            flexWrap: "nowrap",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              opacity: 0.95,
              whiteSpace: "nowrap",
            }}
          >
            <I.Pin size={14} />
            Levent Mah. Sigorta Cad. No:12, Beşiktaş / İstanbul
          </span>
          <span
            className="topbar-hours"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              opacity: 0.85,
              whiteSpace: "nowrap",
            }}
          >
            <I.Clock size={14} />
            Hafta içi 09:00 – 18:00
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <a
            href="mailto:info@marersigorta.com"
            className="topbar-mail"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              opacity: 0.95,
            }}
          >
            <I.Mail size={14} />
            info@marersigorta.com
          </a>
          <div
            aria-hidden
            className="topbar-divider"
            style={{
              width: 1,
              height: 16,
              background: "rgba(255,255,255,0.25)",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-grid",
                  placeItems: "center",
                  width: 26,
                  height: 26,
                  borderRadius: 6,
                  opacity: 0.85,
                  transition: "opacity .15s, background .15s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.opacity = "0.85";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
