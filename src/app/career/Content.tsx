"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Upload } from "lucide-react";

/* ─── Shared leaf SVG ─────────────────────────────────────── */
function LeafSVG({ color = "#1D3B29", flipped = false }: { color?: string; flipped?: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={color}
      style={{ transform: flipped ? "matrix(-0.95,-0.32,-0.32,0.95,0,0)" : "rotate(-18.46deg)" }}>
      <path d="M2.67806 0.393273C3.33698 0.746016 3.86524 1.26031 4.27352 1.86988C4.93665 2.86007 5.32531 4.08777 5.64054 5.36694C6.27084 7.92543 6.64437 10.715 7.77326 12.1466C8.83291 13.4904 10.0172 14.1032 11.144 14.2227C11.6287 14.2742 12.107 14.2325 12.5642 14.1104C12.5917 10.6285 11.032 6.71738 8.37049 4.61054C11.4761 6.14733 13.7451 9.27599 14.257 13.1784C14.0091 13.4058 14.1242 13.3167 14.2348 13.2224C15.98 11.7396 16.8379 8.81822 14.9913 5.57157C14.1428 4.07991 12.3091 2.18967 9.91609 1.04988C7.84587 0.0639353 5.3733 -0.379387 2.67804 0.393385L2.67806 0.393273Z" />
    </svg>
  );
}

/* ─── Job card ─────────────────────────────────────────────── */
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
      className="flex flex-col gap-4 p-8 rounded-2xl"
      style={{ width: 397, minHeight: 270, background: "#F4F0EC", flexShrink: 0 }}
    >
      <h3
        className="font-inter font-medium text-[#2E2E2E]"
        style={{ fontSize: 24, lineHeight: "29px" }}
      >
        {title}
      </h3>
      <p className="font-inter font-normal text-black" style={{ fontSize: 16, lineHeight: "19px" }}>
        {type} • {location}
      </p>
      <p className="font-inter font-normal text-[#2E2E2E] flex-1" style={{ fontSize: 16, lineHeight: "19px" }}>
        {description}
      </p>
      <button
        className="flex items-center justify-center font-inter font-semibold text-[#F7EDE2] rounded-[8px] hover:bg-[#2A4F38] transition-all"
        style={{ width: 132, height: 43, background: "#1D3B29", fontSize: 16 }}
      >
        Apply Now
      </button>
    </motion.div>
  );
}

const jobs: JobProps[] = [
  {
    title: "Digital Marketing Executive",
    type: "Full-time",
    location: "Chennai, India",
    description: "We are looking for a qualified Pharmacist to dispense medicines, manage inventory, and guide patients.",
  },
  {
    title: "Product Development Executive",
    type: "Full-time",
    location: "Chennai, India",
    description: "Work on innovative natural formulations and bring new ideas to life.",
  },
  {
    title: "Customer Support Specialist",
    type: "Full-time",
    location: "Chennai, India",
    description: "Help our customers with care and make their experience delightful.",
  },
  {
    title: "Digital Marketing Executive",
    type: "Full-time",
    location: "Chennai, India",
    description: "We are looking for a qualified Pharmacist to dispense medicines, manage inventory, and guide patients.",
  },
  {
    title: "Product Development Executive",
    type: "Full-time",
    location: "Chennai, India",
    description: "Work on innovative natural formulations and bring new ideas to life.",
  },
  {
    title: "Customer Support Specialist",
    type: "Full-time",
    location: "Chennai, India",
    description: "Help our customers with care and make their experience delightful.",
  },
];

