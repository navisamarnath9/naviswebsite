"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ServicesPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/#services");
  }, [router]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f3ef", color: "#18181b", fontFamily: "sans-serif" }}>
      <p style={{ fontSize: "1.1rem" }}>Redirecting to services...</p>
    </div>
  );
}
