"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
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
  Calendar,
  Download,
  Plus,
  Mail,
  FileText,
  Hourglass,
  CheckCircle2,
  TrendingUp,
  Search,
  Filter,
  Printer,
  FileEdit,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Menu,
  X,
  ArrowRight,
  School,
  Clock,
  Sparkles,
  ExternalLink,
} from "lucide-react";

type RoleType = "Siswa" | "Staf TU" | "Kepala Sekolah";

const roleData: Record<
  RoleType,
  {
    name: string;
    roleLabel: string;
    initials: string;
    avatarBg: string;
    greeting: string;
    subtitle: string;
    btn1Label: string;
    btn2Label: string;
    btn2Href: string;
  }
> = {
  "Staf TU": {
    name: "Syiffa",
    roleLabel: "Administrasi Tata Usaha",
    initials: "SY",
    avatarBg: "from-blue-700 to-indigo-500",
    greeting: "Selamat Pagi, Syiffa",
    subtitle:
      "Staf Tata Usaha Bidang Administrasi Kesiswaan & Persuratan Resmi SMK Darussalam",
    btn1Label: "Unduh Rekap Bulanan",
    btn2Label: "+ Registrasi Surat Masuk",
    btn2Href: "/pengajuan",
  },
  "Kepala Sekolah": {
    name: "Mohammad Allejar, S.Pd., M.Pd.",
    roleLabel: "Kepala SMK Darussalam Garut",
    initials: "MA",
    avatarBg: "from-slate-900 to-blue-900",
    greeting: "Selamat Pagi, Mohammad Allejar, S.Pd., M.Pd.",
    subtitle:
      "Otorisasi & Pengesahan Naskah Kedinasan Resmi Berbasis TTE BSrE SMK Darussalam",
    btn1Label: "Laporan Eksekutif",
    btn2Label: "Lembar Persetujuan TTE",
    btn2Href: "/persetujuan",
  },
  Siswa: {
    name: "Ahmad Fauzi Pratama",
    roleLabel: "Siswa Kelas XII RPL 1",
    initials: "AP",
    avatarBg: "from-sky-500 to-blue-600",
    greeting: "Selamat Pagi, Ahmad Fauzi Pratama",
    subtitle:
      "Portal Pengajuan dan Pelacakan Mandiri Persuratan Siswa SMK Darussalam",
    btn1Label: "Panduan Persuratan",
    btn2Label: "+ Ajukan Surat Baru",
    btn2Href: "/pengajuan",
  },
};

type FilterTab = "Semua (42)" | "Menunggu Verifikasi (8)" | "Sedang Diproses (19)" | "Perlu Revisi (3)";

interface SuratItem {
  id: string;
  tiket: string;
  nama: string;
  detail: string;
  kategori: string;
  tgl: string;
  status: "Menunggu Verifikasi" | "Disetujui" | "Perlu Revisi" | "Sedang Diproses";
  aksiLabel: "Verifikasi" | "Cetak" | "Catatan" | "Detail";
  aksiType: "solid-blue" | "outline";
}

const dummySurat: SuratItem[] = [
  {
    id: "1",
    tiket: "#SRT-2025-0842",
    nama: "Dewi Lestari",
    detail: "Kelas XII RPL 1 • NIS: 212210045",
    kategori: "Surat Keterangan Aktif",
    tgl: "24 Feb",
    status: "Menunggu Verifikasi",
    aksiLabel: "Verifikasi",
    aksiType: "solid-blue",
  },
  {
    id: "2",
    tiket: "#SRT-2025-0841",
    nama: "Muhammad Irfan",
    detail: "Kelas XI TKJ 2 • NIS: 222310118",
    kategori: "Pengantar PKL",
    tgl: "24 Feb",
    status: "Disetujui",
    aksiLabel: "Cetak",
    aksiType: "outline",
  },
  {
    id: "3",
    tiket: "#SRT-2025-0839",
    nama: "Rian Pratama",
    detail: "Kelas X TKR 3 • NIS: 232410204",
    kategori: "Dispensasi Sakit",
    tgl: "23 Feb",
    status: "Perlu Revisi",
    aksiLabel: "Catatan",
    aksiType: "outline",
  },
  {
    id: "4",
    tiket: "#SRT-2025-0837",
    nama: "Budi Santoso, S.Kom.",
    detail: "Guru Produktif • NIP: 198506142010011008",
    kategori: "Tugas Luar/Dinas",
    tgl: "23 Feb",
    status: "Menunggu Verifikasi",
    aksiLabel: "Verifikasi",
    aksiType: "solid-blue",
  },
  {
    id: "5",
    tiket: "#SRT-2025-0835",
    nama: "Siti Aisyah",
    detail: "Kelas XII OTKP 1 • NIS: 212210089",
    kategori: "Surat Rekomendasi",
    tgl: "23 Feb",
    status: "Disetujui",
    aksiLabel: "Cetak",
    aksiType: "outline",
  },
];

