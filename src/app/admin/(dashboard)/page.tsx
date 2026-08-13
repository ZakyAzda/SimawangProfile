import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import Link from "next/link";
import { Image as ImageIcon, FileText, Users, ArrowRight, MessageSquareWarning } from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  // Fetch metrics
  const [totalGallery, totalPosts, totalUsers, totalPengaduan] = await Promise.all([
    prisma.galleryItem.count(),
    prisma.post.count(),
    prisma.user.count(),
    prisma.pengaduan.count(),
  ]);

  const STATS = [
    {
      title: "Total Foto Galeri",
      value: totalGallery,
      icon: ImageIcon,
      color: "#111827", // Dark Gray
      bg: "#f3f4f6", // Light Gray
    },
    {
      title: "Total Artikel & Berita",
      value: totalPosts,
      icon: FileText,
      color: "#111827",
      bg: "#f3f4f6",
    },
    {
      title: "Admin & Pengguna",
      value: totalUsers,
      icon: Users,
      color: "#111827",
      bg: "#f3f4f6",
    },
    {
      title: "Total Pengaduan",
      value: totalPengaduan,
      icon: MessageSquareWarning,
      color: "#111827",
      bg: "#f3f4f6",
    },
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#111827", margin: "0 0 8px 0" }}>
          Selamat Datang, {session?.user?.name || "Admin"}!
        </h1>
        <p style={{ fontSize: "15px", color: "#6b7280", margin: 0 }}>
          Berikut adalah ringkasan data Nagari Simawang hari ini.
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
        gap: "24px",
        marginBottom: "40px"
      }}>
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} style={{ 
              backgroundColor: "#fff", 
              borderRadius: "16px", 
              padding: "24px", 
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
              display: "flex",
              alignItems: "center",
              gap: "20px"
            }}>
              <div style={{ 
                width: "56px", 
                height: "56px", 
                borderRadius: "12px", 
                backgroundColor: stat.bg,
                color: stat.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Icon size={28} />
              </div>
              <div>
                <p style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: 500, color: "#6b7280" }}>
                  {stat.title}
                </p>
                <h3 style={{ margin: 0, fontSize: "28px", fontWeight: 700, color: "#111827", lineHeight: 1 }}>
                  {stat.value}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <h2 style={{ fontSize: "20px", fontWeight: 600, color: "#111827", marginBottom: "20px" }}>Aksi Cepat</h2>
      <style>{`
        .quick-action-card {
          background-color: #fff;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          border: 1px solid #f3f4f6;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
        }
        .quick-action-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
      `}</style>
      
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
        gap: "24px"
      }}>
        <Link href="/admin/galeri" style={{ textDecoration: "none" }}>
          <div className="quick-action-card">
            <div>
              <h3 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: 600, color: "#111827" }}>Kelola Galeri</h3>
              <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>Tambah atau hapus foto dokumentasi nagari.</p>
            </div>
            <div style={{ color: "#111827" }}>
              <ArrowRight size={20} />
            </div>
          </div>
        </Link>

        <Link href="/admin/berita" style={{ textDecoration: "none" }}>
          <div className="quick-action-card">
            <div>
              <h3 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: 600, color: "#111827" }}>Kelola Berita</h3>
              <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>Tulis artikel, pengumuman, atau berita nagari.</p>
            </div>
            <div style={{ color: "#111827" }}>
              <ArrowRight size={20} />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
