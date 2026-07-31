import Link from "next/link";
import type { Jorong } from "@/data/jorong";

interface Props {
  jorong: Jorong;
  index: number;
}

const CATEGORY_ICONS: Record<string, string> = {
  "Wisata & Alam": "landscape",
  "Sumber Air & Alam": "water_drop",
  "Budaya & Adat": "account_balance",
  "Agrowisata & Pertanian": "agriculture",
  "Pusat Kegiatan & Ekonomi": "storefront",
  "Sosial & Perkebunan": "forest",
};

export function JorongCard({ jorong, index }: Props) {
  const icon = CATEGORY_ICONS[jorong.kategori] ?? "location_on";

  return (
    <Link
      href={`/jorong/${jorong.slug}`}
      className="jorong-card group"
    >
      {/* Number badge */}
      <div className="jorong-card-num">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Icon + category */}
      <div className="jorong-card-top">
        <div className="jorong-card-icon">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <span className="jorong-card-kategori">{jorong.kategori}</span>
      </div>

      {/* Name */}
      <h3 className="jorong-card-name serif">{jorong.nama}</h3>

      {/* Ringkasan */}
      <p className="jorong-card-desc">{jorong.ringkasan}</p>



      {/* Footer */}
      <div className="jorong-card-footer">
        <div className="jorong-kepala">
          <div className="jorong-kepala-avatar">
            {jorong.kepala.foto ? (
              <img 
                src={jorong.kepala.foto} 
                alt={jorong.kepala.nama} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} 
              />
            ) : (
              <span className="material-symbols-outlined" style={{ fontSize: 15 }}>person</span>
            )}
          </div>
          <div className="jorong-kepala-info">
            <div className="jorong-kepala-role">Kepala Jorong</div>
            <div className="jorong-kepala-name">{jorong.kepala.nama}</div>
          </div>
        </div>
        <div className="jorong-card-cta group-hover:opacity-100">
          Lihat Profil
          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
        </div>
      </div>

      <style>{`
        .jorong-card {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 20px;
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 20px;
          text-decoration: none;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
        }
        .jorong-card:hover {
          box-shadow: 0 12px 36px rgba(0,0,0,0.10);
          transform: translateY(-3px);
          border-color: rgba(0,0,0,0.13);
        }
        .jorong-card-num {
          position: absolute;
          top: 20px;
          right: 24px;
          font-size: 48px;
          font-weight: 800;
          color: rgba(0,0,0,0.04);
          line-height: 1;
          font-variant-numeric: tabular-nums;
          pointer-events: none;
          user-select: none;
          font-family: var(--font-display), Georgia, serif;
        }
        .jorong-card-top {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .jorong-card-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 12px;
          background: #f1f3f5;
          color: #212529;
          flex-shrink: 0;
          transition: background 0.3s, color 0.3s;
        }
        .jorong-card-icon .material-symbols-outlined {
          font-size: 20px;
        }
        .jorong-card:hover .jorong-card-icon {
          background: #212529;
          color: #ffffff;
        }
        .jorong-card-kategori {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #adb5bd;
        }
        .jorong-card-name {
          font-size: clamp(15px, 1.8vw, 18px);
          font-weight: 700;
          color: #212529;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin: 0;
        }
        .jorong-card-desc {
          font-size: 12.5px;
          color: #6c757d;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin: 0;
          flex: 1;
        }

        .jorong-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 4px;
        }
        .jorong-kepala {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .jorong-kepala-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #f1f3f5;
          color: #495057;
          flex-shrink: 0;
          overflow: hidden;
        }
        .jorong-kepala-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .jorong-kepala-role {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #adb5bd;
          line-height: 1;
          margin-bottom: 2px;
        }
        .jorong-kepala-name {
          font-size: 12.5px;
          font-weight: 600;
          color: #495057;
        }
        .jorong-card-cta {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #adb5bd;
          opacity: 0.6;
          transition: color 0.3s, opacity 0.3s;
        }
        .jorong-card:hover .jorong-card-cta {
          color: #212529;
          opacity: 1;
        }
      `}</style>
    </Link>
  );
}