export default function DashboardPage() {
  const [activeRole, setActiveRole] = useState<RoleType>("Staf TU");
  const [activeFilter, setActiveFilter] = useState<FilterTab>("Semua (42)");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("Dashboard");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedRole = localStorage.getItem("userRole");
      if (savedRole === "Siswa" || savedRole === "Siswa & Guru") {
        setActiveRole("Siswa");
      } else if (savedRole === "Kepala Sekolah") {
        setActiveRole("Kepala Sekolah");
      } else if (savedRole === "Staf TU") {
        setActiveRole("Staf TU");
      }
    }
  }, []);

  const handleRoleChange = (role: RoleType) => {
    setActiveRole(role);
    if (typeof window !== "undefined") {
      localStorage.setItem("userRole", role);
    }
  };

  const currentProfile = roleData[activeRole] || roleData["Staf TU"];

  // Filter logic
  const filteredSurat = dummySurat.filter((item) => {
    const matchesSearch =
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tiket.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kategori.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === "Menunggu Verifikasi (8)") {
      return item.status === "Menunggu Verifikasi";
    }
    if (activeFilter === "Sedang Diproses (19)") {
      return item.status === "Sedang Diproses";
    }
    if (activeFilter === "Perlu Revisi (3)") {
      return item.status === "Perlu Revisi";
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
                  <span className="font-extrabold text-white text-base tracking-tight">SIM-SURAT</span>
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
                {/* Dashboard: Visible for all */}
                <button
                  onClick={() => setActiveNavItem("Dashboard")}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeNavItem === "Dashboard"
                      ? "bg-sky-500/15 text-sky-400 font-semibold shadow-sm"
                      : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <LayoutDashboard className="w-4 h-4 text-sky-400" />
                    <span>Dashboard</span>
                  </div>
                  {activeNavItem === "Dashboard" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-sm shadow-sky-400" />
                  )}
                </button>

                {/* Pengajuan Masuk: Only for Staf TU and Kepala Sekolah */}
                {activeRole !== "Siswa" && (
                  <button
                    onClick={() => setActiveNavItem("Pengajuan Masuk")}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      activeNavItem === "Pengajuan Masuk"
                        ? "bg-sky-500/15 text-sky-400 font-semibold"
                        : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Inbox className="w-4 h-4 text-slate-400" />
                      <span>Pengajuan Masuk</span>
                    </div>
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-blue-600 text-white shadow-sm">
                      12
                    </span>
                  </button>
                )}

                {/* Verifikasi Surat: Only for Staf TU */}
                {activeRole === "Staf TU" && (
                  <Link
                    href="/verifikasi"
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800/70 hover:text-white transition-all"
                  >
                    <FileCheck className="w-4 h-4 text-slate-400" />
                    <span>Verifikasi Surat</span>
                  </Link>
                )}

                {/* Persetujuan Digital: Only for Kepala Sekolah */}
                {activeRole === "Kepala Sekolah" && (
                  <Link
                    href="/persetujuan"
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800/70 hover:text-white transition-all"
                  >
                    <FileSignature className="w-4 h-4 text-slate-400" />
                    <span>Persetujuan Digital</span>
                  </Link>
                )}

                {/* Arsip & Dokumen: Only for Staf TU and Kepala Sekolah */}
                {activeRole !== "Siswa" && (
                  <button
                    onClick={() => setActiveNavItem("Arsip & Dokumen")}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      activeNavItem === "Arsip & Dokumen"
                        ? "bg-sky-500/15 text-sky-400 font-semibold"
                        : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                    }`}
                  >
                    <Archive className="w-4 h-4 text-slate-400" />
                    <span>Arsip & Dokumen</span>
                  </button>
                )}
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
                <span className="text-xs font-semibold text-emerald-400 truncate">Terhubung Aktif</span>
              </div>
            </div>
          </div>
          
          {/* Quick link back to login page for demo testing */}
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
            2. TOP NAVIGATION BAR (Sticky top)
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
              {/* Role Switcher (Pill-shaped segmented control) */}
              <div className="hidden md:flex items-center p-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium">
                {(["Staf TU", "Siswa", "Kepala Sekolah"] as RoleType[]).map((role) => (
                  <button
                    key={role}
                    onClick={() => handleRoleChange(role)}
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
                    {currentProfile.name}
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {currentProfile.roleLabel}
                  </p>
                </div>
                <div className="relative">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-tr ${currentProfile.avatarBg} flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-slate-100 overflow-hidden`}
                  >
                    <span>{currentProfile.initials}</span>
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
              3. MAIN CONTENT - HEADER
          ────────────────────────────────────────────────────────── */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
            <div>
              {/* Top date indicator */}
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 tracking-wider uppercase mb-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>SENIN, 24 FEBRUARI 2025 - SEMESTER GENAP TA 2024/2025</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {currentProfile.greeting}
              </h1>
              <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                {currentProfile.subtitle}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
              <button
                type="button"
                onClick={() => alert(`Membuka: ${currentProfile.btn1Label}`)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all shadow-xs"
              >
                <Download className="w-4 h-4 text-slate-500" />
                <span>{currentProfile.btn1Label}</span>
              </button>
              <Link
                href={currentProfile.btn2Href}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-all shadow-md shadow-slate-900/10 active:scale-[0.98]"
              >
                {activeRole === "Kepala Sekolah" ? (
                  <FileSignature className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                <span>{currentProfile.btn2Label}</span>
              </Link>
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────────
              4. MAIN CONTENT - STATS CARDS (Grid of 4)
          ────────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Card 1: TOTAL PENGAJUAN */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">
                  TOTAL PENGAJUAN
                </span>
                <div className="p-2 rounded-xl bg-slate-100 text-slate-600">
                  <Mail className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  1.284
                </span>
                <span className="text-sm text-slate-500 font-medium">surat</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+12% dibandingkan bulan lalu</span>
              </div>
            </div>

            {/* Card 2: PENGAJUAN BARU HARI INI */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">
                  PENGAJUAN BARU HARI INI
                </span>
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <Inbox className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  14
                </span>
                <span className="text-sm text-slate-500 font-medium">berkas</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-blue-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                <span className="truncate">Butuh respon segera dari TU</span>
              </div>
            </div>

            {/* Card 3: MENUNGGU VERIFIKASI TU */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">
                  MENUNGGU VERIFIKASI TU
                </span>
                <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                  <Hourglass className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  8
                </span>
                <span className="text-sm text-slate-500 font-medium">antrean</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-rose-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0" />
                <span className="truncate">Batas deadline hari ini</span>
              </div>
            </div>

            {/* Card 4: DISETUJUI & SIAP TERBIT */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">
                  DISETUJUI &amp; SIAP TERBIT
                </span>
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  23
                </span>
                <span className="text-sm text-slate-500 font-medium">dokumen</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                <span className="truncate">Telah ditandatangani KS</span>
              </div>
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────────
              5. MAIN CONTENT - BOTTOM GRID (2/3 Left, 1/3 Right)
          ────────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ══════════════════════════════════════════════════════════
                LEFT COLUMN (Col span 2) - Antrean Pengajuan Surat Masuk
            ══════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between overflow-hidden">
              <div>
                {/* Header & Search */}
                <div className="p-5 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                      Antrean Pengajuan Surat Masuk
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Kelola dan verifikasi surat permohonan yang diajukan oleh civitas akademik
                    </p>
                  </div>

                  {/* Search Bar */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari nama, tiket, jenis..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                {/* Filter Tabs */}
                <div className="px-5 sm:px-6 pt-4 pb-2 border-b border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
                  {(
                    [
                      "Semua (42)",
                      "Menunggu Verifikasi (8)",
                      "Sedang Diproses (19)",
                      "Perlu Revisi (3)",
                    ] as FilterTab[]
                  ).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveFilter(tab)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                        activeFilter === tab
                          ? "bg-slate-900 text-white shadow-xs"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/75 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="py-3 px-5 sm:px-6">NO. TIKET</th>
                        <th className="py-3 px-4">NAMA PEMOHON</th>
                        <th className="py-3 px-4">KATEGORI/JENIS</th>
                        <th className="py-3 px-4">TGL DIAJUKAN</th>
                        <th className="py-3 px-4">STATUS</th>
                        <th className="py-3 px-5 sm:px-6 text-right">AKSI</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {filteredSurat.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-slate-400">
                            Tidak ada permohonan surat yang cocok dengan filter atau pencarian.
                          </td>
                        </tr>
                      ) : (
                        filteredSurat.map((row) => (
                          <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                            {/* Tiket */}
                            <td className="py-3.5 px-5 sm:px-6 font-mono font-medium text-slate-600 whitespace-nowrap">
                              {row.tiket}
                            </td>

                            {/* Nama Pemohon */}
                            <td className="py-3.5 px-4 min-w-[180px]">
                              <p className="font-bold text-slate-900">{row.nama}</p>
                              <p className="text-[11px] text-slate-500 mt-0.5">{row.detail}</p>
                            </td>

                            {/* Kategori */}
                            <td className="py-3.5 px-4 text-slate-700 font-medium whitespace-nowrap">
                              {row.kategori}
                            </td>

                            {/* Tgl Diajukan */}
                            <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                              {row.tgl}
                            </td>

                            {/* Status Badge */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              {row.status === "Menunggu Verifikasi" && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                  Menunggu Verifikasi
                                </span>
                              )}
                              {row.status === "Disetujui" && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                  Disetujui
                                </span>
                              )}
                              {row.status === "Perlu Revisi" && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                  Perlu Revisi
                                </span>
                              )}
                              {row.status === "Sedang Diproses" && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                  Sedang Diproses
                                </span>
                              )}
                            </td>

                            {/* Aksi */}
                            <td className="py-3.5 px-5 sm:px-6 text-right whitespace-nowrap">
                              {row.aksiType === "solid-blue" ? (
                                <Link
                                  href="/verifikasi"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all active:scale-95"
                                >
                                  <FileCheck className="w-3.5 h-3.5" />
                                  <span>{row.aksiLabel}</span>
                                </Link>
                              ) : row.aksiLabel === "Cetak" ? (
                                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition-all">
                                  <Printer className="w-3.5 h-3.5 text-slate-500" />
                                  <span>{row.aksiLabel}</span>
                                </button>
                              ) : (
                                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition-all">
                                  <FileEdit className="w-3.5 h-3.5 text-slate-500" />
                                  <span>{row.aksiLabel}</span>
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Table Footer / Pagination */}
              <div className="p-4 sm:px-6 border-t border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
                <p>Menampilkan 1-5 dari 42 antrean aktif</p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentPage(1)}
                    className={`w-7 h-7 rounded-lg font-bold text-xs ${
                      currentPage === 1
                        ? "bg-slate-900 text-white"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    1
                  </button>
                  <button
                    onClick={() => setCurrentPage(2)}
                    className={`w-7 h-7 rounded-lg font-bold text-xs ${
                      currentPage === 2
                        ? "bg-slate-900 text-white"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    2
                  </button>
                  <button
                    onClick={() => setCurrentPage(3)}
                    className={`w-7 h-7 rounded-lg font-bold text-xs ${
                      currentPage === 3
                        ? "bg-slate-900 text-white"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    3
                  </button>
                  <span className="px-1 text-slate-400">...</span>
                  <button
                    onClick={() => setCurrentPage(9)}
                    className={`w-7 h-7 rounded-lg font-bold text-xs ${
                      currentPage === 9
                        ? "bg-slate-900 text-white"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    9
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(9, currentPage + 1))}
                    className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                    disabled={currentPage === 9}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════
                RIGHT COLUMN (Col span 1) - Widgets
            ══════════════════════════════════════════════════════════ */}
            <div className="space-y-6">
              {/* Widget 1: Distribusi Jenis Surat */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Distribusi Jenis Surat</h3>
                    <p className="text-xs text-slate-500">Statistik persentase bulan Februari</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    Bulan Ini
                  </span>
                </div>

                {/* Donut Chart (SVG) */}
                <div className="relative flex items-center justify-center my-4">
                  <svg className="w-44 h-44 transform -rotate-90" viewBox="0 0 100 100">
                    {/* Background track */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      stroke="#f1f5f9"
                      strokeWidth="11"
                      fill="transparent"
                    />
                    {/* Segment 1: Keterangan Siswa 45% (Blue) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      stroke="#0284c7"
                      strokeWidth="11"
                      fill="transparent"
                      strokeDasharray="238.76"
                      strokeDashoffset="0"
                      strokeLinecap="round"
                      className="transition-all duration-500"
                    />
                    {/* Segment 2: Rekomendasi PKL 30% (Indigo) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      stroke="#6366f1"
                      strokeWidth="11"
                      fill="transparent"
                      strokeDasharray="71.63 167.13"
                      strokeDashoffset="-107.44"
                      className="transition-all duration-500"
                    />
                    {/* Segment 3: Undangan & Surat Dinas 15% (Emerald) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      stroke="#10b981"
                      strokeWidth="11"
                      fill="transparent"
                      strokeDasharray="35.81 202.95"
                      strokeDashoffset="-179.07"
                      className="transition-all duration-500"
                    />
                    {/* Segment 4: Dispensasi Kesiswaan 10% (Amber) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      stroke="#f59e0b"
                      strokeWidth="11"
                      fill="transparent"
                      strokeDasharray="23.88 214.88"
                      strokeDashoffset="-214.88"
                      className="transition-all duration-500"
                    />
                  </svg>

                  {/* Center Label */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-black text-slate-900 tracking-tight leading-none">
                      100%
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                      Terpetakan
                    </span>
                  </div>
                </div>

                {/* Legends */}
                <div className="space-y-2.5 mt-5 pt-4 border-t border-slate-100 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-600 flex-shrink-0" />
                      <span className="text-slate-700 font-medium">Keterangan Siswa</span>
                    </div>
                    <span className="font-bold text-slate-900">45%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 flex-shrink-0" />
                      <span className="text-slate-700 font-medium">Rekomendasi PKL</span>
                    </div>
                    <span className="font-bold text-slate-900">30%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                      <span className="text-slate-700 font-medium">Undangan &amp; Surat Dinas</span>
                    </div>
                    <span className="font-bold text-slate-900">15%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 flex-shrink-0" />
                      <span className="text-slate-700 font-medium">Dispensasi Kesiswaan</span>
                    </div>
                    <span className="font-bold text-slate-900">10%</span>
                  </div>
                </div>
              </div>

              {/* Widget 2: Aktivitas Terkini Administrasi */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-slate-900">Aktivitas Terkini Administrasi</h3>
                  <div className="p-1.5 rounded-lg bg-slate-50 text-slate-400">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>

                {/* Timeline list */}
                <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {/* Timeline 1 */}
                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-emerald-600 shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 leading-tight">
                        Kepala Sekolah menyetujui surat...
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Surat Tugas PKL SMK Darussalam disetujui digital
                      </p>
                      <span className="text-[10px] text-slate-400 font-medium block mt-1">
                        12 menit yang lalu
                      </span>
                    </div>
                  </div>

                  {/* Timeline 2 */}
                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-blue-600 shadow-xs">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 leading-tight">
                        Ahmad Rizky mengunggah berkas revisi...
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Lampiran surat keterangan aktif telah diperbarui
                      </p>
                      <span className="text-[10px] text-slate-400 font-medium block mt-1">
                        45 menit yang lalu
                      </span>
                    </div>
                  </div>

                  {/* Timeline 3 */}
                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-slate-600 shadow-xs">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 leading-tight">
                        Disposisi Baru dari Waka Kurikulum...
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Pendelegasian surat undangan rapat dinas MGMP
                      </p>
                      <span className="text-[10px] text-slate-400 font-medium block mt-1">
                        2 jam yang lalu
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer link */}
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <a
                    href="#"
                    className="group inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <span>Lihat Seluruh Log Audit Surat</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────────
              6. FOOTER ALERT BANNER
          ────────────────────────────────────────────────────────── */}
          <div className="rounded-2xl bg-sky-50/70 border border-sky-100 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-600 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Validasi Tanda Tangan Elektronik (TTE) Aktif
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Sertifikat BSrE Kepala Sekolah berlaku hingga 15 Desember 2025.
                </p>
              </div>
            </div>

            <div className="self-start sm:self-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                Sistem Normal
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
