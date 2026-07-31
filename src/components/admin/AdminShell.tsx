import Link from "next/link";
import LogoutButton from "./LogoutButton";

interface AdminShellProps {
  children: React.ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
  return (
    <div className="adm-shell">
      <header className="adm-topbar">
        <div className="adm-topbar-inner">
          <Link href="/admin" className="adm-brand">
            Marer Sigorta
            <span className="adm-brand-badge">Yönetim</span>
          </Link>
          <div className="adm-topbar-spacer" />
          <Link href="/" className="adm-topbar-link" target="_blank">
            Siteyi aç ↗
          </Link>
          <LogoutButton />
        </div>
      </header>
      <main className="adm-main">{children}</main>
    </div>
  );
}
