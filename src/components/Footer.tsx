export const SOCIAL = [
  { icon: "public", label: "Facebook", href: "#" },
  { icon: "photo_camera", label: "Instagram", href: "#" },
  { icon: "play_circle", label: "YouTube", href: "#" },
];

export function Footer() {
  return (
    <footer style={{ width: "100%", position: "relative", marginTop: "80px" }}>
      {/* 5-Peak Bagonjong Top Edge Divider */}
      <div style={{ position: "absolute", top: "-99px", left: 0, width: "100%", height: "100px", overflow: "hidden", lineHeight: 0 }}>
        <svg viewBox="0 0 1000 200" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block", filter: "drop-shadow(0 -10px 30px rgba(0,0,0,0.05))" }}>
          <defs>
            <linearGradient id="gold-grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c3bdaeff" />
              <stop offset="50%" stopColor="#76756bff" />
              <stop offset="100%" stopColor="#d4cebfff" />
            </linearGradient>
          </defs>

          {/* Golden Accent layer */}
          <path d="
            M 0,15 
            Q 50,145 140,145 Q 190,145 220,75 
            Q 260,155 360,155 Q 440,155 500,15 
            Q 560,155 640,155 Q 740,155 780,75 
            Q 810,145 860,145 Q 950,145 1000,15 
            L 1000,200 L 0,200 Z
          " fill="url(#gold-grad)" />

          {/* Main Gray Layer */}
          <path d="
            M 0,25 
            Q 50,155 140,155 Q 190,155 220,85 
            Q 260,165 360,165 Q 440,165 500,25 
            Q 560,165 640,165 Q 740,165 780,85 
            Q 810,155 860,155 Q 950,155 1000,25 
            L 1000,200 L 0,200 Z
          " fill="var(--gray-900)" />
        </svg>
      </div>

      <div style={{ background: "var(--gray-900)", width: "100%", position: "relative", overflow: "hidden" }}>

        {/* Background 5-Peak Watermark */}
        <div style={{ position: "absolute", right: "-10%", bottom: "-20%", opacity: 0.04, pointerEvents: "none" }}>
          <svg width="800" height="400" viewBox="0 0 1000 200" fill="currentColor" style={{ color: "#ffffff" }}>
            <path d="
              M 0,25 
              Q 50,155 140,155 Q 190,155 220,85 
              Q 260,165 360,165 Q 440,165 500,25 
              Q 560,165 640,165 Q 740,165 780,85 
              Q 810,155 860,155 Q 950,155 1000,25 
              L 1000,200 L 0,200 Z
            " />
          </svg>
        </div>

        <div className="ng-wrap ng-footer-grid" style={{ padding: "56px 40px 40px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px", position: "relative", zIndex: 1 }}>
          {/* Brand */}
          <div>
            <div className="serif" style={{ fontSize: "22px", fontWeight: 700, color: "#fff", letterSpacing: "-0.01em", marginBottom: "8px" }}>
              Nagari Simawang
            </div>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent-l)", marginBottom: "16px" }}>
              Nagari Simawang · Kecamatan Rambatan · Tanah Datar
            </p>
            <p style={{ fontSize: "14px", fontWeight: 300, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: "260px" }}>
              Portal resmi pemerintahan Nagari Simawang — transparansi dan keterbukaan informasi publik.
            </p>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", marginTop: "24px" }}>
              KKN ll simawang 2026 dan pemerintah nagari Simawang. Hak Cipta Dilindungi.
            </p>
          </div>

          {/* Address */}
          <div>
            <h4 style={{ fontSize: "10px", fontWeight: 700, color: "var(--gray-500)", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: "18px", paddingBottom: "10px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              Kantor Wali Nagari
            </h4>
            <address style={{ fontStyle: "normal", fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 2 }}>
              Kec. Rambatan<br />
              Kab. Tanah Datar<br />
              Sumatera Barat
            </address>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: "10px", fontWeight: 700, color: "var(--gray-500)", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: "18px", paddingBottom: "10px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              Kontak
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { icon: "call", text: "0812-3456-7890", href: "tel:081234567890" },
                { icon: "mail", text: "info@simawang.desa.id", href: "mailto:info@simawang.desa.id" },
              ].map(({ icon, text, href }) => (
                <li key={icon}>
                  <a href={href} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "15px", color: "var(--accent-l)" }}>{icon}</span>
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 style={{ fontSize: "10px", fontWeight: 700, color: "var(--gray-500)", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: "18px", paddingBottom: "10px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              Media Sosial
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {SOCIAL.map(({ icon, label, href }) => (
                <li key={icon}>
                  <a href={href} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "15px", color: "var(--accent-l)" }}>{icon}</span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
