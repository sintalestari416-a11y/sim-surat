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
  Clock,
  AlertCircle,
  Phone,
  GraduationCap,
  Building2,
  FileText,
  CheckCircle2,
  Check,
  Undo2,
  Send,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ExternalLink,
  ShieldCheck,
  Lock,
  MessageCircle,
  Menu,
  X,
  CreditCard,
  User,
  Plus,
  HelpCircle,
  Sparkles,
} from "lucide-react";

type RoleNav = "Staf TU" | "Siswa & Guru" | "Kepala Sekolah";
type DocumentTab = "kartu_pelajar" | "surat_industri";

export default function VerifikasiBerkasPage() {
  const [activeRole, setActiveRole] = useState<RoleNav>("Staf TU");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDocTab, setActiveDocTab] = useState<DocumentTab>("kartu_pelajar");
  const [zoomLevel, setZoomLevel] = useState(100);
  const [catatan, setCatatan] = useState("");

  // Validation Checkbox States
  const [checklist, setChecklist] = useState({
    dapodik: true,
    izinOrtu: true,
    rekomendasiKaprog: true,
    penomoranDraf: false,
  });

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const completedCount = Object.values(checklist).filter(Boolean).length;

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

                {/* ACTIVE ITEM: Verifikasi Surat */}
                <div className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold bg-sky-500/15 text-sky-400 shadow-sm border border-sky-500/20">
                  <div className="flex items-center gap-3">
                    <FileCheck className="w-4 h-4 text-sky-400" />
                    <span>Verifikasi Surat</span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-sm shadow-sky-400" />
                </div>

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
          {/* ──────────────────────────────────────────────────────────
              2. MAIN CONTENT - HEADER
          ────────────────────────────────────────────────────────── */}
          <div className="space-y-2">
            {/* Breadcrumb */}
            <nav className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <Link href="/dashboard" className="hover:text-slate-600 transition-colors">
                Pengajuan Masuk
              </Link>
              <span>&gt;</span>
              <span className="text-slate-700 font-semibold">
                Verifikasi #SRT-2025-0142
              </span>
            </nav>

            {/* Title Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
              {/* Left Title */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Verifikasi Berkas Pengajuan Surat Masuk
                </h1>
                <div className="mt-1.5 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  <span>Menunggu Verifikasi TU</span>
                </div>
              </div>

              {/* Right 2 Info Boxes */}
              <div className="flex items-center gap-3 flex-wrap">
                {/* Info Box 1: Waktu Pengajuan */}
                <div className="bg-slate-100/80 border border-slate-200 rounded-xl px-4 py-2.5">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    WAKTU PENGAJUAN
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5 text-xs font-bold text-slate-800">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>12 Mei 2025 &bull; 08:42 WIB</span>
                  </div>
                </div>

                {/* Info Box 2: Prioritas */}
                <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl px-4 py-2.5">
                  <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                    PRIORITAS
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5 text-xs font-bold text-indigo-900">
                    <AlertCircle className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Reguler (PKL)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────────
              3. MAIN CONTENT - TWO COLUMN LAYOUT (5 Cols Left / 7 Cols Right)
          ────────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* ══════════════════════════════════════════════════════════
                4. LEFT COLUMN (Verification Details) - lg:col-span-5
            ══════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-5 space-y-5">
              {/* Profile Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-base flex items-center justify-center shadow-xs flex-shrink-0">
                    AF
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-slate-900 truncate">
                        Ahmad Fauzi Pratama
                      </h3>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                        XII RPL 1
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      NISN: 0068492019 &bull; NIK: 3205011902070004
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center gap-2 truncate">
                    <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="font-medium">+62 812-3456-7890</span>
                  </div>
                  <div className="flex items-center gap-2 truncate">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="font-medium truncate">Rekayasa Perangkat Lunak</span>
                  </div>
                </div>
              </div>

              {/* Purpose Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-1.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  TUJUAN &amp; KEPERLUAN SURAT
                </p>
                <p className="text-sm font-bold text-slate-900 leading-snug">
                  Permohonan Surat Pengantar Resmi Praktik Kerja Lapangan (PKL) Semester Gasal
                </p>
                <div className="flex items-center gap-1.5 text-xs text-slate-600 pt-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>
                    Instansi Mitra:{" "}
                    <strong className="text-slate-800">
                      PT Telkom Indonesia Witel Bandung Barat
                    </strong>
                  </span>
                </div>
              </div>

              {/* Validation Checklist */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded bg-blue-50 text-blue-600">
                      <FileCheck className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Validasi Berkas &amp; Kelayakan
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                    {completedCount} dari 4 Terpenuhi
                  </span>
                </div>

                <div className="space-y-2.5">
                  {/* Item 1 */}
                  <div
                    onClick={() => toggleCheck("dapodik")}
                    className="cursor-pointer p-3 rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex items-start gap-3 bg-white"
                  >
                    <div
                      className={`w-4 h-4 mt-0.5 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
                        checklist.dapodik ? "bg-blue-600 text-white" : "border border-slate-300"
                      }`}
                    >
                      {checklist.dapodik && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-bold text-slate-800">
                          Keabsahan Siswa di Dapodik
                        </p>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex-shrink-0">
                          <Check className="w-3 h-3" />
                          Valid
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                        Status Aktif Semester VI TA 2024/2025 sinkron PD-Data.
                      </p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div
                    onClick={() => toggleCheck("izinOrtu")}
                    className="cursor-pointer p-3 rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex items-start gap-3 bg-white"
                  >
                    <div
                      className={`w-4 h-4 mt-0.5 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
                        checklist.izinOrtu ? "bg-blue-600 text-white" : "border border-slate-300"
                      }`}
                    >
                      {checklist.izinOrtu && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-bold text-slate-800">
                          Surat Izin Orang Tua / Wali
                        </p>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex-shrink-0">
                          <Check className="w-3 h-3" />
                          Lengkap
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                        Bermaterai 10.000 &amp; ditandatangani wali sah tercatat.
                      </p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div
                    onClick={() => toggleCheck("rekomendasiKaprog")}
                    className="cursor-pointer p-3 rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex items-start gap-3 bg-white"
                  >
                    <div
                      className={`w-4 h-4 mt-0.5 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
                        checklist.rekomendasiKaprog
                          ? "bg-blue-600 text-white"
                          : "border border-slate-300"
                      }`}
                    >
                      {checklist.rekomendasiKaprog && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-bold text-slate-800">
                          Rekomendasi Kaprogli RPL
                        </p>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex-shrink-0">
                          <Check className="w-3 h-3" />
                          Lengkap
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                        Disetujui oleh Hendra Gunawan, S.Kom. (KPK RPL).
                      </p>
                    </div>
                  </div>

                  {/* Item 4 (UNCHECKED, Light Gray bg to indicate pending) */}
                  <div
                    onClick={() => toggleCheck("penomoranDraf")}
                    className="cursor-pointer p-3 rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex items-start gap-3 bg-slate-50/80"
                  >
                    <div
                      className={`w-4 h-4 mt-0.5 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
                        checklist.penomoranDraf
                          ? "bg-blue-600 text-white"
                          : "border border-slate-300 bg-white"
                      }`}
                    >
                      {checklist.penomoranDraf && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-bold text-slate-700">
                          Draft Penomoran Otomatis Kedinasan
                        </p>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 flex-shrink-0">
                          <Clock className="w-3 h-3" />
                          Menunggu Approval
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                        Klasifikasi Kode: 421.5/142-SMK.DAR/PKL/V/2025
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes Textarea */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <MessageCircle className="w-3.5 h-3.5 text-slate-500" />
                    <span>Catatan untuk Pemohon / Pimpinan</span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    Opsional jika revisi
                  </span>
                </div>

                <textarea
                  rows={3}
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  maxLength={250}
                  placeholder="Tuliskan catatan disposisi, instruksi kelengkapan tambahan..."
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/75 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all leading-relaxed"
                />

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3 text-emerald-500" />
                    Tersinkronisasi otomatis dengan notifikasi WhatsApp siswa
                  </span>
                  <span className="font-mono">{catatan.length} / 250</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() =>
                    alert("Berkas dikembalikan ke pemohon untuk perbaikan/revisi.")
                  }
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-all active:scale-95"
                >
                  <Undo2 className="w-4 h-4" />
                  <span>Kembalikan untuk Revisi</span>
                </button>

                <Link
                  href="/persetujuan"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md shadow-slate-900/10 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Setujui &amp; Teruskan ke Kepsek</span>
                </Link>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════
                5. RIGHT COLUMN (Document Previewer) - lg:col-span-7
            ══════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-7 space-y-0">
              {/* Document Tabs */}
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={() => setActiveDocTab("kartu_pelajar")}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeDocTab === "kartu_pelajar"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-rose-500" />
                  <span>Kartu_Pelajar.pdf</span>
                </button>

                <button
                  onClick={() => setActiveDocTab("surat_industri")}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeDocTab === "surat_industri"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-rose-500" />
                  <span>Surat_Penerimaan_Industri.pdf</span>
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                </button>
              </div>

              {/* Main Document Container */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                {/* Toolbar */}
                <div className="border-b border-slate-200 p-2.5 px-4 flex items-center justify-between bg-white text-slate-600 text-xs">
                  <div className="flex items-center gap-2 font-medium text-slate-700">
                    <span className="font-bold text-slate-900">
                      {activeDocTab === "kartu_pelajar"
                        ? "Kartu_Pelajar.pdf"
                        : "Surat_Penerimaan_Industri.pdf"}
                    </span>
                    <span className="text-slate-400">&bull;</span>
                    <span className="text-[11px] text-slate-500">Pratinjau Otentikasi</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}
                      className="p-1 text-slate-500 hover:text-slate-800 rounded transition-colors"
                      title="Perkecil"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="font-mono text-xs font-bold text-slate-700 min-w-[42px] text-center">
                      {zoomLevel}%
                    </span>
                    <button
                      onClick={() => setZoomLevel(Math.min(150, zoomLevel + 10))}
                      className="p-1 text-slate-500 hover:text-slate-800 rounded transition-colors"
                      title="Perbesar"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>

                    <div className="h-4 w-px bg-slate-200" />

                    <button
                      onClick={() => alert("Menampilkan pratinjau layar penuh.")}
                      className="p-1 text-slate-500 hover:text-slate-800 rounded transition-colors"
                      title="Layar Penuh"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => alert("Membuka berkas asli di tab baru.")}
                      className="p-1 text-slate-500 hover:text-slate-800 rounded transition-colors"
                      title="Buka Berkas"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Document Viewer Area */}
                <div
                  className="bg-[#eef2f6] p-6 sm:p-8 flex items-center justify-center min-h-[460px] overflow-auto transition-transform duration-200"
                  style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "center center" }}
                >
                  {activeDocTab === "kartu_pelajar" ? (
                    /* Realistic Mockup of Student ID Card */
                    <div className="max-w-md w-full space-y-3">
                      {/* Mockup Header Indicator */}
                      <div className="flex items-center justify-between text-xs font-bold text-slate-600 bg-white/70 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-slate-200/80">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                          <span>Kartu Tanda Pelajar Digital &mdash; SMK Darussalam</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          AKTIF
                        </span>
                      </div>

                      {/* ID Card Visual */}
                      <div className="relative rounded-2xl bg-gradient-to-br from-[#0c2340] via-[#122b46] to-[#1a365d] text-white p-5 shadow-2xl border border-sky-400/20 overflow-hidden">
                        {/* Subtle background circuit accents */}
                        <div className="absolute top-[-30px] right-[-30px] w-40 h-40 rounded-full bg-sky-500/10 blur-xl pointer-events-none" />
                        <div className="absolute bottom-[-20px] left-[-20px] w-48 h-48 rounded-full bg-blue-600/10 blur-xl pointer-events-none" />

                        {/* Top Header */}
                        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-white">
                              <School className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-black text-xs tracking-tight uppercase leading-tight">
                                SMK DARUSSALAM
                              </p>
                              <p className="text-[9px] text-sky-300 font-medium tracking-wider uppercase">
                                TAROGONG KALER &bull; GARUT
                              </p>
                            </div>
                          </div>
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-sky-400/20 text-sky-300 border border-sky-400/30 tracking-wider">
                            KARTU SISWA
                          </span>
                        </div>

                        {/* Middle Content */}
                        <div className="flex gap-4 items-center">
                          {/* Student Photo */}
                          <div className="flex-shrink-0 text-center">
                            <div className="w-24 h-32 rounded-xl bg-slate-800 border-2 border-sky-400/40 p-1 flex flex-col items-center justify-center shadow-md relative overflow-hidden bg-gradient-to-b from-slate-700 to-slate-900">
                              <User className="w-12 h-12 text-slate-300" />
                              <span className="text-[8px] font-mono text-slate-400 mt-1">
                                PAS FOTO
                              </span>
                            </div>
                          </div>

                          {/* Student Details */}
                          <div className="flex-1 space-y-2 text-xs">
                            <div>
                              <p className="text-[9px] text-sky-300 font-bold uppercase tracking-wider">
                                NAMA LENGKAP
                              </p>
                              <p className="font-extrabold text-sm text-white tracking-tight">
                                Ahmad Fauzi Pratama
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <p className="text-[8px] text-sky-300 font-bold uppercase tracking-wider">
                                  NISN / NIS
                                </p>
                                <p className="font-mono font-bold text-[11px] text-slate-200">
                                  0068492019 / 222310492
                                </p>
                              </div>
                              <div>
                                <p className="text-[8px] text-sky-300 font-bold uppercase tracking-wider">
                                  BERLAKU HINGGA
                                </p>
                                <p className="font-bold text-[11px] text-slate-200">
                                  30 Juni 2025
                                </p>
                              </div>
                            </div>

                            <div>
                              <p className="text-[8px] text-sky-300 font-bold uppercase tracking-wider">
                                PROGRAM KEAHLIAN
                              </p>
                              <p className="font-bold text-[11px] text-slate-100">
                                Rekayasa Perangkat Lunak (RPL)
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Footer Info */}
                        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[9px] text-slate-400 font-mono">
                          <span>NPSN: 20231234</span>
                          <span>Akreditasi A (Unggul)</span>
                          <span className="font-bold text-slate-300">KAB. GARUT</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Mockup of Industry Acceptance Letter */
                    <div className="max-w-md w-full bg-white p-6 rounded-xl border border-slate-300 shadow-lg text-slate-800 font-serif text-[10px] space-y-2.5">
                      <div className="text-center border-b-2 border-slate-900 pb-2">
                        <p className="font-extrabold text-[12px] tracking-tight uppercase text-rose-600">
                          PT TELKOM INDONESIA (PERSERO) TBK
                        </p>
                        <p className="text-[8px] text-slate-500 font-sans">
                          Wilayah Usaha Telekomunikasi (Witel) Garut &bull; Divisi Talent &amp; Culture
                        </p>
                      </div>
                      <div className="flex justify-between font-sans text-[9px]">
                        <span>No: 042/TLK-GRT/HR/2025</span>
                        <span>Garut, 10 Mei 2025</span>
                      </div>
                      <p className="font-sans font-bold text-[10px]">
                        Hal: Konfirmasi Penerimaan Praktik Kerja Lapangan (PKL)
                      </p>
                      <p className="text-justify leading-relaxed text-slate-700">
                        Berdasarkan permohonan kemitraan sekolah dari SMK Darussalam Tarogong Kaler, kami menyatakan menerima siswa atas nama <strong className="text-slate-900">Ahmad Fauzi Pratama (NISN: 0068492019)</strong> untuk melaksanakan PKL di Divisi IT &amp; Infrastructure...
                      </p>
                      <div className="pt-3 font-sans text-right">
                        <p className="text-[8px] text-slate-500">Hormat Kami,</p>
                        <p className="font-bold text-[9px] text-slate-900 mt-5">
                          Manager HRD &amp; Talenta Witel Garut
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Verification Status Banner */}
                <div className="border-t border-slate-200 p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-200">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        Autentikasi Terverifikasi
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Data cocok 100% dengan pangkalan data SIM-SEKOLAH &amp; PD-Data.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 self-start sm:self-auto">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Integritas Sah
                    </span>
                  </div>
                </div>

                {/* Bottom Footer of Right Column */}
                <div className="p-3.5 px-4 bg-slate-50/70 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[11px]">Enkripsi Tanda Tangan Digital SHA-256 Valid</span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-400">
                    Halaman 1 dari 1
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
