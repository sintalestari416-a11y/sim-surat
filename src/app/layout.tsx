import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SIM-SURAT — Portal Kedinasan",
  description:
    "Sistem Informasi Manajemen Surat — Transformasi Digital Persuratan Sekolah yang Cepat, Akuntabel, dan Terintegrasi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
