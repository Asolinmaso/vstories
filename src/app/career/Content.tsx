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

function JobCard({ title, type, location, description, onApply }: JobProps & { onApply: (title: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col gap-4 p-6 md:p-8 rounded-[16px] bg-[#F4F0EC] w-full md:w-[397px] min-h-[270px] shrink-0"
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
        onClick={() => onApply(title)}
        className="flex items-center justify-center font-inter font-semibold !text-white rounded-[8px] hover:bg-[#2A4F38] transition-all"
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

  const handleApplyClick = (jobTitle: string) => {
    setForm(prev => ({ ...prev, jobPosition: jobTitle }));
    document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" });
  };

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
    <div className="w-full bg-[#FCFAF4]">
      {/* ── HERO BANNER ────────────────────────────────────── */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .career-hero-img {
            object-position: center;
        }
        @media screen and (max-width: 1024px) {
            .career-hero-img {
                object-position: center;
            }
        }
        @media screen and (max-width: 768px) {
            .career-hero-img {
                object-position: 80% bottom;
            }
        }
        @media screen and (max-width: 480px) {
            .career-hero-img {
                object-position: 80% bottom;
            }
        }
        @media screen and (max-width: 375px) {
            .career-hero-img {
                object-position: 80% bottom;
            }
        }
        @media screen and (max-width: 360px) {
            .career-hero-img {
                object-position: 80% bottom;
            }
        }
        @media screen and (max-width: 320px) {
            .career-hero-img {
                object-position: 80% bottom;
            }
        }
      `}} />
      <section className="relative w-full h-[640px] md:h-[581px] bg-[#FCFAF4]">
        <Image
          src="/images/career/career hero.png"
          alt="Career at V Stories"
          fill
          className="object-cover career-hero-img"
          priority
        />
        {/* Removed dark overlay for black text readability */}

        {/* Hero text */}
        <div className="absolute flex flex-col gap-4 md:gap-8 left-6 top-12 md:left-[100px] md:top-[86px] right-6 md:right-auto max-w-[90%] md:w-[848px]">
          <h1
            className="font-playfair !font-bold !text-[#000000] !text-[28px] md:!text-[64px] leading-tight md:leading-[85px] max-w-[340px] sm:max-w-[450px] md:max-w-[550px]"
          >
            Grow With Nature,<br className="md:hidden" /> Build With Pupose
          </h1>
          <p
            className="font-inter font-normal text-black !text-[15px] md:!text-[24px] leading-relaxed md:leading-[29px] max-w-[340px] sm:max-w-[400px] md:max-w-[504px]"
          >
            Join our passionate team and help us bring the power of nature to the world.
          </p>
          <a
            href="#openings"
            style={{ color: '#ffffff', backgroundColor: '#1D3B29' }}
            className="inline-flex items-center justify-center font-inter font-semibold hover:bg-[#2A4F38] transition-all rounded-[8px] text-[12px] md:text-[14px] w-fit px-4 py-2 md:px-5 md:py-2"
          >
            Explore Opportunities
          </a>
        </div>
      </section>

      {/* ── CURRENT OPENINGS ───────────────────────────────── */}
      <section id="openings" className="w-full py-16 md:py-20 bg-[#FCFAF4]">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-0 md:pl-[100px]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair font-semibold text-[#2E2E2E] text-[32px] md:text-[48px] leading-tight md:leading-[64px] mb-8 md:mb-10"
          >
            Current Openings
          </motion.h2>

          {/* Openings Container */}
          <div className="flex flex-col md:flex-row md:flex-wrap gap-6 justify-start">
            {jobs.map((job, i) => (
              <JobCard key={i} {...job} onApply={handleApplyClick} />
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLY NOW SECTION ──────────────────────────────── */}
      <section id="apply-form" className="w-full pb-16 md:pb-20 bg-[#FCFAF4]">
        <div className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-12 px-6 lg:px-[100px]">
          {/* Left: Image */}
          <div className="relative flex-shrink-0 rounded-2xl overflow-hidden w-full lg:w-[548px] h-[280px] lg:h-[419px]">
            <Image
              src="/images/career/career.png"
              alt="Apply to V Stories"
              fill
              className="object-cover"
            />
          </div>

          {/* Right: Form */}
          <div className="flex flex-col gap-6 flex-1">
            <h2
              className="font-playfair font-semibold text-black text-[28px] md:text-[32px] leading-tight md:leading-[43px]"
            >
              Apply Now!
            </h2>

            <form onSubmit={handleSubmit} className="relative w-full lg:h-[352px] flex flex-col lg:block gap-6 lg:gap-0">
              {/* Name */}
              <div
                className="lg:absolute flex items-center w-full lg:w-[310px] h-[43px] border-b border-[#2E2E2E] lg:left-0 lg:top-0"
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
                className="lg:absolute flex items-center gap-2 w-full lg:w-[310px] h-[43px] border-b border-[#2E2E2E] lg:left-[334px] lg:top-0"
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
                className="lg:absolute flex items-center w-full lg:w-[310px] h-[43px] border-b border-[#2E2E2E] lg:left-0 lg:top-[72px]"
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
                className="lg:absolute flex items-center w-full lg:w-[310px] h-[43px] border-b border-[#2E2E2E] lg:left-[334px] lg:top-[72px]"
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
                className="lg:absolute flex items-start w-full lg:w-[644px] h-[79px] border-b border-[#2E2E2E] pt-3 lg:left-0 lg:top-[144px]"
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
                className="lg:absolute flex items-center w-full lg:w-[513px] h-[48px] border border-[#2E2E2E] rounded-none lg:left-0 lg:top-[235px]"
              >
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex items-center justify-center gap-2 font-inter font-normal text-[#1D3B29] ml-3 mr-6 px-4 py-1.5 rounded-none text-[15px] bg-transparent hover:bg-[#1D3B29]/5 transition-all"
                  style={{ border: '1px solid #1D3B29' }}
                >
                  <Upload className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  Upload File
                </button>
                <span
                  className="font-inter font-normal text-[#2E2E2E]/80 text-[13px] leading-[15px]"
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
                className="lg:absolute font-inter font-light text-[#2E2E2E] text-[12px] leading-[18px] lg:left-0 lg:top-[295px] mt-1 lg:mt-0"
              >
                Drag & drop your file here (PDF, DOCX, JPG, PNG)<br />
                Max size: 5MB
              </p>

              {/* Submit */}
              <button
                type="submit"
                style={{ color: '#ffffff', backgroundColor: '#1D3B29' }}
                className="self-end lg:absolute font-inter font-semibold rounded-[8px] hover:bg-[#2A4F38] transition-all text-[16px] w-[103px] h-[48px] lg:left-[537px] lg:top-[235px] mt-4 lg:mt-0"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
