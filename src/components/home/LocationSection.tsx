const LOCATION_STATS = [
  { icon: "landscape", value: "±12,5", unit: "Km²", label: "Luas Wilayah" },
  { icon: "groups", value: "3.240", unit: "Jiwa", label: "Jumlah Penduduk" },
  { icon: "holiday_village", value: "8", unit: "Jorong", label: "Wilayah Administratif" },
  { icon: "elevation", value: "±420", unit: "Mdpl", label: "Ketinggian" },
];

export function LocationSection() {
  return (
    <section style={{ width: "100%", padding: "80px 0", background: "#ffffff" }}>
      <div className="ng-wrap">
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "36px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <p className="ng-label" style={{ marginBottom: "10px", color: "var(--gray-500)" }}>Wilayah</p>
            <h2 className="serif" style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 700, color: "var(--gray-900)", letterSpacing: "-0.02em" }}>
              Peta &amp; Batas Nagari Simawang
            </h2>
          </div>
        </div>

        <div
          className="ng-cols-location"
          style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "24px", alignItems: "stretch" }}
        >
          {/* Map */}
          <div
            style={{
              width: "100%",
              minHeight: "440px",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d65745.63015008938!2d100.53332407957917!3d-0.5697684739758907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd52a5f7d0cff11%3A0xdab7d41ad650df82!2sSimawang%2C%20Kec.%20Rambatan%2C%20Kabupaten%20Tanah%20Datar%2C%20Sumatera%20Barat!5e1!3m2!1sid!2sid!4v1785153956587!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block", minHeight: "440px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Peta Nagari Simawang"
            />
          </div>

          {/* Info + Stats panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div
              style={{
                background: "var(--gray-900)",
                borderRadius: "16px",
                padding: "28px",
                color: "#fff",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ position: "absolute", right: "-10px", bottom: "-20px", fontSize: "120px", opacity: 0.06 }}
              >
                map
              </span>
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent-l)", marginBottom: "10px" }}>
                Letak Geografis
              </p>
              <p style={{ fontSize: "14px", fontWeight: 300, color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>
                Nagari Simawang berada di Kecamatan Rambatan, Kabupaten Tanah Datar,
                Sumatera Barat — diapit oleh perbukitan dan tepian Danau Singkarak.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                flexGrow: 1,
              }}
            >
              {LOCATION_STATS.map((s) => (
                <div
                  key={s.label}
                  style={{
                    background: "#ffffff",
                    border: "1px solid rgba(0,0,0,0.07)",
                    borderRadius: "14px",
                    padding: "20px 18px",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: "var(--accent-50, #f1f3f5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "14px",
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "18px", color: "var(--accent)" }}>
                      {s.icon}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "4px" }}>
                    <span className="serif" style={{ fontSize: "22px", fontWeight: 700, color: "var(--gray-900)" }}>
                      {s.value}
                    </span>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--gray-500)" }}>{s.unit}</span>
                  </div>
                  <p style={{ fontSize: "12px", color: "var(--gray-500)", lineHeight: 1.4 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ng-cols-location {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}