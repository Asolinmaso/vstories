"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";

export default function ContactContent() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        countryCode: "+91",
        phone: "",
        location: "",
        message: "",
        isInterested: false,
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            setIsSubmitted(true);
            setFormData({
                name: "",
                email: "",
                countryCode: "+91",
                phone: "",
                location: "",
                message: "",
                isInterested: false,
            });
        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to send message. Please try again or contact us via WhatsApp.');
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;

        // Validation for Name: Only allow letters and spaces
        if (name === "name") {
            if (!/^[a-zA-Z\s]*$/.test(value)) return;
        }

        // Validation for Phone: Only allow numbers and limit to 15 digits
        if (name === "phone") {
            if (!/^[0-9]*$/.test(value)) return;
            if (value.length > 15) return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const contactItems = [
        {
            icon: "/images/icons/phone.png",
            title: "Contact",
            value: "+91 6383921957",
            link: "tel:+916383921957",
        },
        {
            icon: "/images/icons/mail.png",
            title: "E-mail",
            value: "support@vstories.in",
            link: "mailto:support@vstories.in",
        },
        {
            icon: "/images/icons/Group.png",
            title: "Address",
            value: "Kilakarai, Tamil Nadu,\nIndia",
            link: null,
        },
        {
            icon: "/images/icons/Mask group.png",
            title: "Business Hours",
            value: "Mon - Sat: 9AM - 6PM",
            link: null,
        },
    ];

    return (
        <div className="bg-[#FAF9F6] min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[450px] md:h-[630px] w-full flex items-center justify-center text-center px-4 contact-hero-bg">
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .contact-hero-bg {
                        background-image: url("/images/contactus.png");
                        background-size: cover;
                        background-position: center 9%;
                        background-repeat: no-repeat;
                    }

                    /* Media queries for all types of mobile screens */
                    @media screen and (max-width: 1024px) {
                        .contact-hero-bg {
                            background-position: center 9%;
                        }
                    }
                    @media screen and (max-width: 768px) {
                        .contact-hero-bg {
                            background-position: center 9%;
                        }
                    }
                    @media screen and (max-width: 480px) {
                        .contact-hero-bg {
                            background-position: center 9%;
                        }
                    }
                    @media screen and (max-width: 360px) {
                        .contact-hero-bg {
                            background-position: left 30%;
                        }
                    }
                        @media screen and (max-width: 320px) {
                        .contact-hero-bg {
                            background-position: left 39%;
                        }
                    }
                `}} />
                <div className="max-w-2xl px-6 sm:px-4">
                    <h1 className="font-playfair font-semibold mb-3 md:mb-6 text-[36px] leading-[1.1] md:text-[64px] md:leading-[100%] text-[#000000]">
                        Get In Touch <br className="md:hidden" />With Us
                    </h1>
                    <p className="font-inter font-normal text-[12px] md:text-[24px] text-[#1A3026] md:leading-[32px] max-w-[280px] md:max-w-none mx-auto leading-[1.4]">
                        We're here to help with your skincare and haircare journey. Reach out anytime.
                    </p>
                </div>
            </div>

            <div className="container-premium !pt-16 md:!pt-36 pb-16 md:pb-24">
                <div className="max-w-[1050px] mx-auto">
                    <div className="grid lg:grid-cols-[330px_1fr] xl:grid-cols-[350px_1fr] gap-12 lg:gap-16 items-start">
                        {/* Left Side: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full"
                    >
                        <h2 className="text-[24px] md:text-4xl lg:text-[44px] font-medium text-[#1A3026] mb-4 md:mb-12 text-left" style={{ fontFamily: "var(--font-peachi), serif" }}>
                            Contact Us
                        </h2>

                        <div className="bg-[#F4F0EC] rounded-[20px] p-5 md:p-8 space-y-5 md:space-y-8 w-full">
                            {contactItems.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 md:gap-6">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1A3026] flex items-center justify-center shrink-0 shadow-md">
                                        <img src={item.icon} alt={item.title} className="w-4 h-4 md:w-5 md:h-5 object-contain" />
                                    </div>
                                    <div>
                                        <p className="text-[14px] md:text-[20px] font-bold text-[#1A3026] mb-0.5 md:mb-1">
                                            {item.title}
                                        </p>
                                        {item.link ? (
                                            <a href={item.link} className="text-[13px] md:text-[18px] text-[#1A3026] hover:text-[#3A5D20] transition-colors break-all block">
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className="text-[13px] md:text-[18px] text-[#1A3026] whitespace-pre-line">
                                                {item.value}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side: Send Message Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full"
                    >
                        <h2 className="text-[24px] md:text-4xl lg:text-[44px] font-medium text-[#1A3026] mb-8 md:mb-12 text-left" style={{ fontFamily: "var(--font-peachi), serif" }}>
                            Send Message
                        </h2>

                        {isSubmitted ? (
                            <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 text-center">
                                <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-[#3A5D20] mx-auto mb-4" />
                                <h3 className="text-xl md:text-2xl font-medium text-[#1A3026] mb-2">Message Sent!</h3>
                                <p className="text-[#1A3026]/70">We&apos;ll get back to you shortly.</p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="mt-6 md:mt-8 text-[#3A5D20] font-medium underline underline-offset-4"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                                <div className="grid md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-8 md:gap-y-8">
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Name"
                                            className="w-full bg-transparent border-b border-[#1A3026]/50 py-2 focus:border-[#1A3026] focus:outline-none focus:ring-0 transition-all text-[13px] md:text-base placeholder:text-[#1A3026]/70"
                                        />
                                    </div>
                                    <div className="relative group">
                                        <div className="flex items-end gap-2 border-b border-[#1A3026]/50 py-2 focus-within:border-[#1A3026] transition-all">
                                            <div className="relative flex items-center pb-0.5">
                                                <select
                                                    className="appearance-none bg-transparent pr-4 focus:outline-none focus:ring-0 cursor-pointer text-[13px] md:text-base text-[#1A3026]/70"
                                                    value={formData.countryCode || '+91'}
                                                    onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                                                >
                                                    <option value="+91">+91</option>
                                                    <option value="+1">+1</option>
                                                    <option value="+44">+44</option>
                                                </select>
                                                <svg className="w-2.5 h-2.5 absolute right-0 pointer-events-none text-[#1A3026]/70" fill="currentColor" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z" /></svg>
                                            </div>
                                            <div className="relative flex-1">
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="Phone number"
                                                    className="w-full bg-transparent focus:outline-none focus:ring-0 transition-all text-[13px] md:text-base placeholder:text-[#1A3026]/70 pb-0.5"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-8 md:gap-y-8 mt-8">
                                    <div className="relative group">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Email"
                                            className="w-full bg-transparent border-b border-[#1A3026]/50 py-2 focus:border-[#1A3026] focus:outline-none focus:ring-0 transition-all text-[13px] md:text-base placeholder:text-[#1A3026]/70"
                                        />
                                    </div>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            id="location"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            placeholder="Location"
                                            className="w-full bg-transparent border-b border-[#1A3026]/50 py-2 focus:border-[#1A3026] focus:outline-none focus:ring-0 transition-all text-[13px] md:text-base placeholder:text-[#1A3026]/70"
                                        />
                                    </div>
                                </div>

                                <div className="relative group mt-8">
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Message"
                                        className="w-full bg-transparent border-b border-[#1A3026]/50 py-2 focus:border-[#1A3026] focus:outline-none focus:ring-0 transition-all resize-none text-[13px] md:text-base placeholder:text-[#1A3026]/70"
                                    />
                                </div>

                                <div className="pt-2 md:pt-4">
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            id="isInterested"
                                            name="isInterested"
                                            checked={formData.isInterested}
                                            onChange={handleChange}
                                            className="mt-1 w-3.5 h-3.5 md:w-4 md:h-4 rounded border-[#1A3026]/50 text-[#1A3026] focus:ring-[#1A3026] bg-transparent"
                                        />
                                        <label htmlFor="isInterested" className="text-[11px] md:text-[13px] text-[#1A3026] leading-snug tracking-tight">
                                            I am interested in B2B / <br className="md:hidden" />
                                            Wholesale opportunities. Please contact <br className="md:hidden" />
                                            me with partnership details.
                                        </label>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2.5 !text-white rounded-[6px] text-[12px] md:text-[14px] font-medium hover:opacity-90 transition-all"
                                        style={{ backgroundColor: '#1D3B29', color: '#FFFFFF' }}
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        )}
                    </motion.div>
                    </div>
                </div>

            </div>

            {/* Bottom Inquiry Boxes Section */}
            <div className="bg-[#F7F3EF] pt-8 md:pt-12 pb-8 md:pb-12">
                <div className="container-premium">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        <div className="bg-[#7B8E6D] rounded-[10px] p-5 flex flex-col justify-center min-h-[90px] text-left">
                            <p className="text-[13px] md:text-[16px] font-medium mb-1.5 !text-[#FFFFFF]">For Order & Product Related Enquiries</p>
                            <a href="mailto:sales@vstories.com" className="text-[12px] md:text-[14px] font-medium !text-[#FFFFFF] underline underline-offset-4 decoration-white/70 hover:decoration-white transition-all">
                                sales@vstories.com
                            </a>
                        </div>
                        <div className="bg-[#1A3026] rounded-[10px] p-5 flex flex-col justify-center min-h-[90px] text-left">
                            <p className="text-[13px] md:text-[16px] font-medium mb-1.5 !text-[#FFFFFF]">For Partnership & Collaboration</p>
                            <a href="mailto:collaboration@vstories.com" className="text-[12px] md:text-[14px] font-medium !text-[#FFFFFF] underline underline-offset-4 decoration-white/70 hover:decoration-white transition-all">
                                collaboration@vstories.com
                            </a>
                        </div>
                        <div className="bg-[#7B8E6D] rounded-[10px] p-5 flex flex-col justify-center min-h-[90px] text-left">
                            <p className="text-[13px] md:text-[16px] font-medium mb-1.5 !text-[#FFFFFF]">For Opportunities</p>
                            <a href="mailto:career@vstories.com" className="text-[12px] md:text-[14px] font-medium !text-[#FFFFFF] underline underline-offset-4 decoration-white/70 hover:decoration-white transition-all">
                                career@vstories.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
