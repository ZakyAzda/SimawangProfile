"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  FileText,
  HeartPulse,
  Leaf,
  Droplets,
  Landmark,
  Store,
  MessageSquareWarning,
  Settings, 
  LogOut,
  Users
} from "lucide-react";

const MENU_GROUPS = [
  {
    label: "Utama",
    items: [
      { name: "Dasbor", href: "/admin", icon: LayoutDashboard },
      { name: "Galeri", href: "/admin/galeri", icon: ImageIcon },
      { name: "Berita & Artikel", href: "/admin/berita", icon: FileText },
    ]
  },
  {
    label: "Data & Informasi",
    items: [
      { name: "Data Nagari", href: "/admin/data-nagari", icon: Users },
      { name: "Data Stunting", href: "/admin/kesehatan", icon: HeartPulse },
      { name: "Data Sanitasi", href: "/admin/sanitasi", icon: Droplets },
      { name: "Potensi Alam", href: "/admin/potensi-alam", icon: Leaf },
      { name: "Sejarah & Budaya", href: "/admin/sejarah", icon: Landmark },
      { name: "Data UMKM", href: "/admin/umkm", icon: Store },
    ]
  },
  {
    label: "Layanan & Sistem",
    items: [
      { name: "Pengaduan Warga", href: "/admin/pengaduan", icon: MessageSquareWarning },
      { name: "Pengaturan", href: "/admin/pengaturan", icon: Settings },
    ]
  }
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="sidebar-logo-text">Simawang</span>
          <span className="sidebar-logo-dot">.</span>
        </div>
      </div>

      <nav className="sidebar-nav">
          {MENU_GROUPS.map((group, gIdx) => (
            <div key={group.label} className="sidebar-group">
              <h4 className="sidebar-group-title">{group.label}</h4>
              <ul className="sidebar-menu">
                {group.items.map((item) => {
                  const isActive = item.href === "/admin" 
                    ? pathname === "/admin" 
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);
                  
                  const Icon = item.icon;

                  return (
                    <li key={item.name} className="sidebar-item">
                      <Link 
                        href={item.href} 
                        className={`sidebar-link ${isActive ? "active" : ""}`}
                        style={{
                          color: isActive ? "#111827" : "#4b5563",
                          fontWeight: isActive ? 600 : 500,
                        }}
                      >
                        {isActive && (
                          <motion.div 
                            layoutId="sidebar-active"
                            className="sidebar-active-bg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                        <span className="sidebar-link-content">
                          <Icon size={20} className="sidebar-icon" />
                          <span className="sidebar-label">{item.name}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
      </nav>

      <div className="sidebar-footer">
        <button onClick={() => signOut({ callbackUrl: "/admin/login" })} className="sidebar-logout">
          <LogOut size={20} className="sidebar-icon" />
          <span className="sidebar-label">Keluar</span>
        </button>
      </div>

      <style jsx>{`
        .sidebar {
          width: 260px;
          height: 100vh;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          border-right: 1px solid #e5e7eb;
          color: #111827;
          z-index: 50;
        }

        .sidebar-header {
          padding: 32px 24px;
        }
        
        .sidebar-logo {
          display: flex;
          align-items: baseline;
        }
        
        .sidebar-logo-text {
          font-family: var(--font-display, serif);
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #111827;
        }
        
        .sidebar-logo-dot {
          color: #111827;
          font-size: 24px;
          font-weight: 700;
          line-height: 1;
        }

        .sidebar-nav {
          flex: 1;
          padding: 0 16px;
          overflow-y: auto;
        }

        .sidebar-group {
          margin-bottom: 24px;
        }
        
        .sidebar-group:last-child {
          margin-bottom: 12px;
        }

        .sidebar-group-title {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #9ca3af;
          margin: 0 0 12px 16px;
        }

        .sidebar-menu {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .sidebar-item {
          position: relative;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-radius: 10px;
          color: #4b5563;
          text-decoration: none;
          position: relative;
          transition: all 0.2s ease;
          font-weight: 500;
          font-size: 14px;
        }

        .sidebar-link:hover {
          color: #111827;
          background: #f9fafb;
        }

        .sidebar-link.active {
          color: #111827;
          font-weight: 600;
        }

        .sidebar-active-bg {
          position: absolute;
          inset: 0;
          background: #f3f4f6;
          border-radius: 10px;
        }

        .sidebar-link-content {
          display: flex;
          align-items: center;
          gap: 16px;
          position: relative;
          z-index: 1;
        }

        .sidebar-icon {
          flex-shrink: 0;
        }

        .sidebar-footer {
          padding: 24px 16px;
          border-top: 1px solid #e5e7eb;
        }

        .sidebar-logout {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: transparent;
          border: none;
          border-radius: 10px;
          color: #ef4444;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .sidebar-logout:hover {
          background: #fef2f2;
          color: #dc2626;
        }
      `}</style>
    </aside>
  );
}
