"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";
import { Save, Loader2, Check } from "lucide-react";

interface WebsiteConfig {
    key: string;
    content: any;
}

export default function AdminSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Config States
    const [announcement, setAnnouncement] = useState({
        text: "Chemical-Free & 100% Herbal Solutions",
        enabled: true
    });

    const [testimonialsHeader, setTestimonialsHeader] = useState({
        title: "What Our Customers Say",
        subtitle: "Real stories from verified users"
    });

    const [carouselImages, setCarouselImages] = useState<string[]>([]);
    const [newCarouselImage, setNewCarouselImage] = useState("");

    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [newTestimonial, setNewTestimonial] = useState({
        name: "",
        rating: 5,
        text: "",
        image: "" // Optional avatar URL
    });

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        setLoading(true);
        const { data } = await supabase.from("website_customizations").select("*");

        if (data) {
            data.forEach(item => {
                if (item.key === "announcement_bar") setAnnouncement(item.content);
                if (item.key === "testimonials_header") setTestimonialsHeader(item.content);
                if (item.key === "home_carousel") setCarouselImages(item.content?.images || []);
                if (item.key === "testimonials_list") setTestimonials(item.content?.items || []);
            });
        }
        setLoading(false);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const updates = [
                { key: "announcement_bar", content: announcement },
                { key: "testimonials_header", content: testimonialsHeader },
                { key: "home_carousel", content: { images: carouselImages } },
                { key: "testimonials_list", content: { items: testimonials } }
            ];

            const results = await Promise.all(
                updates.map(update =>
                    supabase.from("website_customizations").upsert(update, { onConflict: 'key' })
                )
            );
            const failed = results.find(r => r.error);
            if (failed?.error) throw failed.error;

            alert("Settings saved successfully!");
        } catch (error: any) {
            console.error("Error saving settings:", error);
            alert("Failed to save settings: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    const addCarouselImage = () => {
        if (newCarouselImage.trim()) {
            setCarouselImages([...carouselImages, newCarouselImage.trim()]);
            setNewCarouselImage("");
        }
    };

    const removeCarouselImage = (index: number) => {
        setCarouselImages(carouselImages.filter((_, i) => i !== index));
    };

    const addTestimonial = () => {
        if (newTestimonial.name && newTestimonial.text) {
            setTestimonials([...testimonials, { ...newTestimonial, id: Date.now() }]);
            setNewTestimonial({ name: "", rating: 5, text: "", image: "" });
        } else {
            alert("Name and Review Text are required.");
        }
    };

    const removeTestimonial = (index: number) => {
        setTestimonials(testimonials.filter((_, i) => i !== index));
    };

    if (loading) return <div className="p-8">Loading settings...</div>;

    return (
        <div className="max-w-4xl pb-20">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-[var(--primary)]">Website Configuration</h1>
                    <p className="text-gray-500 mt-1">Manage global website settings and content</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="group relative overflow-hidden bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] !text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-[var(--primary)]/30 hover:shadow-[var(--primary)]/50 hover:-translate-y-1 active:translate-y-0 disabled:opacity-100 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0 transition-all duration-300 flex items-center gap-2 w-full md:w-auto justify-center"
                    style={{
                        backgroundImage: 'linear-gradient(to right, var(--primary), var(--secondary))',
                        backgroundColor: '#1D3515', // Fallback to primary dark green
                    }}
                >
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></span>
                    {saving ? (
                        <Loader2 className="w-5 h-5 animate-spin relative z-50" />
                    ) : (
                        <Check className="w-5 h-5 relative z-50" />
                    )}
                    <span
                        className="tracking-wide relative z-50 font-bold"
                        style={{ color: '#ffffff', opacity: 1, textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </span>
                </button>
            </div>

            <div className="space-y-8">
                {/* Announcement Bar Config */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-lg mb-4 text-[var(--primary)]">Announcement Bar</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Banner Text</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                value={announcement.text}
                                onChange={e => setAnnouncement({ ...announcement, text: e.target.value })}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="announce-enabled"
                                checked={announcement.enabled}
                                onChange={e => setAnnouncement({ ...announcement, enabled: e.target.checked })}
                                className="w-4 h-4 text-primary rounded focus:ring-primary"
                            />
                            <label htmlFor="announce-enabled" className="text-sm text-gray-700">Show Announcement Bar</label>
                        </div>
                    </div>
                </div>

                {/* Home Carousel Config */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-lg mb-4 text-[var(--primary)]">Home Carousel Images</h3>
                    <div className="mb-6">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                placeholder="Enter Image URL (e.g. https://...)"
                                value={newCarouselImage}
                                onChange={e => setNewCarouselImage(e.target.value)}
                            />
                            <button onClick={addCarouselImage} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors">
                                Add
                            </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Tip: Use landscape images for best results.</p>
                    </div>

                    {carouselImages.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {carouselImages.map((img, idx) => (
                                <div key={idx} className="relative group rounded-lg overflow-hidden h-32 bg-gray-100 border border-gray-200">
                                    <img src={img} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
                                    <button
                                        onClick={() => removeCarouselImage(idx)}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform hover:scale-110"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 italic text-center py-4 bg-gray-50 rounded-lg">No visible carousel images configured.</p>
                    )}
                </div>

                {/* Testimonials Header Config */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-lg mb-4 text-[var(--primary)]">Testimonials Header</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                value={testimonialsHeader.title}
                                onChange={e => setTestimonialsHeader({ ...testimonialsHeader, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle / Description</label>
                            <textarea
                                rows={2}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                value={testimonialsHeader.subtitle}
                                onChange={e => setTestimonialsHeader({ ...testimonialsHeader, subtitle: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Testimonials List Config */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-lg mb-4 text-[var(--primary)]">Manage Testimonials</h3>

                    {/* Add New Form */}
                    <div className="bg-gray-50 p-4 rounded-xl mb-6 border border-gray-200">
                        <h4 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Add New Testimonial</h4>
                        <div className="grid md:grid-cols-2 gap-4 mb-3">
                            <input
                                type="text"
                                placeholder="Customer Name"
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-primary"
                                value={newTestimonial.name}
                                onChange={e => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                            />
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Rating:</span>
                                <select
                                    className="px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-primary"
                                    value={newTestimonial.rating}
                                    onChange={e => setNewTestimonial({ ...newTestimonial, rating: Number(e.target.value) })}
                                >
                                    {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                                </select>
                            </div>
                        </div>
                        <input
                            type="text"
                            placeholder="Customer Avatar URL (Optional)"
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-primary mb-3"
                            value={newTestimonial.image}
                            onChange={e => setNewTestimonial({ ...newTestimonial, image: e.target.value })}
                        />
                        <textarea
                            placeholder="Testimonial text..."
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-primary mb-3"
                            rows={3}
                            value={newTestimonial.text}
                            onChange={e => setNewTestimonial({ ...newTestimonial, text: e.target.value })}
                        />
                        <button onClick={addTestimonial} className="w-full py-2 bg-primary text-white bg-[var(--primary)] rounded-lg hover:brightness-110 transition-all">
                            Add Testimonial
                        </button>
                    </div>

                    {/* List */}
                    <div className="space-y-3">
                        {testimonials.map((t, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row sm:items-start justify-between p-4 bg-white border border-gray-100 rounded-lg shadow-sm gap-4 sm:gap-0">
                                <div className="flex gap-3 flex-1 min-w-0">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                                        {t.image ? (
                                            <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold">{t.name.charAt(0)}</div>
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                            <span className="font-medium text-gray-900 truncate">{t.name}</span>
                                            <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full flex-shrink-0">★ {t.rating}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 break-words">{t.text}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeTestimonial(idx)}
                                    className="self-end sm:self-start text-gray-400 hover:text-red-500 p-2 sm:p-1 hover:bg-red-50 rounded-full transition-colors"
                                    aria-label="Delete testimonial"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                                </button>
                            </div>
                        ))}
                        {testimonials.length === 0 && (
                            <p className="text-center text-gray-400 py-4">No testimonials added yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
