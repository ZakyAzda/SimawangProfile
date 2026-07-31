/* ────────────────────────────────────────────────────────────
   SejarahSection.tsx — Narasi sejarah & asal-usul
   ──────────────────────────────────────────────────────────── */

export function SejarahSection() {
  const musyawarahGroups = [
    {
      label: "Perwakilan Nagari Simawang",
      names: ["Dt. Rajo Malano", "Dt. Sinaro Basa", "Dt. Rajo Putiah"],
    },
    {
      label: "Perwakilan Nagari Bukik Kanduang",
      names: ["Dt. Andomo", "Dt. Putiah", "Dt. Rajo Kuaso", "Dt. Marajo"],
    },
  ];

  const paragrafUtama = [
    `Menurut sejarah, Nagari Simawang dan Nagari Bukik Kandung dahulunya adalah satu kesatuan dalam wilayah Kabupaten Tanah Datar. Dalam struktur Kelarasan Adat Koto Piliang, wilayah ini termasuk dalam Langgam nan Tujuh yang dikenal sebagai "Simawang Bukik Kanduang Perdamaian Koto Piliang". Pada masa penjajahan Belanda, wilayah ini terbagi dua antara Kabupaten Solok dan Kabupaten Tanah Datar.`,
    `Mengingat terpisahnya daerah perdamaian Koto Piliang ini — diibaratkan bandua bauleh nan lah bakupak, atok bajaik nan lah baruntiah — maka timbullah pemikiran arif dari para ninik mamak kedua belah pihak. Secara lahiriah terpisah, namun secara batiniah ikatan mereka tidak berubah.`,
    `Pada tahun 1901, ninik mamak dan pemuka masyarakat dari kedua nagari mengadakan musyawarah mufakat untuk menentukan tapal batas. Musyawarah berlangsung di Bukik Puncak Rayo, dihadiri oleh ninik mamak, alim ulama, cadiak pandai, dan bundo kanduang dari kedua belah pihak, dengan prosesi menyembelih seekor kerbau.`,
  ];

  return (
    <section id="sejarah" style={{ padding: "96px 0", background: "#ffffff", scrollMarginTop: "100px" }}>
      <div className="ng-wrap">
        {/* Section heading */}
        <div style={{ marginBottom: "56px", maxWidth: "680px" }}>
          <p className="ng-label" style={{ marginBottom: "14px" }}>Bab IV — Hak Asal Usul Nagari</p>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(26px, 3vw, 40px)",
              fontWeight: 700,
              color: "var(--gray-900)",
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            Asal Usul &amp; Sejarah Nagari
          </h2>
          <div
            style={{
              width: "40px",
              height: "3px",
              background: "var(--accent)",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* Two-column layout */}
        <div className="ng-sejarah-grid">
          {/* Left: narasi */}
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                fontSize: "15px",
                color: "var(--gray-600)",
                lineHeight: 1.85,
                textAlign: "justify",
                marginBottom: "36px",
              }}
            >
              {paragrafUtama.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Perwakilan musyawarah */}
            <div className="ng-musyawarah-grid">
              {musyawarahGroups.map((g) => (
                <div
                  key={g.label}
                  style={{
                    padding: "24px",
                    background: "#ffffff",
                    border: "1px solid var(--line)",
                    borderRadius: "12px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                      marginBottom: "14px",
                    }}
                  >
                    {g.label}
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "7px" }}>
                    {g.names.map((n) => (
                      <li
                        key={n}
                        style={{
                          fontSize: "13.5px",
                          color: "var(--gray-700)",
                          display: "flex",
                          gap: "10px",
                        }}
                      >
                        <span style={{ color: "var(--accent-l)", flexShrink: 0 }}>—</span>
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right: pull-quote + legenda */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* quote */}
            <div
              style={{
                padding: "32px",
                background: "#ffffff",
                border: "1px solid var(--line)",
                borderRadius: "16px",
                color: "var(--gray-900)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ position: "absolute", right: "-10px", bottom: "-16px", fontSize: "100px", opacity: 0.03, color: "var(--gray-900)" }}
              >
                format_quote
              </span>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: "16px",
                }}
              >
                Pepatah Adat
              </p>
              <blockquote
                className="serif"
                style={{
                  fontSize: "18px",
                  fontStyle: "italic",
                  color: "var(--gray-800)",
                  lineHeight: 1.6,
                  margin: 0,
                  borderLeft: "3px solid var(--accent)",
                  paddingLeft: "16px",
                }}
              >
                "Bandua bauleh nan lah bakupak, atok bajaik nan lah baruntiah."
              </blockquote>
              <p
                style={{
                  fontSize: "12px",
                  color: "var(--gray-500)",
                  marginTop: "16px",
                  lineHeight: 1.6,
                }}
              >
                Gambaran terpisahnya daerah perdamaian Koto Piliang secara administratif, namun
                tidak secara ikatan adat dan budaya.
              </p>
            </div>

            {/* legenda */}
            <div
              style={{
                padding: "28px",
                background: "#ffffff",
                border: "1px solid var(--line)",
                borderLeft: "4px solid var(--accent)",
                borderRadius: "0 12px 12px 0",
              }}
            >
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: "12px",
                }}
              >
                Legenda
              </p>
              <h3
                className="serif"
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "var(--gray-900)",
                  marginBottom: "14px",
                }}
              >
                Asal Nama "Simawang"
              </h3>
              <p style={{ fontSize: "13.5px", color: "var(--gray-600)", lineHeight: 1.8 }}>
                Dahulu di Luhak Bungo, tumbuh pohon tinggi yang di pucuknya bertengger makhluk bercahaya.
                Buah pohon itu terasa <em>kalek-kalek mauang</em>, sehingga pohon itu dinamakan
                "Simauang" — yang kemudian berubah menjadi <strong>Simawang</strong>.
              </p>
              <p style={{ fontSize: "13.5px", color: "var(--gray-600)", lineHeight: 1.8, marginTop: "12px" }}>
                Setelah pohon ditebang, terungkaplah bahwa makhluk itu adalah seorang Puti yang
                kelak menjadi penghulu dengan gelar <strong>Dt. Marajo Basa</strong>.
              </p>
            </div>

            {/* posisi minangkabau */}
            <div
              style={{
                padding: "28px",
                background: "#ffffff",
                border: "1px solid var(--line)",
                borderRadius: "12px",
              }}
            >
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: "12px",
                }}
              >
                Dalam Langgam nan Tujuah
              </p>
              <p style={{ fontSize: "13.5px", color: "var(--gray-600)", lineHeight: 1.75, fontStyle: "italic" }}>
                "Simawang Bukik Kanduang, Pardamaian Koto Piliang."
              </p>
              <p style={{ fontSize: "13px", color: "var(--gray-500)", lineHeight: 1.7, marginTop: "10px" }}>
                Simawang tergolong Nagari Tuo — bagian dari benteng sembilan koto terhadap pusat
                kerajaan Bungo di Minangkabau.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ng-sejarah-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 60px;
          align-items: start;
        }
        .ng-musyawarah-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 900px) {
          .ng-sejarah-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 560px) {
          .ng-musyawarah-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}