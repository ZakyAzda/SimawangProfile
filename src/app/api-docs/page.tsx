"use client";

import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

// Harus dynamic import dengan ssr: false karena swagger-ui-react menggunakan browser API
const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function ApiDocs() {
  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh", padding: "1rem" }}>
      <SwaggerUI url="/api/swagger" />
    </div>
  );
}
