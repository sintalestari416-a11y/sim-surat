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
  RefreshCw,
  ShieldCheck,
  AlertTriangle,
  Search,
  Calendar,
  Filter,
  Plus,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Copy,
  Check,
  Clock,
  ArrowRight,
  CheckCircle2,
  FileText,
  Download,
  MessageCircle,
  Menu,
  X,
  ExternalLink,
  QrCode,
  Sparkles,
} from "lucide-react";

type RoleNav = "Staf TU" | "Siswa & Guru" | "Kepala Sekolah";
type FilterTab =
  | "Semua (18)"
  | "Menunggu Verifikasi (1)"
  | "Sedang Diproses (2)"
  | "Menunggu TTD KS (1)";

interface TrackingItem {
  id: string;
  tiket: string;
  jenis: string;
  tujuan?: string;
  tanggal: string;
  estimasi: string;
  status: "Menunggu TTD KS" | "Selesai" | "Sedang Diproses" | "Perlu Revisi";
  isActive?: boolean;
}

const dummyTable: TrackingItem[] = [
  {
    id: "1",
    tiket: "#SRT-2025-0142",
    jenis: "Surat Pengantar PKL / Magang",
    tujuan: "PT Telkom Indonesia Witel Garut",
    tanggal: "24 Feb 2025",
    estimasi: "25 Feb 2025",
    status: "Menunggu TTD KS",
    isActive: true,
  },
  {
    id: "2",
    tiket: "#SRT-2025-0138",
    jenis: "Keterangan Siswa Aktif",
    tujuan: "Kemenag Kab. Garut",
    tanggal: "22 Feb 2025",
    estimasi: "23 Feb 2025",
    status: "Selesai",
    isActive: false,
  },
  {
    id: "3",
    tiket: "#SRT-2025-0131",
    jenis: "Rekomendasi Beasiswa KIP-K",
    tujuan: "Puslapdik Kemendikbudristek",
    tanggal: "20 Feb 2025",
    estimasi: "22 Feb 2025",
    status: "Sedang Diproses",
    isActive: false,
  },
  {
    id: "4",
    tiket: "#SRT-2025-0125",
    jenis: "Legalisir Ijazah",
    tujuan: "Keperluan Seleksi Masuk PTN",
    tanggal: "18 Feb 2025",
    estimasi: "Tertunda",
    status: "Perlu Revisi",
    isActive: false,
  },
  {
    id: "5",
    tiket: "#SRT-2025-0119",
    jenis: "Dispensasi Kegiatan",
    tujuan: "Lomba Kompetensi Siswa (LKS) SMK",
    tanggal: "15 Feb 2025",
    estimasi: "16 Feb 2025",
    status: "Selesai",
    isActive: false,
  },
];

