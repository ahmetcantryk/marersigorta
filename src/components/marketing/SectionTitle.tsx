interface SectionTitleProps {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
  subtitle?: string;
}

export const SectionTitle = ({
  eyebrow,
  title,
  align = "left",
  subtitle,
}: SectionTitleProps) => (
  <header
    style={{
      textAlign: align,
      maxWidth: align === "center" ? 720 : "100%",
      margin: align === "center" ? "0 auto 32px" : "0 0 28px",
    }}
  >
    <div
      className="eyebrow"
      style={align === "center" ? { justifyContent: "center" } : undefined}
    >
      {eyebrow}
    </div>
    <h2
      style={{
        fontSize: "clamp(24px, 3vw, 36px)",
        fontWeight: 700,
        margin: 0,
        marginBottom: subtitle ? 12 : 0,
      }}
    >
      {title}
    </h2>
    {subtitle && (
      <p
        style={{
          fontSize: 16,
          color: "var(--ink-500)",
          lineHeight: 1.6,
          margin: align === "center" ? "0 auto" : 0,
          maxWidth: 640,
        }}
      >
        {subtitle}
      </p>
    )}
  </header>
);
