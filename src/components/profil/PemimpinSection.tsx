/* ────────────────────────────────────────────────────────────
   PemimpinSection.tsx — Tabel daftar pemimpin nagari
   ──────────────────────────────────────────────────────────── */

const PEMIMPIN = [
  { periode: "Lareh I",             nama: "Dt. Sutan",                         ket: "Masa Belanda" },
  { periode: "Lareh II",            nama: "Dt. Sinaro Nan Hitam",              ket: "Masa Belanda" },
  { periode: "Lareh III",           nama: "Dt. Mudo",                          ket: "Masa Belanda" },
  { periode: "Lareh IV",            nama: "Dt. Penghulu Nan Kuniang",           ket: "Masa Belanda" },
  { periode: "Lareh V",             nama: "Maradusun Dt. Penghulu Nan Batuah",  ket: "Masa Belanda" },
  { periode: "1940",                nama: "Dt. Gadang JoLelo",                 ket: "Datuak Palo" },
  { periode: "1946",                nama: "Dt. Pado Sati",                     ket: "Datuak Palo" },
  { periode: "1947",                nama: "Dt. Indo Marajo",                   ket: "Datuak Palo" },
  { periode: "1948 – 1958",         nama: "S. Dt. Mansua Alam",                ket: "Wali Nagari" },
  { periode: "1958 (3 Bulan)",      nama: "M. Dt. Rajo Putiah",                ket: "Wali Nagari" },
  { periode: "1959 – 1965",         nama: "Y. Mangkuto Basa",                  ket: "Wali Nagari Dalam" },
  { periode: "1959 – 1961",         nama: "Dt. Gindo Nan Panjang",             ket: "Wali Nagari Luar" },
  { periode: "1966 – 1979",         nama: "Dt. Rajo Penghulu",                 ket: "Wali Nagari" },
  { periode: "1980 – 1989",         nama: "8 Orang Kepala Desa",               ket: "Pemerintahan Desa" },
  { periode: "1990 – 2000",         nama: "4 Orang Kepala Desa",               ket: "Pemerintahan Desa" },
  { periode: "2000 – 2009",         nama: "M. Syaiful Adnan",                  ket: "Wali Nagari" },
  { periode: "2009 – 23 Juli 2013", nama: "M. Noer Dt. Rajo Tianso",           ket: "Wali Nagari" },
  { periode: "24 Juli 2013 – 2019", nama: "E. Dt. Rajo Muyang, S. Sos",        ket: "Wali Nagari" },
];

const KET_COLOR: Record<string, string> = {
  "Masa Belanda":       "var(--gray-200)",
  "Datuak Palo":        "#e9ecef",
  "Wali Nagari":        "#e2f0e8",
  "Wali Nagari Dalam":  "#d9ece0",
  "Wali Nagari Luar":   "#d9ece0",
  "Pemerintahan Desa":  "#fdf3e2",
};

export function PemimpinSection() {
  return (
    <section id="pemimpin" style={{ padding: "96px 0", borderTop: "1px solid var(--line)", background: "#ffffff", scrollMarginTop: "100px" }}>
      <div className="ng-wrap" style={{ maxWidth: "1000px" }}>

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
            <p className="ng-label" style={{ marginBottom: "12px" }}>Sejarah Kepemimpinan</p>
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
              Daftar Demang, Lurah &amp; Wali Nagari
            </h2>
            <div style={{ width: "40px", height: "3px", background: "var(--accent)", borderRadius: "2px" }} />
          </div>
          <p style={{ fontSize: "14px", color: "var(--gray-500)", maxWidth: "340px", lineHeight: 1.7 }}>
            Dari masa pemerintahan kolonial Belanda hingga era otonomi nagari yang berlaku sekarang.
          </p>
        </div>

        {/* Tabel */}
        <div
          style={{
            overflowX: "auto",
            border: "1px solid var(--line)",
            borderRadius: "14px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
              minWidth: "600px",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "2px solid var(--line)", background: "#ffffff" }}>
                {["No", "Periode", "Nama Pemimpin", "Jabatan"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "16px 20px",
                      fontSize: "10.5px",
                      fontWeight: 700,
                      color: "var(--gray-500)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PEMIMPIN.map((row, i) => (
                <tr
                  key={i}
                  className="ng-pemimpin-row"
                  style={{
                    borderBottom: i < PEMIMPIN.length - 1 ? "1px solid var(--line)" : "none",
                    background: "#ffffff",
                    transition: "background 0.15s ease",
                  }}
                >
                  <td
                    style={{
                      padding: "14px 20px",
                      fontSize: "12px",
                      color: "var(--gray-400)",
                      fontWeight: 500,
                      width: "44px",
                    }}
                  >
                    {i + 1}
                  </td>
                  <td
                    style={{
                      padding: "14px 20px",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--gray-700)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.periode}
                  </td>
                  <td
                    style={{
                      padding: "14px 20px",
                      fontSize: "14px",
                      color: "var(--gray-800)",
                      fontWeight: 500,
                    }}
                  >
                    {row.nama}
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 12px",
                        background: KET_COLOR[row.ket] ?? "var(--gray-100)",
                        borderRadius: "100px",
                        fontSize: "11.5px",
                        fontWeight: 600,
                        color: "var(--gray-700)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.ket}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      <style>{`
        .ng-pemimpin-row:hover { background: #f8f9fa !important; }
      `}</style>
    </section>
  );
}