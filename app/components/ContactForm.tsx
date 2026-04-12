"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Meno a priezvisko *"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-[#08a800] transition-colors"
      />
      <input
        type="tel"
        placeholder="Telefónne číslo"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-[#08a800] transition-colors"
      />
      <input
        type="email"
        placeholder="E-mailová adresa"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-[#08a800] transition-colors"
      />
      <textarea
        placeholder="Správa / Popis problému"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        rows={4}
        className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-[#08a800] transition-colors resize-none"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[#08a800] text-white font-[family-name:var(--font-barlow)] font-black text-lg uppercase italic py-3 hover:bg-green-700 transition-colors disabled:opacity-50 cursor-pointer"
      >
        {status === "loading" ? "Odosiela sa..." : "Odoslať"}
      </button>
      {status === "success" && (
        <p className="text-[#08a800] font-semibold text-center">
          Správa bola úspešne odoslaná! Ozveme sa vám čo najskôr.
        </p>
      )}
      {status === "error" && (
        <p className="text-red-500 font-semibold text-center">
          Nastala chyba. Skúste znova alebo nás kontaktujte telefonicky.
        </p>
      )}
    </form>
  );
}
