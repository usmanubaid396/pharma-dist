"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPharmacyPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    pharmacyName: "",
    proprietorName: "",
    drapLicenseNo: "",
    ntn: "",
    address: "",
    cityId: "terr-vehari",
  });
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const res = await fetch("/api/auth/register-client", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setStatus({
        type: "success",
        msg: "Registration submitted successfully! Your account is pending Super Admin KYC verification.",
      });
    } else {
      setStatus({ type: "error", msg: data.error || "Registration failed." });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-12">
      <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-xl font-bold text-white mb-1">Pharmacy Distribution Registration</h1>
        <p className="text-xs text-slate-400 mb-6">Submit your DRAP license & details for verification</p>

        {status && (
          <div
            className={`p-3 rounded-lg text-xs mb-4 ${
              status.type === "success" ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
            }`}
          >
            {status.msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Contact Name</label>
            <input
              type="text"
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Pharmacy Trade Name</label>
            <input
              type="text"
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
              value={form.pharmacyName}
              onChange={(e) => setForm({ ...form, pharmacyName: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Work Email</label>
            <input
              type="email"
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Phone Number</label>
            <input
              type="tel"
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">DRAP Drug Sale License #</label>
            <input
              type="text"
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
              value={form.drapLicenseNo}
              onChange={(e) => setForm({ ...form, drapLicenseNo: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">NTN / Tax ID (Optional)</label>
            <input
              type="text"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
              value={form.ntn}
              onChange={(e) => setForm({ ...form, ntn: e.target.value })}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-400 mb-1">Physical Address</label>
            <input
              type="text"
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-400 mb-1">Create Password</label>
            <input
              type="password"
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 py-3 bg-emerald-600 hover:bg-emerald-700 font-semibold text-white rounded-lg transition disabled:opacity-50 text-sm mt-2"
          >
            {loading ? "Submitting Application..." : "Submit for DRAP Verification"}
          </button>
        </form>

        <div className="mt-4 text-center text-xs text-slate-500">
          Already registered?{" "}
          <Link href="/login" className="text-emerald-400 hover:underline font-semibold">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
