"use client";

import { useState } from "react";

interface ContactFormProps {
  slug: string;
  primaryColor: string;
  fields?: string[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export function ContactForm({ slug, primaryColor, fields = ["name", "email", "phone", "message"] }: ContactFormProps) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`${API_URL}/api/public/sites/${slug}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg border p-8 text-center" style={{ borderColor: `${primaryColor}30` }}>
        <p className="text-lg font-semibold" style={{ color: primaryColor }}>Thank you!</p>
        <p className="mt-1 text-sm opacity-70">We'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.includes("name") && (
        <input
          type="text"
          placeholder="Your name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2"
          style={{ borderColor: `${primaryColor}20`, backgroundColor: "transparent" }}
        />
      )}
      {fields.includes("email") && (
        <input
          type="email"
          placeholder="Your email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2"
          style={{ borderColor: `${primaryColor}20` }}
        />
      )}
      {fields.includes("phone") && (
        <input
          type="tel"
          placeholder="Phone number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2"
          style={{ borderColor: `${primaryColor}20` }}
        />
      )}
      {fields.includes("message") && (
        <textarea
          placeholder="Your message"
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 resize-none"
          style={{ borderColor: `${primaryColor}20` }}
        />
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        style={{ backgroundColor: primaryColor }}
      >
        {status === "sending" ? "Sending..." : status === "error" ? "Try Again" : "Send Message"}
      </button>
    </form>
  );
}
