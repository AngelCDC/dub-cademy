"use client";

import { useState } from "react";

export function DemoForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-white border border-violet-100 rounded-2xl p-8 shadow-sm text-center">
        <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">⚡</span>
        </div>
        <h3 className="text-base font-bold text-[#1a1535] mb-2">¡Solicitud recibida!</h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          Nuestro equipo te contactará en menos de 24 horas para coordinar la demo.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-violet-100 rounded-2xl p-8 shadow-sm">
      <h2 className="text-xl font-bold text-[#1a1535] mb-1">Agenda una demo gratuita</h2>
      <p className="text-sm text-slate-400 mb-6">Te mostramos el dashboard en acción en 30 minutos.</p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {[["nombre", "Nombre"], ["empresa", "Empresa"]].map(([id, label]) => (
            <div key={id}>
              <label htmlFor={id} className="block text-xs font-semibold text-slate-500 mb-1.5">{label}</label>
              <input
                type="text"
                id={id}
                required
                className="w-full bg-[#F8F6FF] border border-violet-100 hover:border-violet-200 focus:border-primary/50 focus:bg-white rounded-xl px-4 py-3 text-sm text-[#1a1535] placeholder:text-slate-300 outline-none transition-colors"
              />
            </div>
          ))}
        </div>
        <div>
          <label htmlFor="email-biz" className="block text-xs font-semibold text-slate-500 mb-1.5">Email corporativo</label>
          <input
            type="email"
            id="email-biz"
            required
            className="w-full bg-[#F8F6FF] border border-violet-100 hover:border-violet-200 focus:border-primary/50 focus:bg-white rounded-xl px-4 py-3 text-sm text-[#1a1535] placeholder:text-slate-300 outline-none transition-colors"
          />
        </div>
        <div>
          <label htmlFor="team-size" className="block text-xs font-semibold text-slate-500 mb-1.5">Tamaño del equipo</label>
          <select
            id="team-size"
            required
            className="w-full bg-[#F8F6FF] border border-violet-100 hover:border-violet-200 focus:border-primary/50 focus:bg-white rounded-xl px-4 py-3 text-sm text-[#1a1535] outline-none transition-colors appearance-none"
          >
            <option value="">Selecciona...</option>
            <option>3–10 personas</option>
            <option>11–50 personas</option>
            <option>51–200 personas</option>
            <option>+200 personas</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-sm py-3.5 rounded-full transition-all hover:-translate-y-0.5 shadow-md shadow-primary/25"
        >
          Solicitar demo
        </button>
      </form>
    </div>
  );
}
