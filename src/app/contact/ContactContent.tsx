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
            value: "Kilakarai, Tamil Nadu, India",
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
                <div className="max-w-2xl">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#1A3026] mb-4 md:mb-6 leading-tight" style={{ fontFamily: "var(--font-peachi), serif" }}>
                        Get In Touch With Us
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-[#1A3026] font-bold px-4">
                        We&apos;re here to help with your skincare and haircare<br className="hidden md:block" /> journey. Reach out anytime.
                    </p>
                </div>
            </div>

            <div className="container-premium !pt-16 md:!pt-36 pb-16 md:pb-24">
                <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 items-start">
                    {/* Left Side: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#1A3026] mb-8 md:mb-12 text-center lg:text-left" style={{ fontFamily: "var(--font-peachi), serif" }}>
                            Contact Us
                        </h2>

                        <div className="bg-[#F4F0EC] rounded-[20px] p-6 md:p-12 space-y-6 md:space-y-8 max-w-full lg:max-w-[500px] mx-auto lg:mx-0">
                            {contactItems.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 md:gap-6">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1A3026] flex items-center justify-center shrink-0">
                                        <img src={item.icon} alt={item.title} className="w-4 h-4 md:w-5 md:h-5 object-contain" />
                                    </div>
                                    <div>
                                        <p className="text-[16px] md:text-[20px] font-bold text-[#1A3026] mb-0.5 md:mb-1">
                                            {item.title}
                                        </p>
                                        {item.link ? (
                                            <a href={item.link} className="text-[14px] md:text-[18px] text-[#1A3026] hover:text-[#3A5D20] transition-colors break-all">
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className="text-[14px] md:text-[18px] text-[#1A3026]">
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
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#1A3026] mb-8 md:mb-12 text-center lg:text-left" style={{ fontFamily: "var(--font-peachi), serif" }}>
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
                            <form onSubmit={handleSubmit} className="space-y-10 md:space-y-12">
                                <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 md:gap-y-12">
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder=" "
                                            className="peer w-full bg-transparent border-b border-[#1A3026]/30 py-2 focus:border-[#1A3026] focus:outline-none focus:ring-0 transition-all text-sm md:text-base"
                                        />
                                        <label
                                            htmlFor="name"
                                            className="absolute left-0 top-2 text-sm md:text-base text-[#1A3026]/70 transition-all pointer-events-none
                                                       peer-focus:-top-4 peer-focus:text-[11px] md:peer-focus:text-[13px] peer-focus:text-[#1A3026]
                                                       peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[11px] md:peer-[:not(:placeholder-shown)]:text-[13px] peer-[:not(:placeholder-shown)]:text-[#1A3026]"
                                        >
                                            Name
                                        </label>
                                    </div>
                                    <div className="relative group">
                                        <div className="flex items-end gap-2 border-b border-[#1A3026]/30 py-2 focus-within:border-[#1A3026] transition-all">
                                            <div className="relative flex items-center pb-0.5">
                                                <select
                                                    className="appearance-none bg-transparent pr-5 focus:outline-none focus:ring-0 cursor-pointer text-sm md:text-base text-[#1A3026]"
                                                    value={formData.countryCode || '+91'}
                                                    onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                                                >
                                                    <option value="+91">+91</option>
                                                    <option value="+1">+1</option>
                                                    <option value="+44">+44</option>
                                                    <option value="+971">+971</option>
                                                    <option value="+966">+966</option>
                                                    <option value="+974">+974</option>
                                                    <option value="+965">+965</option>
                                                    <option value="+968">+968</option>
                                                    <option value="+973">+973</option>
                                                    <option value="+65">+65</option>
                                                    <option value="+60">+60</option>
                                                    <option value="+61">+61</option>
                                                    <option value="+64">+64</option>
                                                    <option value="+81">+81</option>
                                                    <option value="+49">+49</option>
                                                    <option value="+33">+33</option>
                                                    <option value="+39">+39</option>
                                                    <option value="+34">+34</option>
                                                    <option value="+41">+41</option>
                                                    <option value="+27">+27</option>
                                                    <option value="+94">+94</option>
                                                    <option value="+960">+960</option>
                                                </select>
                                                <svg className="w-2.5 h-2.5 absolute right-0 pointer-events-none" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21l-12-18h24z" /></svg>
                                            </div>
                                            <div className="relative flex-1">
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder=" "
                                                    className="peer w-full bg-transparent focus:outline-none focus:ring-0 transition-all text-sm md:text-base"
                                                />
                                                <label
                                                    htmlFor="phone"
                                                    className="absolute left-0 top-0 text-sm md:text-base text-[#1A3026]/70 transition-all pointer-events-none
                                                               peer-focus:-top-6 peer-focus:text-[11px] md:peer-focus:text-[13px] peer-focus:text-[#1A3026]
                                                               peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[11px] md:peer-[:not(:placeholder-shown)]:text-[13px] peer-[:not(:placeholder-shown)]:text-[#1A3026]"
                                                >
                                                    Phone number
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 md:gap-y-12">
                                    <div className="relative group">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder=" "
                                            className="peer w-full bg-transparent border-b border-[#1A3026]/30 py-2 focus:border-[#1A3026] focus:outline-none focus:ring-0 transition-all text-sm md:text-base"
                                        />
                                        <label
                                            htmlFor="email"
                                            className="absolute left-0 top-2 text-sm md:text-base text-[#1A3026]/70 transition-all pointer-events-none
                                                       peer-focus:-top-4 peer-focus:text-[11px] md:peer-focus:text-[13px] peer-focus:text-[#1A3026]
                                                       peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[11px] md:peer-[:not(:placeholder-shown)]:text-[13px] peer-[:not(:placeholder-shown)]:text-[#1A3026]"
                                        >
                                            Email
                                        </label>
                                    </div>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            id="location"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            placeholder=" "
                                            className="peer w-full bg-transparent border-b border-[#1A3026]/30 py-2 focus:border-[#1A3026] focus:outline-none focus:ring-0 transition-all text-sm md:text-base"
                                        />
                                        <label
                                            htmlFor="location"
                                            className="absolute left-0 top-2 text-sm md:text-base text-[#1A3026]/70 transition-all pointer-events-none
                                                       peer-focus:-top-4 peer-focus:text-[11px] md:peer-focus:text-[13px] peer-focus:text-[#1A3026]
                                                       peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[11px] md:peer-[:not(:placeholder-shown)]:text-[13px] peer-[:not(:placeholder-shown)]:text-[#1A3026]"
                                        >
                                            Location
                                        </label>
                                    </div>
                                </div>

                                <div className="relative group pt-4">
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder=" "
                                        className="peer w-full bg-transparent border-b border-[#1A3026]/30 py-2 focus:border-[#1A3026] focus:outline-none focus:ring-0 transition-all resize-none text-sm md:text-base"
                                    />
                                    <label
                                        htmlFor="message"
                                        className="absolute left-0 top-6 text-sm md:text-base text-[#1A3026]/70 transition-all pointer-events-none
                                                   peer-focus:top-0 peer-focus:text-[11px] md:peer-focus:text-[13px] peer-focus:text-[#1A3026]
                                                   peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] md:peer-[:not(:placeholder-shown)]:text-[13px] peer-[:not(:placeholder-shown)]:text-[#1A3026]"
                                    >
                                        Message
                                    </label>
                                </div>

                                <div className="pt-4 md:pt-8">
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            id="isInterested"
                                            name="isInterested"
                                            checked={formData.isInterested}
                                            onChange={handleChange}
                                            className="mt-1 w-4 h-4 rounded border-[#1A3026]/30 text-[#1A3026] focus:ring-[#1A3026]"
                                        />
                                        <label htmlFor="isInterested" className="text-[11px] md:text-[13px] text-[#1A3026]/80 leading-relaxed">
                                            I am interested in B2B / Wholesale opportunities. Please contact me with partnership details.
                                        </label>
                                    </div>
                                </div>

                                <div className="flex justify-center lg:justify-end pt-4">
                                    <button
                                        type="submit"
                                        className="w-full sm:w-auto px-10 py-3.5 !text-white rounded-[12px] text-[15px] md:text-[16px] font-medium hover:opacity-90 transition-all shadow-lg shadow-[#1A3026]/10"
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

            {/* Bottom Inquiry Boxes Section */}
            <div className="bg-[#F7F3EF] pt-16 md:pt-24 pb-16 md:pb-24">
                <div className="container-premium">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        <div className="bg-[#94A684] rounded-[12px] p-6 flex flex-col justify-center min-h-[100px] text-center md:text-left">
                            <p className="text-[14px] md:text-[16px] font-medium mb-1 !text-[#FFFFFF]">For Order & Product Related Inquiries</p>
                            <a href="mailto:sales@vstories.in" className="text-[13px] md:text-[14px] font-semibold !text-[#FFFFFF] underline underline-offset-4 decoration-white/50 hover:decoration-white transition-all">
                                sales@vstories.in
                            </a>
                        </div>
                        <div className="bg-[#1A3026] rounded-[12px] p-6 flex flex-col justify-center min-h-[100px] text-center md:text-left">
                            <p className="text-[14px] md:text-[16px] font-medium mb-1 !text-[#FFFFFF]">For Partnership & Collaboration</p>
                            <a href="mailto:collaboration@vstories.in" className="text-[13px] md:text-[14px] font-semibold !text-[#FFFFFF] underline underline-offset-4 decoration-white/50 hover:decoration-white transition-all">
                                collaboration@vstories.in
                            </a>
                        </div>
                        <div className="bg-[#7B8E6D] rounded-[12px] p-6 flex flex-col justify-center min-h-[100px] text-center md:text-left">
                            <p className="text-[14px] md:text-[16px] font-medium mb-1 !text-[#FFFFFF]">For Opportunities</p>
                            <a href="mailto:career@vstories.in" className="text-[13px] md:text-[14px] font-semibold !text-[#FFFFFF] underline underline-offset-4 decoration-white/50 hover:decoration-white transition-all">
                                career@vstories.in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
