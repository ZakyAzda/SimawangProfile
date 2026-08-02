import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminPageTitle from "@/components/admin/AdminPageTitle";
import { redirect } from "next/navigation";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      <AdminSidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top Header */}
        <header style={{ 
          height: "72px", 
          backgroundColor: "#fff", 
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          position: "sticky",
          top: 0,
          zIndex: 40
        }}>
          <AdminPageTitle />
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ 
              width: "36px", 
              height: "36px", 
              borderRadius: "50%", 
              backgroundColor: "#c9943a", 
              color: "#fff", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              fontWeight: 600,
              fontSize: "14px"
            }}>
              {session.user?.name?.charAt(0) || "A"}
            </div>
            <div>
              <p style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#111827" }}>
                {session.user?.name}
              </p>
              <p style={{ margin: 0, fontSize: "12px", color: "#6b7280", textTransform: "capitalize" }}>
                {(session.user as any)?.role || "Admin"}
              </p>
            </div>
          </div>
        </header>
        
        {/* Main Content Area */}
        <main style={{ flex: 1, padding: "32px", overflowY: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
