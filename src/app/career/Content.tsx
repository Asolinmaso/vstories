"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Upload } from "lucide-react";

interface JobProps {
  title: string;
  type: string;
  location: string;
  description: string;
}

function JobCard({ title, type, location, description }: JobProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col gap-4 p-6 md:p-8 rounded-2xl"
      style={{ background: "#F4F0EC" }}
    >
      <h3 className="font-inter font-medium text-[#2E2E2E] text-lg md:text-2xl">{title}</h3>
      <p className="font-inter font-normal text-black text-sm md:text-base">{type} • {location}</p>
      <p className="font-inter font-normal text-[#2E2E2E] text-sm md:text-base flex-1">{description}</p>
      <button
        className="inline-flex items-center justify-center font-inter font-semibold text-[#F7EDE2] rounded-lg hover:bg-[#2A4F38] transition-all self-start"
        style={{ padding: "12px 24px", background: "#1D3B29", fontSize: 16 }}
      >
        Apply Now
      </button>
    </motion.div>
  );
}

const jobs: JobProps[] = [
  { title: "Digital Marketing Executive", type: "Full-time", location: "Chennai, India", description: "We are looking for a creative Digital Marketing Executive to lead our online presence and campaigns." },
  { title: "Product Development Executive", type: "Full-time", location: "Chennai, India", description: "Work on innovative natural formulations and bring new ideas to life." },
  { title: "Customer Support Specialist", type: "Full-time", location: "Chennai, India", description: "Help our customers with care and make their experience delightful." },
  { title: "Digital Marketing Executive", type: "Full-time", location: "Chennai, India", description: "We are looking for a qualified professional to manage inventory and guide our digital growth." },
  { title: "Product Development Executive", type: "Full-time", location: "Chennai, India", description: "Work on innovative natural formulations and bring new ideas to life." },
  { title: "Customer Support Specialist", type: "Full-time", location: "Chennai, India", description: "Help our customers with care and make their experience delightful." },
];

export default function CareerContent() {
  const [fileName, setFileName] = useState("No File Chosen");
  const [form, setForm] = useState({ name: "", phone: "", email: "", jobPosition: "", message: "" });
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    setFileName(f ? f.name : "No File Chosen");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Application submitted! We'll get back to you shortly.");
  };

  return (
    <div className="w-full" style={{ background: "#FCFAF4" }}>

      {/* ── HERO BANNER ────────────────────────────────────── */}
      <section className="relative w-full min-h-[55vh] md:min-h-[581px] flex items-center mt-[100px]">
        <Image src="/images/founder-image.png" alt="Career at V Stories" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-[100px] py-16 md:py-0">
          <div className="flex flex-col gap-6 max-w-2xl">
            <h1 className="font-playfair font-semibold text-white text-3xl md:text-5xl lg:text-[64px] leading-tight md:leading-[85px]">
              Grow With Nature, Build With Purpose
            </h1>
            <p className="font-inter font-normal text-white text-base md:text-xl lg:text-2xl">
              Join our passionate team and help us bring the power of nature to the world.
            </p>
            <a href="#openings"
              className="inline-flex items-center justify-center font-inter font-semibold text-[#F7EDE2] rounded-lg hover:bg-[#2A4F38] transition-all self-start"
              style={{ padding: "12px 24px", background: "#1D3B29", fontSize: 16 }}>
              Explore Opportunities
            </a>
          </div>
        </div>
      </section>

      {/* ── CURRENT OPENINGS ───────────────────────────────── */}
      <section id="openings" className="py-16 md:py-20" style={{ background: "#FCFAF4" }}>
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-[100px]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair font-semibold text-[#2E2E2E] text-2xl md:text-4xl lg:text-[48px] mb-10"
          >
            Current Openings
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {jobs.map((job, i) => (
              <JobCard key={i} {...job} />
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLY NOW SECTION ──────────────────────────────── */}
      <section className="pb-16 md:pb-20" style={{ background: "#FCFAF4" }}>
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-[100px]">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Left: Image */}
            <div className="relative w-full lg:w-[500px] flex-shrink-0 rounded-2xl overflow-hidden min-h-[280px] md:min-h-[419px]">
              <Image src="/images/brand-story-bg.png" alt="Apply to V Stories" fill className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(29,59,41,0.5)" }}>
                <p className="font-inter font-medium text-white text-center text-lg md:text-2xl px-6">
                  Great people grow here. So does impact.
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div className="flex flex-col gap-6 flex-1">
              <h2 className="font-playfair font-semibold text-black text-2xl md:text-[32px]">Apply Now!</h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Row 1: Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="border-b border-[#2E2E2E] pb-2">
                    <input type="text" placeholder="Name" value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-transparent font-inter font-normal text-[#2E2E2E] outline-none text-base" required />
                  </div>
                  <div className="border-b border-[#2E2E2E] pb-2 flex items-center gap-2">
                    <span className="font-inter text-[#2E2E2E] text-base flex-shrink-0">+91</span>
                    <svg width="10" height="5" viewBox="0 0 10 5" fill="none" className="flex-shrink-0">
                      <path d="M0 0L5 5L10 0H0Z" fill="#2E2E2E" />
                    </svg>
                    <input type="tel" placeholder="Phone Number" value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-transparent font-inter font-normal text-[#2E2E2E] outline-none text-base" />
                  </div>
                </div>

                {/* Row 2: Email + Job Position */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="border-b border-[#2E2E2E] pb-2">
                    <input type="email" placeholder="Email" value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-transparent font-inter font-normal text-[#2E2E2E] outline-none text-base" required />
                  </div>
                  <div className="border-b border-[#2E2E2E] pb-2">
                    <input type="text" placeholder="Job Position" value={form.jobPosition}
                      onChange={e => setForm({ ...form, jobPosition: e.target.value })}
                      className="w-full bg-transparent font-inter font-normal text-[#2E2E2E] outline-none text-base" />
                  </div>
                </div>

                {/* Message */}
                <div className="border-b border-[#2E2E2E] pb-2">
                  <textarea placeholder="Message" value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    rows={3}
                    className="w-full bg-transparent font-inter font-normal text-[#2E2E2E] outline-none resize-none text-base" />
                </div>

                {/* Upload + Submit */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex-1 flex items-center gap-3 border border-[#2E2E2E] rounded p-2">
                    <button type="button" onClick={() => fileRef.current?.click()}
                      className="flex items-center gap-1 font-inter font-normal text-[#1D3B29] text-sm flex-shrink-0"
                      style={{ padding: "4px 12px", border: "1px solid #1D3B29", borderRadius: 4, background: "transparent" }}>
                      <Upload className="w-4 h-4" />
                      Upload File
                    </button>
                    <span className="font-inter font-normal text-[#2E2E2E] text-xs truncate">{fileName}</span>
                    <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.jpg,.png" className="hidden" onChange={handleFile} />
                  </div>
                  <button type="submit"
                    className="font-inter font-semibold text-[#F7EDE2] rounded-lg hover:bg-[#2A4F38] transition-all flex-shrink-0"
                    style={{ padding: "12px 24px", background: "#1D3B29", fontSize: 16 }}>
                    Submit
                  </button>
                </div>
                <p className="font-inter font-light text-[#2E2E2E] text-xs">
                  Drag &amp; drop your file here (PDF, DOCX, JPG, PNG) Max size: 5MB
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
