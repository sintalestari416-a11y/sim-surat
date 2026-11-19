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
  Zap,
  Info,
  CheckCircle2,
  Copy,
  Lock,
  Building2,
  ChevronDown,
  UploadCloud,
  FileText,
  Trash2,
  Save,
  Send,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  Check,
} from "lucide-react";

type RoleNav = "Staf TU" | "Siswa & Guru" | "Kepala Sekolah";
type KategoriPemohon = "siswa" | "guru";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  status: string;
}

export default function PengajuanSuratPage() {
  const [activeRole, setActiveRole] = useState<RoleNav>("Staf TU");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [kategori, setKategori] = useState<KategoriPemohon>("siswa");
  const [copied, setCopied] = useState(false);
  const [pernyataanChecked, setPernyataanChecked] = useState(true);

  // Form states
  const [nama, setNama] = useState("Ahmad Fauzi Pratama");
  const [nisn, setNisn] = useState("0058492019");
  const [kelas, setKelas] = useState("XII RPL 1 - Rekayasa Perangkat Lunak");
  const [jenisSurat, setJenisSurat] = useState("Surat Keterangan Siswa Aktif");
  const [tujuan, setTujuan] = useState(
    "Dinas Pendidikan Provinsi Jawa Barat / PT Telkom Indonesia"
  );
  const [keperluan, setKeperluan] = useState(
    "Permohonan penerbitan surat pengantar resmi sebagai prasyarat administratif pelaksanaan Praktik Kerja Lapangan (PKL) Divisi IT Infrastructure periode Semester Genap Tahun Ajaran 2024/2025."
  );

  // Files
  const [files, setFiles] = useState<UploadedFile[]>([
    {
      id: "f1",
      name: "Kartu_Pelajar_Ahmad.pdf",
      size: "420 KB",
      status: "Terunggah",
    },
    {
      id: "f2",
      name: "Surat_Penerimaan_Magang.pdf",
      size: "1.1 MB",
      status: "Terunggah",
    },
  ]);

  const handleCopyNisn = () => {
    navigator.clipboard?.writeText(nisn);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRemoveFile = (id: string) => {
    setFiles(files.filter((f) => f.id !== id));
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

                <Link
                  href="/persetujuan"
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800/70 hover:text-white transition-all"
                >
                  <FileSignature className="w-4 h-4 text-slate-400" />
                  <span>Persetujuan Digital</span>
                </Link>

                <Link
                  href="/dashboard"
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800/70 hover:text-white transition-all"
                >
                  <Archive className="w-4 h-4 text-slate-400" />
                  <span>Arsip & Dokumen</span>
                </Link>
              </nav>
            </div>

            {/* Section 2: LAYANAN SURAT */}
            <div>
              <p className="px-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase mb-2">
                LAYANAN SURAT
              </p>
              <nav className="space-y-1">
                {/* ACTIVE ITEM: Ajukan Surat Baru */}
                <div className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold bg-sky-500/15 text-sky-400 shadow-sm border border-sky-500/20">
                  <div className="flex items-center gap-3">
                    <PlusCircle className="w-4 h-4 text-sky-400" />
                    <span>Ajukan Surat Baru</span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-sm shadow-sky-400" />
                </div>

                <Link
                  href="/pelacakan"
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800/70 hover:text-white transition-all"
                >
                  <Compass className="w-4 h-4 text-slate-400" />
                  <span>Status & Pelacakan</span>
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
            2. TOP NAVIGATION BAR
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

              {/* User Profile */}
              <div className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-slate-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-800 leading-tight">
                    Syiffa
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Administrasi Tata Usaha
                  </p>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-slate-100 overflow-hidden">
                    <span>SY</span>
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
        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto w-full">
          {/* ──────────────────────────────────────────────────────────
              3. MAIN CONTENT - HEADER
          ────────────────────────────────────────────────────────── */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
            <div>
              {/* Top breadcrumb/tag */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 tracking-wide mb-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>Layanan Persuratan Online - SMK DARUSSALAM TAROGONG KALER</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Formulir Pengajuan Permohonan Surat
              </h1>
              <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                Layanan terpadu penerbitan administrasi resmi siswa dan tenaga kependidikan berbasis verifikasi digital.
              </p>
            </div>

            {/* Right-aligned Badge: Estimasi */}
            <div className="self-start md:self-auto flex-shrink-0">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 text-xs font-semibold shadow-xs">
                <div className="p-1 rounded-lg bg-sky-500 text-white">
                  <Zap className="w-3.5 h-3.5 fill-white" />
                </div>
                <span>Estimasi Pemrosesan TU 1 x 24 Jam Kerja</span>
              </div>
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────────
              4. MAIN CONTENT - STEPPER (Progress Indicator)
          ────────────────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
              {/* Step 1: Active */}
              <div
                onClick={() => setActiveStep(1)}
                className="cursor-pointer flex items-center gap-3.5 pb-3 border-b-2 border-blue-600 transition-all"
              >
                <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-sm flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="text-[11px] font-bold text-blue-600 tracking-wider uppercase">
                    TAHAP 01
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-slate-900">
                    Informasi Pemohon &amp; Jenis Surat
                  </p>
                </div>
              </div>

              {/* Step 2: Inactive */}
              <div
                onClick={() => setActiveStep(2)}
                className="cursor-pointer flex items-center gap-3.5 pb-3 border-b-2 border-transparent hover:border-slate-200 transition-all opacity-70 hover:opacity-100"
              >
                <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 border border-slate-200 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
                    TAHAP 02
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-600">
                    Keperluan &amp; Data Pendukung
                  </p>
                </div>
              </div>

              {/* Step 3: Inactive */}
              <div
                onClick={() => setActiveStep(3)}
                className="cursor-pointer flex items-center gap-3.5 pb-3 border-b-2 border-transparent hover:border-slate-200 transition-all opacity-70 hover:opacity-100"
              >
                <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 border border-slate-200 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
                    TAHAP 03
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-600">
                    Unggah Berkas &amp; Konfirmasi
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────────
              5. MAIN CONTENT - INFO BANNER
          ────────────────────────────────────────────────────────── */}
          <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4 sm:p-5 flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-blue-600 text-white flex-shrink-0 mt-0.5">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Panduan Pengajuan Resmi Administrasi Tata Usaha
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Mohon pastikan data dan dokumen pendukung sesuai agar proses verifikasi TU berjalan lancar dalam 1x24 jam kerja. Pengajuan yang disetujui akan diterbitkan dengan cap digital resmi dan QR Code autentikasi yayasan.
              </p>
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────────
              FORM CONTAINER
          ────────────────────────────────────────────────────────── */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {/* ──────────────────────────────────────────────────────────
                6. FORM SECTION 1: Kategori Pemohon & Identitas Akademik
            ────────────────────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-slate-100 mb-6">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    1. Kategori Pemohon &amp; Identitas Akademik
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Data induk terintegrasi langsung dengan database kesiswaan Dapodik sekolah.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>IDENTIFIKASI TERVERIFIKASI</span>
                </div>
              </div>

              {/* Radio Cards: Kategori Pemohon */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  Pilih Kategori Pemohon <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Option 1: Siswa (Active Card) */}
                  <div
                    onClick={() => setKategori("siswa")}
                    className={`cursor-pointer rounded-xl p-4 flex items-start gap-3.5 transition-all duration-200 ${
                      kategori === "siswa"
                        ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 border-2 border-slate-900"
                        : "bg-white text-slate-800 border-2 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="pt-0.5">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          kategori === "siswa"
                            ? "border-sky-400 bg-sky-400"
                            : "border-slate-400 bg-transparent"
                        }`}
                      >
                        {kategori === "siswa" && (
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                        )}
                      </div>
                    </div>
                    <div>
                      <p
                        className={`text-sm font-bold ${
                          kategori === "siswa" ? "text-white" : "text-slate-900"
                        }`}
                      >
                        Siswa / Anggota OSIS
                      </p>
                      <p
                        className={`text-xs mt-0.5 ${
                          kategori === "siswa" ? "text-slate-300" : "text-slate-500"
                        }`}
                      >
                        Peserta didik aktif SMK Darussalam
                      </p>
                    </div>
                  </div>

                  {/* Option 2: Guru / Tenaga Kependidikan (Inactive Card) */}
                  <div
                    onClick={() => setKategori("guru")}
                    className={`cursor-pointer rounded-xl p-4 flex items-start gap-3.5 transition-all duration-200 ${
                      kategori === "guru"
                        ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 border-2 border-slate-900"
                        : "bg-white text-slate-800 border-2 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="pt-0.5">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          kategori === "guru"
                            ? "border-sky-400 bg-sky-400"
                            : "border-slate-400 bg-transparent"
                        }`}
                      >
                        {kategori === "guru" && (
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                        )}
                      </div>
                    </div>
                    <div>
                      <p
                        className={`text-sm font-bold ${
                          kategori === "guru" ? "text-white" : "text-slate-900"
                        }`}
                      >
                        Guru / Tenaga Kependidikan
                      </p>
                      <p
                        className={`text-xs mt-0.5 ${
                          kategori === "guru" ? "text-slate-300" : "text-slate-500"
                        }`}
                      >
                        Pendidik atau staf resmi sekolah
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input Grid (2 columns) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* 1. Nama Lengkap Pemohon */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Nama Lengkap Pemohon <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      Otomatis Akun
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50/75 text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    Data identitas divalidasi melalui pangkalan data Dapodik sekolah.
                  </p>
                </div>

                {/* 2. NISN / NIP */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      NISN / NIP <span className="text-rose-500">*</span>
                    </label>
                    {copied && (
                      <span className="text-[10px] font-bold text-blue-600 animate-pulse">
                        Tersalin!
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={nisn}
                      onChange={(e) => setNisn(e.target.value)}
                      className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50/75 text-sm font-semibold text-slate-900 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={handleCopyNisn}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded transition-colors"
                      title="Salin NISN"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    Nomor Induk Siswa Nasional wajib 10 digit angka resmi.
                  </p>
                </div>

                {/* 3. Kelas / Konsentrasi Keahlian */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Kelas / Konsentrasi Keahlian <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={kelas}
                      readOnly
                      className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-sm font-semibold text-slate-700 cursor-not-allowed select-none"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Lock className="w-4 h-4" />
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    Terkunci otomatis berdasarkan rombongan belajar aktif semester ini.
                  </p>
                </div>

                {/* 4. Jenis Surat yang Dimohon */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Jenis Surat yang Dimohon <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={jenisSurat}
                      onChange={(e) => setJenisSurat(e.target.value)}
                      className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50/75 text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                    >
                      <option value="Surat Keterangan Siswa Aktif">
                        Surat Keterangan Siswa Aktif
                      </option>
                      <option value="Surat Pengantar Praktik Kerja Lapangan (PKL)">
                        Surat Pengantar Praktik Kerja Lapangan (PKL)
                      </option>
                      <option value="Surat Rekomendasi Beasiswa & Prestasi">
                        Surat Rekomendasi Beasiswa &amp; Prestasi
                      </option>
                      <option value="Surat Keterangan Berkelakuan Baik (SKBB)">
                        Surat Keterangan Berkelakuan Baik (SKBB)
                      </option>
                      <option value="Surat Izin / Dispensasi Kegiatan Resmi">
                        Surat Izin / Dispensasi Kegiatan Resmi
                      </option>
                    </select>
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    Format nomor dan kop surat akan disesuaikan dengan jenis surat yang dipilih.
                  </p>
                </div>

                {/* 5. Tujuan & Instansi Penerima (Col-span-2) */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Tujuan &amp; Instansi Penerima <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={tujuan}
                      onChange={(e) => setTujuan(e.target.value)}
                      placeholder="Contoh: Dinas Pendidikan Provinsi Jawa Barat..."
                      className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50/75 text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Building2 className="w-4 h-4" />
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    Dicantumkan langsung pada baris tujuan resmi lembar surat keputusan kepala sekolah.
                  </p>
                </div>

                {/* 6. Uraian Keperluan Spesifik (Col-span-2) */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Uraian Keperluan Spesifik <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={keperluan}
                    onChange={(e) => setKeperluan(e.target.value)}
                    maxLength={500}
                    placeholder="Tuliskan secara lengkap maksud dan peruntukan surat dinas ini..."
                    className="w-full p-3.5 rounded-xl border border-slate-200 bg-slate-50/75 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all leading-relaxed"
                  />
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1.5">
                    <span>Tuliskan keterangan yang lugas dan sesuai format bahasa baku.</span>
                    <span className="font-mono font-medium text-slate-500">
                      {keperluan.length} / 500 Karakter
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ──────────────────────────────────────────────────────────
                7. FORM SECTION 2: Unggah Berkas Persyaratan & Dokumen Pendukung
            ────────────────────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-slate-100 mb-6">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    2. Unggah Berkas Persyaratan &amp; Dokumen Pendukung
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Lampirkan kartu identitas atau berkas pengantar dari instansi yang dituju.
                  </p>
                </div>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 self-start sm:self-auto">
                  Format PDF / JPG / PNG
                </span>
              </div>

              {/* Drag & Drop Zone */}
              <div className="border-2 border-dashed border-sky-300 bg-sky-50/40 hover:bg-sky-50/80 transition-colors rounded-2xl p-8 sm:p-10 text-center cursor-pointer group">
                <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mx-auto mb-3.5 group-hover:scale-105 transition-transform">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <p className="text-sm font-bold text-slate-800">
                  Tarik &amp; Letakkan Berkas di Sini, atau{" "}
                  <span className="text-blue-600 underline cursor-pointer hover:text-blue-700">
                    Pilih dari Komputer
                  </span>
                </p>
                <p className="text-xs text-slate-500 mt-1.5 max-w-md mx-auto leading-relaxed">
                  Mendukung format dokumen portabel PDF atau gambar resolusi tinggi (Maks. 2 MB per berkas). Harap pastikan pindai terbaca tajam.
                </p>
              </div>

              {/* Uploaded Files List */}
              <div className="mt-6">
                <p className="text-xs font-bold text-slate-500 tracking-wider uppercase mb-3">
                  BERKAS TERLAMPIR (2 FILE SIAP DITINJAU):
                </p>

                <div className="space-y-3">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="bg-white rounded-xl border border-slate-200 p-3.5 flex items-center justify-between gap-3 shadow-xs hover:border-slate-300 transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-900 truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {file.size} &bull;{" "}
                            <span className="text-emerald-600 font-semibold">
                              {file.status}
                            </span>
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveFile(file.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Hapus berkas"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ──────────────────────────────────────────────────────────
                8. FOOTER & ACTIONS
            ────────────────────────────────────────────────────────── */}
            {/* Integrity Statement Checkbox */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={pernyataanChecked}
                  onChange={(e) => setPernyataanChecked(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600 flex-shrink-0"
                />
                <div>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                    Pernyataan Integritas dan Keabsahan Dokumen
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Saya menyatakan bahwa seluruh data yang diisi adalah benar, sah, dan dapat dipertanggungjawabkan sesuai tata tertib administrasi akademik SMK Darussalam Tarogong Kaler.
                  </p>
                </div>
              </label>
            </div>

            {/* Bottom Action Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
              {/* Left Security Note */}
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Lock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>Data dienkripsi secara aman dalam protokol persuratan sekolah.</span>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-3 self-end sm:self-auto flex-wrap">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all shadow-xs"
                >
                  <Save className="w-4 h-4 text-slate-500" />
                  <span>Simpan Draf</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert("Pengajuan surat berhasil dikirim ke Tata Usaha!")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold transition-all shadow-md shadow-slate-900/10 active:scale-[0.98]"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pengajuan Surat</span>
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
