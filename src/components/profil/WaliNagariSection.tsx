export function WaliNagariSection() {
  return (
    <section id="walinagari" style={{ padding: "96px 0", background: "#f8f9fa", borderTop: "1px solid var(--line)" }}>
      <div className="ng-wrap">
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p className="ng-label" style={{ marginBottom: "12px" }}>Pemerintahan Nagari</p>
          <h2 className="serif" style={{ fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 700, color: "var(--gray-900)", letterSpacing: "-0.02em" }}>
            Profil Wali Nagari
          </h2>
          <div style={{ width: "40px", height: "3px", background: "var(--accent)", borderRadius: "2px", margin: "16px auto 0" }} />
        </div>

        <div style={{ 
          background: "#fff", 
          borderRadius: "24px", 
          overflow: "hidden", 
          boxShadow: "0 12px 40px rgba(0,0,0,0.06)",
          border: "1px solid var(--line)",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          maxWidth: "900px",
          margin: "0 auto"
        }}>
          {/* Photo Side */}
          <div style={{ flex: "1 1 350px", minHeight: "450px", position: "relative", background: "#e9ecef" }}>
            <img 
              src="/images/kepala/Wali Nagari.jpeg" 
              alt="Wali Nagari Simawang" 
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", position: "absolute", inset: 0 }}
            />
          </div>

          {/* Details Side */}
          <div style={{ flex: "1 1 450px", padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h3 className="serif" style={{ fontSize: "32px", fontWeight: 700, color: "var(--gray-900)", marginBottom: "8px", lineHeight: 1.2 }}>
              FIRMAN MALIN PANDUKO
            </h3>
            <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--accent)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "40px" }}>
              Wali Nagari Simawang
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--gray-500)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Tempat, Tanggal Lahir</p>
                <p style={{ fontSize: "16px", color: "var(--gray-800)", fontWeight: 500 }}>Simawang, 25 Desember 1978</p>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--gray-500)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Status Perkawinan</p>
                <p style={{ fontSize: "16px", color: "var(--gray-800)", fontWeight: 500 }}>Kawin</p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--gray-500)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Agama</p>
                <p style={{ fontSize: "16px", color: "var(--gray-800)", fontWeight: 500 }}>Islam</p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--gray-500)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Alamat</p>
                <p style={{ fontSize: "16px", color: "var(--gray-800)", fontWeight: 500, lineHeight: 1.6 }}>
                  Jorong Darek<br />Nagari Simawang
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
