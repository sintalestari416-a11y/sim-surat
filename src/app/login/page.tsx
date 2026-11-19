"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Radar,
  GitBranch,
  ShieldCheck,
  Lock,
  User,
  Key,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  CheckCircle2,
  MessageCircle,
  Headphones,
} from "lucide-react";

type Role = "Siswa" | "Staf TU" | "Kepala Sekolah";

const roles: Role[] = ["Siswa", "Staf TU", "Kepala Sekolah"];

const features = [
  {
    icon: <Radar className="w-6 h-6 text-sky-300" />,
    title: "Pelacakan Real-time",
    desc: "Pantau status surat masuk & keluar secara langsung dengan notifikasi instan di setiap tahap disposisi.",
  },
  {
    icon: <GitBranch className="w-6 h-6 text-sky-300" />,
    title: "Verifikasi Berjenjang",
    desc: "Alur persetujuan terstruktur dari staf TU hingga Kepala Sekolah dengan jejak audit yang lengkap.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-sky-300" />,
    title: "Tanda Tangan & QR Code Digital",
    desc: "Autentikasi dokumen dengan tanda tangan digital terenkripsi dan QR code untuk verifikasi keaslian.",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [activeRole, setActiveRole] = useState<Role>("Siswa");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-[40%_60%]">
      {/* ═══════════════════════════════════════════
          LEFT PANEL — Branding & Information
      ═══════════════════════════════════════════ */}
      <div
        className="relative flex flex-col justify-between px-8 py-10 lg:px-10 lg:py-12 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0f2444 0%, #122b46 60%, #0d1f35 100%)" }}
      >
        {/* Decorative background blobs */}
        <div className="absolute top-[-80px] left-[-80px] w-72 h-72 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #38bdf8, transparent)" }} />
        <div className="absolute bottom-[-100px] right-[-60px] w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #0ea5e9, transparent)" }} />

        {/* ── Header ── */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            {/* Logo placeholder */}
            <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center backdrop-blur-sm">
              <ShieldCheck className="w-6 h-6 text-sky-400" />
            </div>
            <span className="text-xs font-semibold tracking-[0.2em] text-sky-400 uppercase border border-sky-400/30 rounded-full px-3 py-1 bg-sky-400/10">
              Portal Kedinasan
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-none mb-3">
            SIM-SURAT
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
            Transformasi Digital Persuratan Sekolah yang Cepat, Akuntabel, dan Terintegrasi
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 my-8">
            <div className="flex-1 h-px bg-slate-700" />
            <span className="text-xs text-slate-500 uppercase tracking-widest">Fitur Utama</span>
            <div className="flex-1 h-px bg-slate-700" />
          </div>

          {/* ── Feature Cards ── */}
          <div className="flex flex-col gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex items-start gap-4 rounded-xl p-4 border border-white/5 backdrop-blur-md transition-all hover:border-sky-400/20 hover:bg-white/5"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <div className="mt-0.5 w-10 h-10 flex-shrink-0 rounded-lg bg-sky-400/10 border border-sky-400/20 flex items-center justify-center">
                  {f.icon}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm mb-1">{f.title}</p>
                  <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="relative z-10 mt-10 flex items-center justify-between pt-6 border-t border-slate-700/60">
          <div>
            <p className="text-xs text-slate-500">Nomor Pokok Sekolah Nasional</p>
            <p className="text-sm font-semibold text-slate-300 tracking-wider">NPSN: 20231234</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs text-emerald-400 font-medium">Server Aktif</span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          RIGHT PANEL — Authentication Form
      ═══════════════════════════════════════════ */}
      <div className="flex items-center justify-center bg-white px-6 py-12 lg:px-16">
        <div className="w-full max-w-md">

          {/* ── Auth Header ── */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-full px-3 py-1.5 mb-5">
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-xs font-semibold text-slate-600 tracking-wide">
                Sistem Autentikasi Tunggal (SSO)
              </span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
              Selamat Datang Kembali
            </h2>
            <p className="text-sm text-slate-500">
              Masuk ke akun Anda untuk mengakses portal persuratan sekolah.
            </p>
          </div>

          {/* ── Role Selector ── */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
              Pilih Peran
            </label>
            <div className="flex gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => setActiveRole(role)}
                  className={`flex-1 py-2.5 px-2 rounded-lg text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                    activeRole === role
                      ? "bg-white text-slate-900 shadow-md shadow-slate-200/80 border border-slate-100"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* ── Form ── */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (typeof window !== "undefined") {
                localStorage.setItem("userRole", activeRole);
              }
              router.push("/dashboard");
            }}
            className="space-y-5"
          >

            {/* Username field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Username / NIS / NIP
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <User className="w-4.5 h-4.5" />
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Contoh: 19820415... atau nama.pengguna"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 transition-all"
                />
              </div>
              <p className="mt-1.5 text-xs text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-slate-300" />
                Gunakan NIP untuk Staf/Kepala Sekolah, atau NIS untuk Siswa.
              </p>
            </div>

            {/* Password field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-slate-700">
                  Kata Sandi
                </label>
                <a
                  href="#"
                  className="text-xs font-medium text-sky-600 hover:text-sky-700 hover:underline transition-colors"
                >
                  Lupa Kata Sandi?
                </a>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <Key className="w-4.5 h-4.5" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* Options row */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-400 cursor-pointer accent-sky-600"
                />
                <span className="text-xs text-slate-600 group-hover:text-slate-800 transition-colors select-none">
                  Ingat Saya di Perangkat Ini
                </span>
              </label>
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-xs text-slate-500 font-medium">SSL 256-bit</span>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98] shadow-lg shadow-slate-800/20 mt-2"
              style={{ background: "linear-gradient(135deg, #122b46 0%, #0f2444 100%)" }}
            >
              Masuk ke Sistem
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
          </form>

          {/* ── Form Footer ── */}
          <div className="mt-7 pt-6 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-slate-400">
              <Headphones className="w-4 h-4" />
              <span className="text-xs">Butuh bantuan teknis?</span>
            </div>
            <a
              href="https://wa.me/628112345678"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-sky-700 bg-sky-50 border border-sky-200 hover:bg-sky-100 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Hotline TU
            </a>
          </div>

          {/* Copyright */}
          <p className="text-center text-xs text-slate-300 mt-8">
            &copy; {new Date().getFullYear()} SIM-SURAT &mdash; Sistem Informasi Manajemen Surat
          </p>
        </div>
      </div>
    </div>
  );
}
