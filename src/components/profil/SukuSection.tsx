/* ────────────────────────────────────────────────────────────
   SukuSection.tsx — 6 Suku dan daftar pemangku adat
   ──────────────────────────────────────────────────────────── */

const SUKUS = [
  {
    name: "Suku Tanjung",
    pucuak: "Datuak Bagindo Nan Panjang",
    datuaks: [
      "Datuak Bagindo Nan Gapuang", "Datuak Gadang Jolelo", "Datuak Maharajo Basa",
      "Datuak Bagondo Nan Putih", "Datuak Mangkuto Rajo", "Datuak Malin Sati", "Datuak Panduko",
    ],
  },
  {
    name: "Suku Simabur",
    pucuak: "Datuak Rajo Pangulu",
    datuaks: [
      "Dt. Rajo Malano", "Dt. Mansur Alam", "Dt. Pangulu Nan Kuniang", "Dt. Telo Basa",
      "Dt. Rajo Darek", "Dt. Marajo", "Dt. Rajo Tianso", "Dt. Kayo", "Dt. Panduko Dirajo",
      "Dt. Patiah", "Dt. Rajo Nan Hitam", "Dt. Rangkayo Mulia", "Dt. Rangkayo Mulia Nan Kuniang",
      "Dt. Rangkayo Mulia Nan Putiah", "Dt. Rajo Muyang", "Dt. Rajo Gamuyang",
      "Dt. Rangkayo Pangulu", "Dt. Pado Pangulu", "Dt. Manti Pangulu",
      "Dt. Panduko Rajo", "Dt. Panduko Basa", "Dt. Nan Kodoh Rajo",
    ],
  },
  {
    name: "Suku Payobadar",
    pucuak: "Datuak Tunaro",
    datuaks: [
      "Dt. Dubalang Basa", "Dt. Bandaro Sati", "Dt. Sampono Kayo", "Dt. Pakiah Majo Kayo",
      "Dt. Rangkayo Basa", "Dt. Tan Kayo", "Dt. Majo Nan Sati", "Dt. Pangulu Batuah Nan Kuniang",
      "Dt. Rajo Batuah", "Dt. Asa Kayo", "Dt. Pangulu Batuah", "Dt. Basa", "Dt. Pito Basa",
      "Dt. Palito Sinaro", "Dt. Panduko Nan Gadang", "Dt. Endah Kayo", "Dt. Panduko Sati",
      "Dt. Panduko Sinaro", "Dt. Mangkuto Saindo", "Dt. Bandaro Kali",
      "Dt. Majo Basa Nan Sati", "Dt. Bandaro Bandiang",
    ],
  },
  {
    name: "Suku Piliang",
    pucuak: "Datuak Sinaro Sati",
    datuaks: [
      "Datuak Gaga", "Datuak Sinaro Nan Hitam", "Datuak Palito Amat",
      "Datuak Pado Sati", "Datuak Nguyang Lareh", "Datuak Sinaro Nan Putiah",
    ],
  },
  {
    name: "Suku Dalimo",
    pucuak: "Datuak Mudo",
    datuaks: [
      "Datuak Tambo Alam", "Datuak Malin Puti Alam", "Datuak Indo Maharaja",
    ],
  },
  {
    name: "Suku Bendang",
    pucuak: "Datuak Sirajo",
    datuaks: [
      "Datuak Parmato Alam", "Datuak Pito Malano", "Datuak Gindo Simarajo",
    ],
  },
];

export function SukuSection() {
  return (
    <section
      id="suku"
      style={{
        padding: "96px 0",
        borderTop: "1px solid var(--line)",
        background: "#ffffff",
        scrollMarginTop: "100px",
      }}
    >
      <div className="ng-wrap">
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "56px",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <p className="ng-label" style={{ marginBottom: "12px" }}>Tatanan Sosial</p>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(26px, 3vw, 40px)",
                fontWeight: 700,
                color: "var(--gray-900)",
                letterSpacing: "-0.02em",
                marginBottom: "12px",
              }}
            >
              6 Suku dan Pemangku Adat
            </h2>
            <div style={{ width: "40px", height: "3px", background: "var(--accent)", borderRadius: "2px" }} />
          </div>
          <p style={{ fontSize: "14px", color: "var(--gray-500)", maxWidth: "380px", lineHeight: 1.7 }}>
            Setiap suku dipimpin oleh seorang Datuak Pucuak beserta datuak-datuak suku di bawahnya
            sebagai pemangku adat masyarakat nagari.
          </p>
        </div>

        {/* Grid kartu */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "18px",
          }}
        >
          {SUKUS.map((suku, idx) => (
            <div
              key={suku.name}
              className="ng-card"
              style={{
                borderRadius: "14px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Kartu header */}
              <div
                style={{
                  padding: "22px 24px 18px",
                  borderBottom: "1px solid var(--line)",
                  background: "#ffffff",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <h3
                    className="serif"
                    style={{
                      fontSize: "19px",
                      fontWeight: 700,
                      color: "var(--gray-900)",
                    }}
                  >
                    {suku.name}
                  </h3>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "var(--gray-400)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    0{idx + 1}
                  </span>
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                    }}
                  >
                    Datuak Pucuak
                  </p>
                  <p style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--gray-700)" }}>
                    {suku.pucuak}
                  </p>
                </div>
              </div>

              {/* Daftar datuak */}
              <div
                style={{
                  padding: "18px 24px 22px",
                  flex: 1,
                  background: "#ffffff",
                }}
              >
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--gray-400)",
                    marginBottom: "12px",
                  }}
                >
                  Datuak Suku ({suku.datuaks.length})
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  {suku.datuaks.map((dt) => (
                    <li
                      key={dt}
                      style={{
                        fontSize: "13px",
                        color: "var(--gray-600)",
                        display: "flex",
                        gap: "10px",
                        alignItems: "baseline",
                        paddingBottom: "6px",
                        borderBottom: "1px solid var(--gray-100, #f1f3f5)",
                      }}
                    >
                      <span
                        style={{
                          color: "var(--accent-l)",
                          flexShrink: 0,
                          fontSize: "9px",
                          marginTop: "3px",
                        }}
                      >
                        —
                      </span>
                      {dt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}