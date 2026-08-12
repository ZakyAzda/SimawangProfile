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

const MENU_ITEMS = [
  { name: "Dasbor", href: "/admin", icon: LayoutDashboard },
  { name: "Galeri", href: "/admin/galeri", icon: ImageIcon },
  { name: "Berita & Artikel", href: "/admin/berita", icon: FileText },
  { name: "Data Nagari", href: "/admin/data-nagari", icon: Users },
  { name: "Data Stunting", href: "/admin/kesehatan", icon: HeartPulse },
  { name: "Potensi Alam", href: "/admin/potensi-alam", icon: Leaf },
  { name: "Data Sanitasi", href: "/admin/sanitasi", icon: Droplets },
  { name: "Sejarah & Budaya", href: "/admin/sejarah", icon: Landmark },
  { name: "Data UMKM", href: "/admin/umkm", icon: Store },
  { name: "Pengaduan Warga", href: "/admin/pengaduan", icon: MessageSquareWarning },
  { name: "Pengaturan", href: "/admin/pengaturan", icon: Settings },
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
        <ul className="sidebar-menu">
          {MENU_ITEMS.map((item) => {
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
                    color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.6)",
                    fontWeight: isActive ? 700 : 500,
                  }}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active-indicator"
                      className="sidebar-active-indicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="sidebar-active-bg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
      </nav>

      <div className="sidebar-footer">
        <button onClick={() => signOut({ callbackUrl: "/admin/login" })} className="sidebar-logout">
          <LogOut size={20} className="sidebar-icon" />
          <span className="sidebar-label">Keluar</span>
        </button>
      </div>

      <style jsx>{`
        .sidebar {
          width: 280px;
          height: 100vh;
          background: #0b1f18;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          color: #fff;
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
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        
        .sidebar-logo-dot {
          color: #c9943a;
          font-size: 28px;
          font-weight: 700;
          line-height: 1;
        }

        .sidebar-nav {
          flex: 1;
          padding: 0 16px;
          overflow-y: auto;
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
          padding: 14px 16px;
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          position: relative;
          transition: color 0.3s ease;
          font-weight: 500;
          font-size: 15px;
        }

        .sidebar-link:hover {
          color: rgba(255, 255, 255, 0.9);
        }

        .sidebar-link.active {
          color: #fff;
          font-weight: 700;
        }

        .sidebar-active-bg {
          position: absolute;
          inset: 0;
          background: rgba(201, 148, 58, 0.1);
          border-radius: 12px;
          border: 1px solid rgba(201, 148, 58, 0.2);
        }

        .sidebar-active-indicator {
          position: absolute;
          left: -16px;
          top: 20%;
          bottom: 20%;
          width: 4px;
          background: #c9943a;
          border-radius: 0 4px 4px 0;
          box-shadow: 0 0 10px rgba(201, 148, 58, 0.5);
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
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .sidebar-logout {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 16px;
          background: transparent;
          border: none;
          border-radius: 12px;
          color: #fca5a5;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .sidebar-logout:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #f87171;
        }
      `}</style>
    </aside>
  );
}