export default function PelacakanSuratPage() {
  const [activeRole, setActiveRole] = useState<RoleNav>("Staf TU");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterTab>("Semua (18)");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicket, setSelectedTicket] = useState("#SRT-2025-0142");
  const [copied, setCopied] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleCopyTicket = () => {
    navigator.clipboard?.writeText(selectedTicket);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredData = dummyTable.filter((row) => {
    const matchesSearch =
      row.tiket.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.jenis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (row.tujuan && row.tujuan.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeFilter === "Menunggu Verifikasi (1)") {
      return row.status === "Menunggu TTD KS";
    }
    if (activeFilter === "Sedang Diproses (2)") {
      return row.status === "Sedang Diproses";
    }
    if (activeFilter === "Menunggu TTD KS (1)") {
      return row.status === "Menunggu TTD KS";
    }
    return true;
  });

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

                {/* ACTIVE ITEM: Status & Pelacakan */}
                <div className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold bg-sky-500/15 text-sky-400 shadow-sm border border-sky-500/20">
                  <div className="flex items-center gap-3">
                    <Compass className="w-4 h-4 text-sky-400" />
                    <span>Status & Pelacakan</span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-sm shadow-sky-400" />
                </div>
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
        <main className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Header Title & Tagline */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 tracking-wide mb-1">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>Monitoring &amp; Audit Trail Persuratan Sekolah</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Status &amp; Pelacakan Permohonan Surat
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Pantau progres verifikasi, disposisi, dan legalitas tanda tangan digital secara real-time.
              </p>
            </div>
            <Link
              href="/pengajuan"
              className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md shadow-slate-900/10 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>+ Buat Permohonan Baru</span>
            </Link>
          </div>

          {/* ──────────────────────────────────────────────────────────
              2. MAIN CONTENT - 4 STAT CARDS (Top Grid)
          ────────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Card 1: TOTAL PERMOHONAN */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">
                  TOTAL PERMOHONAN
                </span>
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600">
                  <Inbox className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
                18
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Semester Genap 2024/2025
              </p>
            </div>

            {/* Card 2: SEDANG DIPROSES */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">
                  SEDANG DIPROSES
                </span>
                <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600">
                  <RefreshCw className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-blue-600 tracking-tight mb-2">
                3
              </div>
              <div className="flex items-center gap-1.5 text-xs text-blue-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                <span>1 Verifikasi + 2 TTD KS</span>
              </div>
            </div>

            {/* Card 3: SELESAI & TERBIT */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">
                  SELESAI &amp; TERBIT
                </span>
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight mb-2">
                14
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Tersimpan di e-Arsip</span>
              </div>
            </div>

            {/* Card 4: PERLU TINDAKAN / CATATAN */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">
                  PERLU TINDAKAN / CATATAN
                </span>
                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600">
                  <AlertTriangle className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-rose-600 tracking-tight mb-2">
                1
              </div>
              <div className="flex items-center gap-1.5 text-xs text-rose-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0" />
                <span>Menunggu Berkas Tambahan</span>
              </div>
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────────
              3. MAIN CONTENT - LAYOUT GRID (Below Stats)
              7 Cols Left / 5 Cols Right on LG
          ────────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* ══════════════════════════════════════════════════════════
                4. LEFT SECTION (Table & Filters) - lg:col-span-7
            ══════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-7 space-y-6">
              {/* Controls & Filter Bar */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
                {/* Search & Action Row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative w-full sm:flex-1">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari no. tiket, jenis surat..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-all shadow-xs">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>Filter Tanggal</span>
                    </button>
                    <Link
                      href="/pengajuan"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Ajukan Baru</span>
                    </Link>
                  </div>
                </div>

                {/* Filter Tabs (Segmented pills) */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
                  {(
                    [
                      "Semua (18)",
                      "Menunggu Verifikasi (1)",
                      "Sedang Diproses (2)",
                      "Menunggu TTD KS (1)",
                    ] as FilterTab[]
                  ).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveFilter(tab)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                        activeFilter === tab
                          ? "bg-slate-900 text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table Container */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="py-3 px-4">NO. TIKET</th>
                        <th className="py-3 px-4">JENIS SURAT</th>
                        <th className="py-3 px-3">TANGGAL</th>
                        <th className="py-3 px-3">ESTIMASI</th>
                        <th className="py-3 px-3">STATUS</th>
                        <th className="py-3 px-4 text-right">AKSI</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {filteredData.map((row) => {
                        const isRowSelected = selectedTicket === row.tiket;
                        return (
                          <tr
                            key={row.id}
                            onClick={() => setSelectedTicket(row.tiket)}
                            className={`cursor-pointer transition-colors ${
                              isRowSelected
                                ? "bg-sky-50/70 hover:bg-sky-50"
                                : "hover:bg-slate-50/80"
                            }`}
                          >
                            {/* NO. TIKET */}
                            <td className="py-3.5 px-4 font-mono font-bold text-slate-800 whitespace-nowrap">
                              <span
                                className={`${
                                  isRowSelected ? "text-blue-700" : "text-slate-700"
                                }`}
                              >
                                {row.tiket}
                              </span>
                            </td>

                            {/* JENIS SURAT */}
                            <td className="py-3.5 px-4 min-w-[170px]">
                              <p className="font-bold text-slate-900">{row.jenis}</p>
                              {row.tujuan && (
                                <p className="text-[11px] text-slate-500 truncate max-w-[180px]">
                                  {row.tujuan}
                                </p>
                              )}
                            </td>

                            {/* TANGGAL */}
                            <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap font-medium">
                              {row.tanggal}
                            </td>

                            {/* ESTIMASI */}
                            <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap font-medium">
                              {row.estimasi === "Tertunda" ? (
                                <span className="text-rose-600 font-semibold">Tertunda</span>
                              ) : (
                                row.estimasi
                              )}
                            </td>

                            {/* STATUS BADGE */}
                            <td className="py-3.5 px-3 whitespace-nowrap">
                              {row.status === "Menunggu TTD KS" && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                  Menunggu TTD KS
                                </span>
                              )}
                              {row.status === "Selesai" && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                  Selesai
                                </span>
                              )}
                              {row.status === "Sedang Diproses" && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                  Sedang Diproses
                                </span>
                              )}
                              {row.status === "Perlu Revisi" && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                  Perlu Revisi
                                </span>
                              )}
                            </td>

                            {/* AKSI */}
                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                              {isRowSelected ? (
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-bold bg-blue-600 text-white shadow-xs">
                                  <span>Sedang Dilihat</span>
                                  <ArrowRight className="w-3 h-3" />
                                </span>
                              ) : row.status === "Perlu Revisi" ? (
                                <button className="text-[11px] font-bold text-rose-600 hover:text-rose-700 hover:underline">
                                  Perbaiki Berkas
                                </button>
                              ) : (
                                <button className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 hover:underline">
                                  Lihat Detail
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="p-4 sm:px-5 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs text-slate-600">
                  <p className="font-medium">Halaman 1 dari 4</p>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className="p-1 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCurrentPage(1)}
                      className={`w-6 h-6 rounded-md font-bold text-xs ${
                        currentPage === 1
                          ? "bg-slate-900 text-white"
                          : "bg-white border border-slate-200 text-slate-700"
                      }`}
                    >
                      1
                    </button>
                    <button
                      onClick={() => setCurrentPage(2)}
                      className={`w-6 h-6 rounded-md font-bold text-xs ${
                        currentPage === 2
                          ? "bg-slate-900 text-white"
                          : "bg-white border border-slate-200 text-slate-700"
                      }`}
                    >
                      2
                    </button>
                    <button
                      onClick={() => setCurrentPage(3)}
                      className={`w-6 h-6 rounded-md font-bold text-xs ${
                        currentPage === 3
                          ? "bg-slate-900 text-white"
                          : "bg-white border border-slate-200 text-slate-700"
                      }`}
                    >
                      3
                    </button>
                    <button
                      onClick={() => setCurrentPage(Math.min(4, currentPage + 1))}
                      className="p-1 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Alert Box */}
              <div className="rounded-2xl bg-[#1e3a8a] text-white p-5 shadow-sm flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-blue-700 text-white flex-shrink-0 mt-0.5">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white tracking-wide">
                    Bantuan Pelacakan &amp; Batas Waktu Layanan
                  </h4>
                  <p className="text-xs text-blue-100 leading-relaxed">
                    Standar Operasional Prosedur (SOP) persuratan tata usaha diselesaikan maksimal 1-2 hari kerja sesuai ketersediaan pejabat penandatangan. Jika status tertahan lebih dari 48 jam, silakan hubungi front-office TU.
                  </p>
                </div>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════
                5. RIGHT SECTION (Tracking Timeline & Details) - lg:col-span-5
            ══════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              {/* Header Block (Dark Blue bg, white text, p-4) */}
              <div className="bg-slate-900 text-white p-5 border-b border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-sky-400 tracking-wider">
                      TIKET {selectedTicket}
                    </span>
                    <button
                      onClick={handleCopyTicket}
                      className="p-1 text-slate-400 hover:text-white rounded transition-colors"
                      title="Salin No Tiket"
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Proses TTD
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-white tracking-tight leading-snug">
                  Surat Pengantar PKL / Praktik Kerja Lapangan
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Tujuan: HRD &amp; Unit Talenta PT Telkom Indonesia Witel Garut
                </p>
              </div>

              {/* Info Grid (p-4 border-b) */}
              <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/50 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    PEMOHON
                  </p>
                  <p className="font-bold text-slate-900 mt-0.5">Ahmad Fauzi Pratama</p>
                  <p className="text-[11px] text-slate-500">NIS: 222310492</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    WAKTU PENGAJUAN
                  </p>
                  <p className="font-bold text-slate-900 mt-0.5">Senin, 24 Feb 2025</p>
                  <p className="text-[11px] text-slate-500">Pukul 08:30:14 WIB</p>
                </div>
              </div>

              {/* Timeline Container */}
              <div className="p-5 sm:p-6 space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Tahapan &amp; Log Progres Administrasi
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    Langkah 4 dari 5
                  </span>
                </div>

                {/* Stepper Timeline List */}
                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {/* Step 1 (Completed) */}
                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <p className="text-xs font-bold text-slate-900">
                          1. Pengajuan Terkirim oleh Pemohon
                        </p>
                        <span className="text-[10px] text-slate-400 font-medium">
                          24 Feb, 08:30
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Formulir digital dan lampiran data diunggah lengkap.
                      </p>
                      <span className="inline-block mt-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        2 Berkas Valid
                      </span>
                    </div>
                  </div>

                  {/* Step 2 (Completed) */}
                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <p className="text-xs font-bold text-slate-900">
                          2. Verifikasi Kelengkapan Tata Usaha
                        </p>
                        <span className="text-[10px] text-slate-400 font-medium">
                          24 Feb, 10:15
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Verifikator:{" "}
                        <span className="font-semibold text-slate-700">
                          Syiffa
                        </span>
                      </p>
                      <div className="mt-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600 italic">
                        &ldquo;CATATAN VERIFIKATOR: Berkas persyaratan industri memenuhi ketentuan, data siswa aktif terkonfirmasi di sistem Dapodik.&rdquo;
                      </div>
                    </div>
                  </div>

                  {/* Step 3 (Completed) */}
                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <p className="text-xs font-bold text-slate-900">
                          3. Penomoran Surat Resmi &amp; e-Draf
                        </p>
                        <span className="text-[10px] text-slate-400 font-medium">
                          24 Feb, 11:00
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Nomor Surat:{" "}
                        <span className="font-mono font-bold text-slate-800">
                          421/089-SMK/PKL/2025
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Step 4 (ACTIVE / PROCESSING) */}
                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center ring-4 ring-blue-100 shadow-xs animate-pulse">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                    </div>
                    <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200">
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <p className="text-xs font-extrabold text-blue-950">
                          4. Persetujuan &amp; Tanda Tangan Digital
                        </p>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white">
                          SEDANG DIPROSES
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1">
                        Posisi Dokumen:{" "}
                        <span className="font-medium text-slate-800">
                          Di meja kerja digital Kepala Sekolah
                        </span>
                      </p>

                      {/* Headmaster Profile Row */}
                      <div className="flex items-center gap-2.5 mt-2.5 pt-2 border-t border-blue-200/60">
                        <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center">
                          MA
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 leading-tight">
                            Mohammad Allejar, S.Pd., M.Pd.
                          </p>
                          <p className="text-[10px] text-slate-500">
                            Kepala Sekolah SMK Darussalam
                          </p>
                        </div>
                      </div>

                      <p className="text-[11px] text-blue-700 italic font-medium mt-2 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>Menunggu otorisasi sertifikat elektronik BSrE...</span>
                      </p>
                    </div>
                  </div>

                  {/* Step 5 (Pending) */}
                  <div className="relative opacity-60">
                    <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center">
                      <Clock className="w-3 h-3" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500">
                        5. Penerbitan &amp; Dokumen Siap Unduh
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Estimasi terbit: 25 Februari 2025 (Pukul 14:00 WIB)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons (flex row) */}
                <div className="flex items-center gap-2.5 pt-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => alert("Mengunduh Lembar Bukti Tanda Terima...")}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    <span>Unduh Lembar Bukti (PDF)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => alert("Menghubungi Front-Office TU...")}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-all shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4 text-slate-500" />
                    <span>Hubungi Petugas TU</span>
                  </button>
                </div>

                {/* Document Preview (Bottom section) */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Pratinjau Draf Surat Resmi
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      Ukuran F4 • Standar Dinas
                    </span>
                  </div>

                  {/* Miniature scaled-down formal letter */}
                  <div className="bg-slate-50 border border-slate-300 rounded-xl p-4 shadow-inner text-slate-800 font-serif text-[10px] space-y-2">
                    {/* Kop Surat */}
                    <div className="text-center border-b-2 border-slate-900 pb-2 space-y-0.5">
                      <p className="font-bold text-[9px] uppercase tracking-wide">
                        YAYASAN PENDIDIKAN ISLAM DARUSSALAM TAROGONG KALER
                      </p>
                      <p className="font-extrabold text-[11px] tracking-tight uppercase">
                        SMK DARUSSALAM TAROGONG KALER
                      </p>
                      <p className="text-[8px] text-slate-500 font-sans">
                        Jl. Suherman No. 23 Tarogong Kaler, Kabupaten Garut &bull; Telp (0262) 234123
                      </p>
                    </div>

                    {/* Nomor & Perihal */}
                    <div className="flex justify-between text-[9px] pt-1 font-sans">
                      <div>
                        <p>Nomor : 421/089-SMK/PKL/2025</p>
                        <p>Lamp. : 1 (satu) Berkas</p>
                        <p>Hal : Pengantar Praktik Kerja Lapangan (PKL)</p>
                      </div>
                      <div className="text-right">
                        <p>Garut, 24 Februari 2025</p>
                      </div>
                    </div>

                    {/* Mock Body Paragraphs */}
                    <div className="text-[9px] leading-relaxed pt-1 space-y-1">
                      <p>Kepada Yth.</p>
                      <p className="font-bold">
                        Pimpinan HRD &amp; Unit Talenta PT Telkom Indonesia Witel Garut
                      </p>
                      <p className="text-justify indent-3 text-slate-600">
                        Dengan hormat, sehubungan dengan kurikulum implementasi vokasi berbasis industri, kami mengajukan permohonan penerimaan siswa kami dalam program Praktik Kerja Lapangan (PKL) periode Semester Genap...
                      </p>
                    </div>

                    {/* Digital Signature & QR Preview */}
                    <div className="flex justify-end pt-2 font-sans">
                      <div className="text-center w-36 p-1.5 rounded bg-white border border-slate-200">
                        <p className="text-[8px] text-slate-500">Telah ditandatangani digital</p>
                        <div className="flex justify-center my-1 text-slate-400">
                          <QrCode className="w-8 h-8 text-slate-700" />
                        </div>
                        <p className="font-bold text-[8px] text-slate-800">
                          Mohammad Allejar, S.Pd., M.Pd.
                        </p>
                        <p className="text-[7px] text-slate-400">NIP: 196803121994031005</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
