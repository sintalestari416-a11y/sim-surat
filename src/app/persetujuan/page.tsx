"use client";

import { useState } from "react";
import Link from "next/link";
import {
  School,
  LayoutDashboard,
  Inbox,
  FileCheck,
  FileSignature,
  Archive,
  PlusCircle,
  Compass,
  Server,
  MapPin,
  Bell,
  Printer,
  ClipboardList,
  Shield,
  ShieldCheck,
  FileText,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Key,
  Eye,
  EyeOff,
  CheckCircle2,
  Clock,
  Send,
  RotateCcw,
  XCircle,
  Lock,
  QrCode,
  Sparkles,
  Menu,
  X,
  ExternalLink,
  Plus,
  Check,
  Building2,
  CheckCheck,
} from "lucide-react";

type RoleNav = "Staf TU" | "Siswa & Guru" | "Kepala Sekolah";

export default function PersetujuanDigitalPage() {
  const [activeRole, setActiveRole] = useState<RoleNav>("Kepala Sekolah");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showPassphrase, setShowPassphrase] = useState(false);
  const [passphrase, setPassphrase] = useState("");
  const [catatanDisposisi, setCatatanDisposisi] = useState("");
  const [isSigned, setIsSigned] = useState(false);

  const handleApprove = () => {
    if (!passphrase) {
      alert("Harap masukkan Passphrase TTE Pimpinan terlebih dahulu.");
      return;
    }
    setIsSigned(true);
    alert(
      "Naskah dinas berhasil disetujui dan ditandatangani secara elektronik dengan sertifikat BSrE!"
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row text-slate-800 antialiased font-sans">
      {/* ──────────────────────────────────────────────────────────
          1. SIDEBAR (Left Panel)
      ────────────────────────────────────────────────────────── */}
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-950/70 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 text-slate-300 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top: Logo & Nav items */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Header Branding */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20 text-white">
                <School className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-white text-base tracking-tight">
                    SIM-SURAT
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    PRO
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium">SMK Darussalam</p>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Tutup Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="px-4 py-5 space-y-6">
            {/* Section 1: NAVIGASI UTAMA */}
            <div>
              <p className="px-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase mb-2">
                NAVIGASI UTAMA
              </p>
              <nav className="space-y-1">
                <Link
                  href="/dashboard"
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800/70 hover:text-white transition-all"
                >
                  <div className="flex items-center gap-3">
                    <LayoutDashboard className="w-4 h-4 text-slate-400" />
                    <span>Dashboard</span>
                  </div>
                </Link>

                <Link
                  href="/dashboard"
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800/70 hover:text-white transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Inbox className="w-4 h-4 text-slate-400" />
                    <span>Pengajuan Masuk</span>
                  </div>
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-blue-600 text-white shadow-sm">
                    12
                  </span>
                </Link>

                <Link
                  href="/verifikasi"
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800/70 hover:text-white transition-all"
                >
                  <FileCheck className="w-4 h-4 text-slate-400" />
                  <span>Verifikasi Surat</span>
                </Link>

                {/* ACTIVE ITEM: Persetujuan Digital */}
                <div className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold bg-sky-500/15 text-sky-400 shadow-sm border border-sky-500/20">
                  <div className="flex items-center gap-3">
                    <FileSignature className="w-4 h-4 text-sky-400" />
                    <span>Persetujuan Digital</span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-sm shadow-sky-400" />
                </div>

                <Link
                  href="/dashboard"
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800/70 hover:text-white transition-all"
                >
                  <Archive className="w-4 h-4 text-slate-400" />
                  <span>Arsip &amp; Dokumen</span>
                </Link>
              </nav>
            </div>

            {/* Section 2: LAYANAN SURAT */}
            <div>
              <p className="px-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase mb-2">
                LAYANAN SURAT
              </p>
              <nav className="space-y-1">
                <Link
                  href="/pengajuan"
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800/70 hover:text-white transition-all"
                >
                  <div className="flex items-center gap-3">
                    <PlusCircle className="w-4 h-4 text-blue-400" />
                    <span>Ajukan Surat Baru</span>
                  </div>
                  <Plus className="w-3.5 h-3.5 text-blue-400" />
                </Link>

                <Link
                  href="/pelacakan"
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800/70 hover:text-white transition-all"
                >
                  <Compass className="w-4 h-4 text-slate-400" />
                  <span>Status &amp; Pelacakan</span>
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Sidebar Footer: Server Status */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <div className="p-2 rounded-lg bg-slate-700/60 text-slate-300">
              <Server className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-slate-400 truncate">Status Server</p>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-emerald-400 truncate">
                  Terhubung Aktif
                </span>
              </div>
            </div>
          </div>

          <div className="mt-2 text-center">
            <Link
              href="/login"
              className="text-[11px] text-slate-400 hover:text-slate-300 inline-flex items-center gap-1 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              Kembali ke Halaman Login
            </Link>
          </div>
        </div>
      </aside>

      {/* ──────────────────────────────────────────────────────────
          MAIN CONTENT AREA (Offset by sidebar width on lg)
      ────────────────────────────────────────────────────────── */}
      <div className="flex-1 lg:ml-72 flex flex-col min-w-0">
        {/* ──────────────────────────────────────────────────────────
            1. TOP NAVIGATION BAR
        ────────────────────────────────────────────────────────── */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3.5 shadow-xs">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Mobile hamburger + Location identifier */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Buka Menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-slate-700 font-semibold tracking-wider text-xs sm:text-sm">
                <div className="p-1 rounded bg-slate-100 text-slate-600">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">TAROGONG KALER - GARUT</span>
              </div>
            </div>

            {/* Right: Role Switcher, Notification, Profile */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Role Switcher */}
              <div className="hidden md:flex items-center p-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium">
                {(["Staf TU", "Siswa & Guru", "Kepala Sekolah"] as RoleNav[]).map((role) => (
                  <button
                    key={role}
                    onClick={() => setActiveRole(role)}
                    className={`px-3.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
                      activeRole === role
                        ? "bg-slate-900 text-white font-semibold shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>

              {/* Notification Bell */}
              <button
                className="relative p-2 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Notifikasi"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              </button>

              {/* User Profile (Headmaster / Executive) */}
              <div className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-slate-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-800 leading-tight">
                    Mohammad Allejar, S.Pd., M.Pd.
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Kepala SMK Darussalam Garut
                  </p>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-900 to-blue-900 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-slate-100 overflow-hidden">
                    <span>MA</span>
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ──────────────────────────────────────────────────────────
            MAIN BODY WRAPPER
        ────────────────────────────────────────────────────────── */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* ──────────────────────────────────────────────────────────
              2. MAIN CONTENT - HEADER
          ────────────────────────────────────────────────────────── */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-2 border-b border-slate-200">
            <div>
              {/* Top tags */}
              <div className="flex items-center gap-2.5 flex-wrap text-xs mb-1.5">
                <span className="font-extrabold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 uppercase tracking-wider text-[10px]">
                  OTORISASI PIMPINAN EKSEKUTIF
                </span>
                <span className="font-mono font-bold text-slate-600">
                  Ref: #SRT-2025-0142
                </span>
                <span className="text-slate-300">&bull;</span>
                <div className="flex items-center gap-1.5 font-semibold text-blue-700">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>Tingkat Urgensi: Prioritas</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Lembar Persetujuan Naskah Dinas &amp; Tanda Tangan Elektronik
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
                Penetapan legalitas dokumen dinas SMK Darussalam berbasis sertifikasi kriptografi BSrE.
              </p>
            </div>

            {/* Action Buttons (Right-aligned) */}
            <div className="flex items-center gap-2.5 self-start xl:self-auto flex-wrap">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-all shadow-xs"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>Cetak Draft</span>
              </button>

              <button
                type="button"
                onClick={() => alert("Menampilkan log audit siklus hidup dokumen.")}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-all shadow-xs"
              >
                <ClipboardList className="w-3.5 h-3.5 text-slate-500" />
                <span>Audit Log</span>
              </button>

              <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-sky-200 bg-sky-50 text-sky-800 text-xs font-bold shadow-xs">
                <Shield className="w-3.5 h-3.5 text-sky-600" />
                <span>Enkripsi RSA-4096 Bit</span>
              </div>
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────────
              3. MAIN CONTENT - TWO COLUMN LAYOUT
              7 Cols Left (Document Preview) / 5 Cols Right (Controls)
          ────────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* ══════════════════════════════════════════════════════════
                4. LEFT COLUMN (Document Previewer) - lg:col-span-7
            ══════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              {/* Toolbar */}
              <div className="border-b border-slate-200 p-2.5 px-4 flex items-center justify-between bg-white text-slate-600 text-xs">
                <div className="flex items-center gap-2 font-medium text-slate-700">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-slate-900">
                    Pratinjau Naskah Kedinasan (Format A4 Resmi)
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setZoomLevel(Math.max(60, zoomLevel - 10))}
                    className="p-1 text-slate-500 hover:text-slate-800 rounded transition-colors"
                    title="Perkecil"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="font-mono text-xs font-bold text-slate-700 min-w-[42px] text-center">
                    {zoomLevel}%
                  </span>
                  <button
                    onClick={() => setZoomLevel(Math.min(140, zoomLevel + 10))}
                    className="p-1 text-slate-500 hover:text-slate-800 rounded transition-colors"
                    title="Perbesar"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>

                  <div className="h-4 w-px bg-slate-200" />

                  <button
                    onClick={() => alert("Menampilkan naskah dinas dalam mode layar penuh.")}
                    className="p-1 text-slate-500 hover:text-slate-800 rounded transition-colors"
                    title="Layar Penuh"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Document Canvas Area */}
              <div className="bg-[#e9edf2] p-4 sm:p-8 flex justify-center overflow-auto min-h-[700px]">
                <div
                  className="bg-white text-slate-900 p-8 sm:p-12 rounded-sm shadow-xl max-w-2xl w-full border border-slate-300 font-serif leading-relaxed text-[12px] sm:text-[13px] transition-transform duration-200"
                  style={{
                    transform: `scale(${zoomLevel / 100})`,
                    transformOrigin: "top center",
                  }}
                >
                  {/* KOP SURAT (Letterhead) */}
                  <div className="text-center relative pb-3 border-b-4 border-double border-slate-900 mb-6">
                    <div className="absolute left-0 top-1 hidden sm:block">
                      <div className="w-14 h-14 rounded-full border-2 border-slate-800 flex items-center justify-center p-1 bg-slate-50">
                        <School className="w-8 h-8 text-slate-800" />
                      </div>
                    </div>
                    <div className="space-y-0.5 sm:px-16">
                      <p className="font-bold text-[11px] sm:text-[12px] uppercase tracking-wider text-slate-700">
                        YAYASAN PENDIDIKAN ISLAM DARUSSALAM
                      </p>
                      <h2 className="font-black text-[15px] sm:text-[17px] uppercase tracking-tight text-slate-950">
                        SMK DARUSSALAM TAROGONG KALER GARUT
                      </h2>
                      <p className="font-sans text-[9px] sm:text-[10px] font-semibold text-slate-700 uppercase tracking-tight">
                        KOMPETENSI KEAHLIAN: REKAYASA PERANGKAT LUNAK &bull; TEKNIK KOMPUTER DAN JARINGAN &bull; TEKNIK KENDARAAN RINGAN
                      </p>
                      <p className="font-sans text-[8.5px] sm:text-[9.5px] text-slate-600">
                        Akreditasi: &ldquo;A&rdquo; (Unggul) &bull; NSS: 322021104018 &bull; NPSN: 20231234
                      </p>
                      <p className="font-sans text-[8px] sm:text-[9px] text-slate-500">
                        Jl. Suherman No. 23 Tarogong Kaler, Kab. Garut 44151 &bull; Telp: (0262) 234123 &bull; smkdarussalamgarut.sch.id
                      </p>
                    </div>
                  </div>

                  {/* Letter Info Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 font-sans text-xs">
                    <table className="w-auto text-left">
                      <tbody>
                        <tr>
                          <td className="pr-3 font-semibold text-slate-700">Nomor</td>
                          <td className="pr-2">:</td>
                          <td className="font-mono font-bold text-slate-900">
                            421.5/142-SMK.DAR/PKL/V/2025
                          </td>
                        </tr>
                        <tr>
                          <td className="pr-3 font-semibold text-slate-700">Lampiran</td>
                          <td className="pr-2">:</td>
                          <td className="text-slate-800">
                            1 (satu) Berkas Daftar Peserta &amp; Jadwal
                          </td>
                        </tr>
                        <tr>
                          <td className="pr-3 font-semibold text-slate-700">Hal</td>
                          <td className="pr-2">:</td>
                          <td className="font-bold text-slate-900">
                            Permohonan Tempat &amp; Surat Pengantar PKL
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="text-right text-slate-700">
                      <p>Garut, 24 Februari 2025</p>
                    </div>
                  </div>

                  {/* Recipient */}
                  <div className="mb-6 space-y-0.5">
                    <p>Yth. Pimpinan HRD &amp; Rekrutmen Industri</p>
                    <p className="font-bold text-slate-950">
                      PT Telekomunikasi Solusindo Bandung Mandiri
                    </p>
                    <p className="text-slate-700">
                      Jl. Asia Afrika No. 120, Kota Bandung, Jawa Barat
                    </p>
                  </div>

                  {/* Body Text */}
                  <div className="space-y-3 text-justify leading-relaxed text-slate-900">
                    <p>Dengan hormat,</p>
                    <p className="indent-6">
                      Sehubungan dengan pelaksanaan Kurikulum Merdeka Pendidikan Vokasi dan upaya peningkatan kompetensi keahlian siswa melalui sinkronisasi dunia usaha dan industri (DUDI), bersama ini kami mengajukan permohonan pelaksanaan Praktik Kerja Lapangan (PKL) bagi peserta didik kami pada semester gasal Tahun Ajaran 2024/2025.
                    </p>

                    {/* Details Box */}
                    <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg text-xs font-sans space-y-1.5 my-3">
                      <div className="flex">
                        <span className="w-40 font-semibold text-slate-600">Periode Pelaksanaan</span>
                        <span className="font-bold text-slate-800">: 01 Juli 2025 s.d. 31 Desember 2025 (6 Bulan)</span>
                      </div>
                      <div className="flex">
                        <span className="w-40 font-semibold text-slate-600">Jumlah Peserta</span>
                        <span className="font-bold text-slate-800">: 4 (Empat) Orang Siswa Jurusan Rekayasa Perangkat Lunak</span>
                      </div>
                      <div className="flex">
                        <span className="w-40 font-semibold text-slate-600">Daftar Terlampir</span>
                        <span className="font-bold text-slate-800">: Lampiran 1 (Daftar Biodata &amp; Portofolio Siswa)</span>
                      </div>
                    </div>

                    <p className="indent-6">
                      Besar harapan kami agar Bapak/Ibu dapat menerima dan membina peserta didik kami. Atas perhatian, kepercayaan, dan kerja sama yang baik, kami ucapkan terima kasih.
                    </p>
                  </div>

                  {/* Signature Block */}
                  <div className="mt-8 flex justify-end">
                    <div className="text-center w-64 space-y-1">
                      <p className="font-bold text-slate-900">Kepala SMK Darussalam Garut,</p>

                      {/* Interactive Signature Area */}
                      <div className="my-2 p-3 rounded-xl border-2 border-dashed border-sky-400 bg-sky-50/50 flex flex-col items-center justify-center min-h-[90px] transition-all">
                        {isSigned ? (
                          <div className="space-y-1 text-center animate-fade-in">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>TERVERIFIKASI TTE BSrE</span>
                            </div>
                            <div className="flex justify-center my-1 text-slate-800">
                              <QrCode className="w-12 h-12 text-slate-900" />
                            </div>
                            <p className="text-[8px] font-mono text-slate-500">
                              SHA256: 8f3c...b291a
                            </p>
                          </div>
                        ) : (
                          <div className="text-center space-y-1">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[9px] font-bold uppercase tracking-wider">
                              <Sparkles className="w-3 h-3 text-sky-600" />
                              Siap Dibubuhi TTE
                            </span>
                            <p className="text-[8px] text-slate-500 font-mono">
                              SHA-256 Digest Standby
                            </p>
                          </div>
                        )}
                      </div>

                      <p className="font-bold text-slate-950 underline underline-offset-2">
                        Mohammad Allejar, S.Pd., M.Pd.
                      </p>
                      <p className="text-[10px] text-slate-600 font-sans">
                        NIP: 196803121994031005 &bull; NRK: 202301004
                      </p>
                    </div>
                  </div>

                  {/* Document Footer Note */}
                  <div className="mt-10 pt-4 border-t border-slate-200 text-[9px] font-sans text-slate-400 leading-normal flex items-start gap-1.5">
                    <Lock className="w-3 h-3 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span>
                      CATATAN OTOMASI: Dokumen ini dihasilkan secara terpusat melalui SIM-SURAT terenkripsi BSrE BSSN RI. Keabsahan fisik dan digital dapat divalidasi dengan memindai kode QR resmi yayasan.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════
                5. RIGHT COLUMN (Authorization Controls) - lg:col-span-5
            ══════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-5 space-y-5">
              {/* Profile Card (Dark navy bg) */}
              <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-sm border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-500 text-white font-black text-base flex items-center justify-center ring-2 ring-slate-700 shadow-xs flex-shrink-0">
                      MA
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white leading-tight">
                        Mohammad Allejar, S.Pd., M.Pd.
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Kepala SMK Darussalam Garut
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-500/20 text-sky-300 border border-blue-500/30 uppercase tracking-wider">
                    Auth Level: 01
                  </span>
                </div>

                {/* Sub-box: Certificate status */}
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-white text-[11px] leading-tight">
                        STATUS SERTIFIKAT TTE BSrE
                      </p>
                      <p className="text-[10px] text-emerald-400 font-semibold">
                        Aktif &amp; Tervalidasi
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Berlaku s.d. Des 2026
                  </span>
                </div>
              </div>

              {/* Verification History */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-slate-500" />
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Riwayat Verifikasi Dokumen
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">
                    Tahap 2 dari 2
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Step 1 */}
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-1 flex-wrap">
                        <p className="font-bold text-slate-900">Syiffa</p>
                        <span className="text-[10px] text-slate-400 font-medium">
                          24 Feb 2025, 10:15 WIB
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Staf Verifikator Tata Usaha
                      </p>
                      <div className="mt-1.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600 leading-relaxed italic">
                        &ldquo;Semua berkas Dapodik, rekomendasi Kaprogli, dan kelayakan instansi mitra telah diverifikasi lengkap. Layak untuk pengesahan TTE.&rdquo;
                      </div>
                    </div>
                  </div>

                  {/* Step 2 (Active) */}
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="w-3 h-3" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-1 flex-wrap">
                        <p className="font-bold text-slate-900">
                          Persetujuan &amp; TTE Kepala Sekolah
                        </p>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                          MENUNGGU KEPUTUSAN
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Menunggu input Passphrase TTE Pimpinan...
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Form */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Key className="w-4 h-4 text-blue-600" />
                    <h3 className="text-sm font-bold text-slate-900">
                      Passphrase TTE Pimpinan
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500">
                    Masukkan kode sandi kunci privat untuk membubuhkan tanda tangan elektronik resmi.
                  </p>
                </div>

                {/* Password input */}
                <div>
                  <div className="relative">
                    <input
                      type={showPassphrase ? "text" : "password"}
                      value={passphrase}
                      onChange={(e) => setPassphrase(e.target.value)}
                      placeholder="Ketik 8-16 digit passphrase TTE..."
                      className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50/75 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassphrase(!showPassphrase)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      title="Lihat Passphrase"
                    >
                      {showPassphrase ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Links below input */}
                  <div className="flex items-center justify-between text-[11px] mt-2">
                    <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Token Hardware E-KTP / HSM Terdeteksi</span>
                    </div>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Silakan hubungi administrator SIM-SEKOLAH untuk pemulihan token BSrE.");
                      }}
                      className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                    >
                      Lupa Passphrase?
                    </a>
                  </div>
                </div>

                {/* Textarea Catatan Tambahan */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Catatan Tambahan / Instruksi Disposisi (Opsional)
                  </label>
                  <textarea
                    rows={2}
                    value={catatanDisposisi}
                    onChange={(e) => setCatatanDisposisi(e.target.value)}
                    placeholder="Tulis instruksi khusus untuk tata usaha atau instansi mitra..."
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/75 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all leading-relaxed"
                  />
                </div>

                {/* Primary Approval Button */}
                <button
                  type="button"
                  onClick={handleApprove}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md shadow-slate-900/10 active:scale-95"
                >
                  <FileSignature className="w-4 h-4" />
                  <span>Setujui &amp; Bubuhkan Tanda Tangan Digital (TTE)</span>
                </button>

                {/* Secondary Buttons (Grid 2 cols) */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      alert("Permohonan dikembalikan ke Tata Usaha untuk revisi draf.")
                    }
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-blue-300 text-blue-700 bg-white hover:bg-blue-50 text-xs font-semibold transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Minta Revisi Berkas</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      alert("Permohonan naskah dinas ini ditolak oleh Kepala Sekolah.")
                    }
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-xs font-semibold transition-all"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Tolak Permohonan</span>
                  </button>
                </div>
              </div>

              {/* Footer Alert */}
              <div className="p-3.5 rounded-xl bg-slate-100/90 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600">
                <Lock className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                <p className="leading-relaxed">
                  Naskah dinas akan terverifikasi secara resmi pada portal verifikasi naskah Pemprov Jabar dan tersimpan permanen dalam e-Arsip Kearsipan Nasional.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
