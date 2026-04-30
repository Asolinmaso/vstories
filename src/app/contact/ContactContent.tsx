"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";

export default function ContactContent() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        isWholesale: false,
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        // console.log("Form submitted:", formData);

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
                phone: "",
                message: "",
                isWholesale: false,
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
        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const contactInfo = [
        {
            icon: Phone,
            title: "Phone",
            value: "+91 6383921957",
            link: "tel:+916383921957",
        },
        {
            icon: Mail,
            title: "Email",
            value: "hello@vstories.in",
            link: "mailto:hello@vstories.in",
        },
        {
            icon: MapPin,
            title: "Location",
            value: "Kilakarai, Tamil Nadu, India",
            link: null,
        },
        {
            icon: Clock,
            title: "Business Hours",
            value: "Mon - Sat: 9AM - 6PM",
            link: null,
        },
    ];

    return (
        <div className="bg-[var(--background)] min-h-screen">
            {/* Simple Heading */}
            <div className="container-premium pt-24 pb-8 text-center">
                <h1
                    className="text-4xl md:text-5xl font-semibold text-[var(--primary)]"
                >
                    Get in Touch
                </h1>
            </div>

            {/* Contact Section */}
            <section className="section-padding">
                <div className="container-premium">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                {isSubmitted ? (
                                    <div className="text-center py-12">
                                        <CheckCircle className="w-16 h-16 text-[var(--secondary)] mx-auto mb-4" />
                                        <h3
                                            className="text-2xl font-semibold text-[var(--primary)] mb-2"
                                            style={{ fontFamily: "var(--font-peachi)" }}
                                        >
                                            Message Sent!
                                        </h3>
                                        <p className="text-[var(--text-muted)]">
                                            Thank you for reaching out. We&apos;ll get back to you within 24
                                            hours.
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <h2
                                            className="text-2xl font-semibold text-[var(--primary)] mb-6"
                                        >
                                            Send us a Message
                                        </h2>
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label
                                                        htmlFor="name"
                                                        className="block text-sm font-medium text-[var(--primary)] mb-2"
                                                    >
                                                        Your Name *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        required
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 border border-[var(--primary)]/20 rounded-lg focus:outline-none focus:border-[var(--highlight)] transition-colors"
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="phone"
                                                        className="block text-sm font-medium text-[var(--primary)] mb-2"
                                                    >
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        id="phone"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 border border-[var(--primary)]/20 rounded-lg focus:outline-none focus:border-[var(--highlight)] transition-colors"
                                                        placeholder="+91 98765 43210"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="block text-sm font-medium text-[var(--primary)] mb-2"
                                                >
                                                    Email Address *
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-[var(--primary)]/20 rounded-lg focus:outline-none focus:border-[var(--highlight)] transition-colors"
                                                    placeholder="john@example.com"
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="message"
                                                    className="block text-sm font-medium text-[var(--primary)] mb-2"
                                                >
                                                    Your Message *
                                                </label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    required
                                                    rows={5}
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-[var(--primary)]/20 rounded-lg focus:outline-none focus:border-[var(--highlight)] transition-colors resize-none"
                                                    placeholder="Tell us how we can help..."
                                                />
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <input
                                                    type="checkbox"
                                                    id="isWholesale"
                                                    name="isWholesale"
                                                    checked={formData.isWholesale}
                                                    onChange={handleChange}
                                                    className="mt-1 w-5 h-5 rounded border-[var(--primary)]/30 text-[var(--highlight)] focus:ring-[var(--highlight)]"
                                                />
                                                <label
                                                    htmlFor="isWholesale"
                                                    className="text-sm text-[var(--text-secondary)]"
                                                >
                                                    I am interested in <strong>B2B / Wholesale</strong>{" "}
                                                    opportunities. Please contact me with partnership
                                                    details.
                                                </label>
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full btn-primary py-4 flex items-center justify-center gap-2"
                                            >
                                                Send Message
                                                <Send className="w-4 h-4" />
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-8"
                        >
                            <div>
                                <h2
                                    className="text-lg font-semibold text-[var(--primary)]"
                                >
                                    Contact Information
                                </h2>
                                <div className="space-y-4">
                                    {contactInfo.map((item, index) => (
                                        <motion.div
                                            key={item.title}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: false, margin: "-50px" }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="flex items-start gap-4 p-4 bg-white rounded-xl"
                                        >
                                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--secondary)]/10 flex items-center justify-center">
                                                <item.icon className="w-5 h-5 text-[var(--secondary)]" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-[var(--primary)] mb-1">
                                                    {item.title}
                                                </h4>
                                                {item.link ? (
                                                    <a
                                                        href={item.link}
                                                        className="text-[var(--text-muted)] hover:text-[var(--highlight)] transition-colors"
                                                    >
                                                        {item.value}
                                                    </a>
                                                ) : (
                                                    <p className="text-[var(--text-muted)]">
                                                        {item.value}
                                                    </p>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* WhatsApp CTA */}
                            <div className="bg-[var(--primary)] rounded-2xl p-5 text-white dark-section">
                                <h3 className="text-xl font-semibold mb-2 text-white">
                                    Prefer WhatsApp?
                                </h3>
                                <p className="text-white/90 mb-4">
                                    Chat with us directly for quick responses and order updates.
                                </p>
                                <a
                                    href="https://wa.me/916383921957?text=Hi! I'm interested in V STORIES products."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white font-medium rounded-lg hover:bg-white/90 transition-colors"
                                    style={{ color: 'var(--primary)' }}
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Chat on WhatsApp
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
