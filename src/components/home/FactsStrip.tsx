export const NAGARI_FACTS = [
  { value: "8", label: "Jorong" },
  { value: "Singkarak", label: "Dekat Danau" },
  { value: "Batipuh Selatan", label: "Kecamatan" },
  { value: "Tanah Datar", label: "Kabupaten" },
];

export function FactsStrip() {
  return (
    <section style={{ width: "100%", background: "var(--gray-900)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="ng-wrap ng-facts" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
        {NAGARI_FACTS.map((f, i) => (
          <div
            key={f.label}
            style={{
              padding: "28px 20px",
              borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
            }}
          >
            <div className="serif" style={{ fontSize: "26px", fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>
              {f.value}
            </div>
            <div style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginTop: "5px" }}>
              {f.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
