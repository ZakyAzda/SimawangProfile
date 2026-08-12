type DataUmkm = {
  id: string;
  jorong: string;
  productUmkm: string;
  jumlah: number;
};

interface Props {
  umkm: DataUmkm[];
}

export function PotensiSection({ umkm }: Props) {
  return (
    <section
      id="potensi"
      style={{
        padding: "96px 0",
        borderTop: "1px solid var(--line)",
        background: "#ffffff",
        scrollMarginTop: "100px",
      }}
    >
      <div className="ng-wrap">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "48px",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <p className="ng-label" style={{ marginBottom: "12px" }}>Keunggulan</p>
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
              Sorotan &amp; Daya Tarik
            </h2>
            <div style={{ width: "40px", height: "3px", background: "var(--accent)", borderRadius: "2px" }} />
          </div>
        </div>

        <div
          className="ng-cols-4"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "14px",
            marginBottom: "20px",
          }}
        >
          {umkm.map((u) => (
            <div
              key={u.id}
              style={{
                background: "#ffffff",
                border: "1px solid var(--line)",
                borderRadius: "14px",
                padding: "24px 20px",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "6px" }}>
                <span
                  className="serif"
                  style={{ fontSize: "26px", fontWeight: 700, color: "var(--gray-900)" }}
                >
                  {u.jumlah}
                </span>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--gray-500)" }}>
                  Unit
                </span>
              </div>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--gray-700)", lineHeight: 1.4 }}>{u.productUmkm}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
