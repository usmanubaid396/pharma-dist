"use client";

import { useState } from "react";

export default function MedRepPage() {
  const [form, setForm] = useState({
    doctorName: "",
    specialty: "General Physician",
    clinicAddress: "",
    productsShown: "SOLOLID 600mg, AYACIN 500mg",
    sampleGiven: "SOLOLID 2 Strips",
    feedback: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Daily Call Report (DCR)</h1>
        <p className="text-xs text-slate-400">Log doctor visits, detailing, and samples provided</p>
      </div>

      {submitted && (
        <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs">
          DCR entry logged and synced to Sales Manager history.
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 text-xs">
        <div>
          <label className="block text-slate-400 mb-1">Doctor Name</label>
          <input
            type="text"
            required
            placeholder="Dr. Muhammad Imran"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
            value={form.doctorName}
            onChange={(e) => setForm({ ...form, doctorName: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1">Specialty</label>
          <input
            type="text"
            required
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
            value={form.specialty}
            onChange={(e) => setForm({ ...form, specialty: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1">Clinic / Hospital Name & Address</label>
          <input
            type="text"
            required
            placeholder="DHQ Hospital Road, Vehari"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
            value={form.clinicAddress}
            onChange={(e) => setForm({ ...form, clinicAddress: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1">Products Detailed</label>
          <input
            type="text"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
            value={form.productsShown}
            onChange={(e) => setForm({ ...form, productsShown: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1">Samples Distributed</label>
          <input
            type="text"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
            value={form.sampleGiven}
            onChange={(e) => setForm({ ...form, sampleGiven: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1">Doctor Feedback / Prescription Commitment</label>
          <textarea
            rows={3}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
            value={form.feedback}
            onChange={(e) => setForm({ ...form, feedback: e.target.value })}
            placeholder="Positive on Linezolid for surgical prophylaxis..."
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-sm transition"
        >
          Submit DCR Log
        </button>
      </form>
    </div>
  );
}
