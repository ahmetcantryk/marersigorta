"use client";

import { I } from "./Icons";
import { SocialLinks } from "./SocialLinks";

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
          <a
            href="https://share.google/bHzB3dtVtCEhMBjUQ"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              opacity: 0.95,
              whiteSpace: "nowrap",
            }}
          >
            <I.Pin size={14} />
            Doğu Mah. Ihlamur Sk. No:34, Pendik / İstanbul
          </a>
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
            Hafta içi 09:00 – 18:00 · Cmt 09:00 – 17:00 · 7/24 WhatsApp
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
          <SocialLinks
            only={["instagram", "linkedin", "whatsapp"]}
            variant="mono"
            size={28}
            gap={2}
          />
        </div>
      </div>
    </div>
  );
};