export default function CareerContent() {
  const [fileName, setFileName] = useState("No File Chosen");
  const [form, setForm] = useState({
    name: "", countryCode: "+91", phone: "", email: "", jobPosition: "", message: "",
  });
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    setFileName(f ? f.name : "No File Chosen");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Application submitted! We'll get back to you shortly.");
  };

  const countryCodes = [
    { code: "+91", country: "IN" },
    { code: "+1", country: "US" },
    { code: "+44", country: "UK" },
    { code: "+971", country: "UAE" },
    { code: "+61", country: "AU" },
    { code: "+65", country: "SG" },
    { code: "+49", country: "DE" },
    { code: "+33", country: "FR" },
    { code: "+81", country: "JP" },
    { code: "+966", country: "SA" },
    { code: "+965", country: "KW" },
    { code: "+974", country: "QA" },
    { code: "+968", country: "OM" },
    { code: "+973", country: "BH" },
    { code: "+31", country: "NL" },
    { code: "+39", country: "IT" },
    { code: "+34", country: "ES" },
    { code: "+27", country: "ZA" },
    { code: "+55", country: "BR" },
    { code: "+52", country: "MX" },
    { code: "+60", country: "MY" },
    { code: "+62", country: "ID" },
    { code: "+63", country: "PH" },
    { code: "+82", country: "KR" },
  ];

  return (
    <div className="w-full" style={{ background: "#FCFAF4" }}>
      {/* ── HERO BANNER ────────────────────────────────────── */}
      <section className="relative w-full" style={{ height: 581 }}>
        <Image
          src="/images/career/career hero.png"
          alt="Career at V Stories"
          fill
          className="object-cover"
          priority
        />
        {/* dark overlay for readability */}
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.25)" }} />

        {/* Hero text */}
        <div className="absolute flex flex-col gap-8" style={{ left: 100, top: 86, width: 848 }}>
          <h1
            className="font-playfair font-semibold text-white"
            style={{ fontSize: 64, lineHeight: "85px", maxWidth: 542 }}
          >
            Grow With Nature, Build With Purpose
          </h1>
          <p
            className="font-inter font-normal text-white"
            style={{ fontSize: 24, lineHeight: "29px", maxWidth: 504 }}
          >
            Join our passionate team and help us bring the power of nature to the world.
          </p>
          <a
            href="#openings"
            className="inline-flex items-center justify-center font-inter font-semibold hover:bg-[#2A4F38] transition-all"
            style={{ width: 218, height: 43, background: "#1D3B29", fontSize: 16, color: "#FFFFFF" }}
          >
            Explore Opportunities
          </a>
        </div>
      </section>

      {/* ── CURRENT OPENINGS ───────────────────────────────── */}
      <section id="openings" className="w-full" style={{ background: "#FCFAF4", paddingTop: 80, paddingBottom: 60 }}>
        <div className="w-full max-w-[1440px] mx-auto" style={{ paddingLeft: 100 }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair font-semibold text-[#2E2E2E]"
            style={{ fontSize: 48, lineHeight: "64px", marginBottom: 40 }}
          >
            Current Openings
          </motion.h2>

          {/* Row 1 */}
          <div className="flex gap-6 mb-6 flex-wrap">
            {jobs.slice(0, 3).map((job, i) => (
              <JobCard key={i} {...job} />
            ))}
          </div>
          {/* Row 2 */}
          <div className="flex gap-6 flex-wrap">
            {jobs.slice(3, 6).map((job, i) => (
              <JobCard key={i + 3} {...job} />
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLY NOW SECTION ──────────────────────────────── */}
      <section className="w-full" style={{ background: "#FCFAF4", paddingBottom: 80 }}>
        <div
          className="w-full max-w-[1440px] mx-auto relative flex gap-0"
          style={{ paddingLeft: 100, paddingRight: 100 }}
        >
          {/* Left: Image */}
          <div className="relative flex-shrink-0 rounded-2xl overflow-hidden" style={{ width: 548, height: 419 }}>
            <Image
              src="/images/career/career.png"
              alt="Apply to V Stories"
              fill
              className="object-cover"
            />
            {/* Overlay text */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: "rgba(29,59,41,0.5)" }}
            >
              <p
                className="font-inter font-medium text-center"
                style={{ fontSize: 24, lineHeight: "32px", padding: "24px", color: "#FFFFFF" }}
              >
                Great people grow here. So does impact.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="flex flex-col gap-6 flex-1" style={{ paddingLeft: 96 }}>
            <h2
              className="font-playfair font-semibold text-black"
              style={{ fontSize: 32, lineHeight: "43px" }}
            >
              Apply Now!
            </h2>

            <form onSubmit={handleSubmit} className="relative" style={{ height: 352 }}>
              {/* Name */}
              <div
                className="absolute flex items-center"
                style={{
                  left: 0, top: 0, width: 310, height: 43,
                  borderBottom: "1px solid #2E2E2E",
                }}
              >
                <input
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-transparent font-inter font-normal text-[#2E2E2E] outline-none"
                  style={{ fontSize: 16, lineHeight: "19px" }}
                  required
                />
              </div>

              {/* Phone */}
              <div
                className="absolute flex items-center gap-2"
                style={{
                  left: 334, top: 0, width: 310, height: 52,
                  borderBottom: "1px solid #2E2E2E",
                }}
              >
                <div className="flex items-center gap-1 flex-shrink-0 relative">
                  <select
                    value={form.countryCode}
                    onChange={e => setForm({ ...form, countryCode: e.target.value })}
                    className="bg-transparent font-inter font-normal text-[#2E2E2E] outline-none appearance-none cursor-pointer pr-4"
                    style={{ fontSize: 16 }}
                  >
                    {countryCodes.map(c => (
                      <option key={c.code} value={c.code}>{c.code}</option>
                    ))}
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="10" height="5" viewBox="0 0 10 5" fill="none">
                      <path d="M0 0L5 5L10 0H0Z" fill="#2E2E2E" />
                    </svg>
                  </div>
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-transparent font-inter font-normal text-[#2E2E2E] outline-none"
                  style={{ fontSize: 16, lineHeight: "19px" }}
                />
              </div>

              {/* Email */}
              <div
                className="absolute flex items-center"
                style={{
                  left: 0, top: 72, width: 310, height: 43,
                  borderBottom: "1px solid #2E2E2E",
                }}
              >
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent font-inter font-normal text-[#2E2E2E] outline-none"
                  style={{ fontSize: 16, lineHeight: "19px" }}
                  required
                />
              </div>

              {/* Job Position */}
              <div
                className="absolute flex items-center"
                style={{
                  left: 334, top: 72, width: 310, height: 43,
                  borderBottom: "1px solid #2E2E2E",
                }}
              >
                <input
                  type="text"
                  placeholder="Job Position"
                  value={form.jobPosition}
                  onChange={e => setForm({ ...form, jobPosition: e.target.value })}
                  className="w-full bg-transparent font-inter font-normal text-[#2E2E2E] outline-none"
                  style={{ fontSize: 16, lineHeight: "19px" }}
                />
              </div>

              {/* Message */}
              <div
                className="absolute flex items-start"
                style={{
                  left: 0, top: 144, width: 644, height: 79,
                  borderBottom: "1px solid #2E2E2E",
                  paddingTop: 12,
                }}
              >
                <textarea
                  placeholder="Message"
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  className="w-full bg-transparent font-inter font-normal text-[#2E2E2E] outline-none resize-none"
                  style={{ fontSize: 16, lineHeight: "19px" }}
                />
              </div>

              {/* Upload File box */}
              <div
                className="absolute flex items-center"
                style={{
                  left: 0, top: 252, width: 513, height: 48,
                  border: "1px solid #2E2E2E",
                  borderRadius: 4,
                }}
              >
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex items-center gap-1 font-inter font-normal text-[#1D3B29]"
                  style={{
                    margin: 8,
                    padding: "4px 12px",
                    border: "1px solid #1D3B29",
                    borderRadius: 4,
                    fontSize: 16,
                    background: "transparent",
                  }}
                >
                  <Upload className="w-4 h-4" />
                  Upload File
                </button>
                <span
                  className="font-inter font-normal text-[#2E2E2E] ml-2"
                  style={{ fontSize: 12, lineHeight: "15px" }}
                >
                  {fileName}
                </span>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  className="hidden"
                  onChange={handleFile}
                />
              </div>

              <p
                className="absolute font-inter font-light text-[#2E2E2E]"
                style={{ left: 0, top: 316, fontSize: 12, lineHeight: "15px" }}
              >
                Drag & drop your file here (PDF, DOCX, JPG, PNG) Max size: 5MB
              </p>

              {/* Submit */}
              <button
                type="submit"
                className="absolute font-inter font-semibold rounded-[8px] hover:bg-[#2A4F38] transition-all"
                style={{
                  left: 537, top: 252,
                  width: 103, height: 43,
                  background: "#1D3B29",
                  fontSize: 16,
                  color: "#FFFFFF",
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
      {/* ── TRUST BAR ─────────────────────────────────────── */}
      <div style={{ background: "#F7F3EF", height: 185, display: "flex", alignItems: "center", marginTop: 40 }}>
        <div className="w-full max-w-[1440px] mx-auto px-[100px]">
          <div className="flex items-center justify-around">
            {[
              {
                title: "Free Shipping",
                desc: "On orders above ₹799",
                icon: "/images/icons/shippings.png",
              },
              {
                title: "Cash On Delivery",
                desc: "₹25 Per Order",
                icon: "/images/icons/savings.png",
              },
              {
                title: "Secure Payments",
                desc: "Razor pay Payment",
                icon: "/images/icons/payments.png",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3">
                <div className="relative w-[50px] h-[50px]">
                  <Image src={item.icon} alt={item.title} fill className="object-contain" />
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-playfair font-semibold text-[#2E2E2E]" style={{ fontSize: 24 }}>{item.title}</span>
                  <span className="font-inter font-normal text-[#2E2E2E]" style={{ fontSize: 16 }}>{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
